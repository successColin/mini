<template>
  <view class="compress">
    <canvas
      canvas-id="compress_canvas"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
  </view>
</template>

<script>
import base64ToPath from './base64ToPath.js';
export default {
  name: 'compress',

  data() {
    return {
      width: 0,
      height: 0,
    };
  },

  methods: {
    calcImageSize(res, pixels) {
      let imgW, imgH;
      imgW = res.width;
      imgH = res.height;

      let ratio;
      if ((ratio = (imgW * imgH) / pixels) > 1) {
        ratio = Math.sqrt(ratio);
        imgW = parseInt(imgW / ratio);
        imgH = parseInt(imgH / ratio);
      } else {
        ratio = 1;
      }

      return {
        imgW,
        imgH,
      };
    },
    urlTobase64(url, type) {
      return new Promise((resolve, reject) => {
        uni.getFileSystemManager().readFile({
          filePath: url,
          encoding: 'base64',
          success: (res) => {
            let base64 = res.data;
            base64 = `data:image/${type};base64,${base64}`;
            resolve(base64);
          },
        });
      });
    },
    compress(imgUrl, options = {}) {
      /*************** 参数默认值 ***************/
      const MAX_PIXELS = 2000000; // 最大分辨率，宽 * 高 的值
      const MAX_QUALITY = 0.9; // 压缩质量
      const IMG_TYPE = 'jpg';
      const CANVAS_ID = 'compress_canvas';
      const BASE_64 = false;

      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: imgUrl,
          success: (res) => {
            const pixels = options.pixels || MAX_PIXELS;
            const quality = options.quality || MAX_QUALITY;
            const type = options.type || IMG_TYPE;
            const canvasId = options.canvasId || CANVAS_ID;
            const isBase64 = options.base64 || BASE_64;

            uni.getFileInfo({
              filePath: imgUrl,
              success: (imgInfo) => {
                console.log(imgInfo.size);

                if (imgInfo.size / 1024 / 1024 < 2) {
                  resolve(imgUrl);
                }
                console.log(this.calcImageSize(res, pixels));

                const { imgW, imgH } = this.calcImageSize(res, pixels);
                const width = options.width || imgW;
                const height = options.height || imgH;

                this.height = height;
                this.width = width;

                this.$nextTick(function () {
                  const canvas = uni.createCanvasContext(canvasId, this);
                  canvas.drawImage(res.path, 0, 0, width, height);
                  canvas.draw();
                  setTimeout(() => {
                    uni.canvasToTempFilePath(
                      {
                        canvasId: canvasId,
                        x: 0,
                        y: 0,
                        width,
                        height,
                        destWidth: width,
                        destHeight: height,
                        fileType: type,
                        quality: quality,
                        success: (file) => {
                          if (isBase64) {
                            this.urlTobase64(file.tempFilePath, type)
                              .then((res) => {
                                canvas = null;
                                resolve(res);
                              })
                              .catch((e) => {
                                reject({
                                  code: -4,
                                  msg: '图片转base64错误',
                                  data: e,
                                });
                              });
                          } else {
                            // #ifdef H5
                            const path = base64ToPath(file.tempFilePath);
                            window.URL.revokeObjectURL(file.tempFilePath);
                            resolve(path);
                            // #endif
                            // 在H5平台下，tempFilePath 为 base64
                            resolve(file.tempFilePath);
                          }
                        },
                        fail: (e) => {
                          reject({
                            code: -3,
                            msg: 'canvas转图片错误',
                            data: e,
                          });
                        },
                      },
                      this
                    );
                  }, 500);
                });
              },
            });
          },
        });
      });
    },
    start(imgUrl, options = {}) {
      return new Promise(async (resolve, reject) => {
        if (imgUrl instanceof Array) {
          try {
            resolve(
              imgUrl.map(async (item) => {
                return this.compress(item, options);
              })
            );
          } catch (e) {
            reject(e);
          }
        } else {
          this.compress(imgUrl, options).then(resolve).catch(reject);
        }
      });
    },
  },
};
</script>

<style scoped>
.compress {
  position: absolute;
  left: 10000px;
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
</style>
