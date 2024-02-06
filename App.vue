<script>
import { setstorage } from '@/utils/index.js';
export default {
  globalData: {
    uploadUrl: 'http://coc.51api.dcqcjlb.com/coc-file/api/v1/oss/upload',
    ossurl: 'https://oss.dcqcjlb.com',
    pdH5Url: 'https://pd.51dsrz.com/h5/index.html#/pages/partner/index',
    //51车H5入驻测试环境 https://dispatch.51api.dcqcjlb.com/h5/index.html#/pages/partner/index
    //51车H5入驻正式环境 https://pd.51dsrz.com/h5/index.html#/pages/partner/index
    nim: {},
  },
  onLaunch: function () {
    uni.getPrivacySetting().then((res) => {
      setstorage('needAuthorization', res[1].needAuthorization);
    });
    // #ifdef  H5
    if (uni.getLaunchOptionsSync().query.token) {
      setstorage('token', uni.getLaunchOptionsSync().query.token);
    }
    // #endif
    console.log('App Launch');
    uni.hideTabBar();
    setstorage('menuconfiglist', '');
    const updateManager = uni.getUpdateManager(); // 小程序版本更新管理器
    updateManager.onCheckForUpdate((res) => {
      // 检测新版本后的回调
      if (res.hasUpdate) {
        // 如果有新版本提醒并进行强制升级
        uni.showModal({
          content: '新版本已经准备好，是否重启应用？',
          showCancel: false,
          confirmText: '确定',
          success: (res) => {
            if (res.confirm) {
              updateManager.onUpdateReady((res) => {
                // 新版本下载完成的回调
                updateManager.applyUpdate(); // 强制当前小程序应用上新版本并重启
              });

              updateManager.onUpdateFailed((res) => {
                // 新版本下载失败的回调
                // 新版本下载失败，提示用户删除后通过冷启动重新打开
                uni.showModal({
                  content: '下载失败，请删除当前小程序后重新打开',
                  showCancel: false,
                  confirmText: '知道了',
                });
              });
            }
          },
        });
      }
    });
  },
  onShow: function () {
    console.log('App Show');
    uni.getSystemInfo({
      success: (result) => {
        // 获取手机系统的状态栏高度（不同手机的状态栏高度不同）  （ 不要使用uni-app官方文档的var(--status-bar-height) 官方这个是固定的20px  不对的 ）
        // console.log('当前手机的状态栏高度',result.statusBarHeight)
        let statusBarHeight = result.statusBarHeight;
        // 获取右侧胶囊的信息 单位px
        // #ifndef H5 || APP-PLUS || MP-ALIPAY
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect();

        // h5 app mp-alipay不支持微信的方法

        //bottom: 胶囊底部距离屏幕顶部的距离
        //height: 胶囊高度
        //left:   胶囊左侧距离屏幕左侧的距离
        //right:  胶囊右侧距离屏幕左侧的距离
        //top:    胶囊顶部距离屏幕顶部的距离
        //width:  胶囊宽度
        // console.log(menuButtonInfo.width, menuButtonInfo.height, menuButtonInfo.top)
        // console.log('计算胶囊右侧距离屏幕右边距离', result.screenWidth - menuButtonInfo.right)
        let menuWidth = menuButtonInfo.width;
        let menuHeight = menuButtonInfo.height;
        let menuBorderRadius = menuButtonInfo.height / 2;
        let menuRight = result.screenWidth - menuButtonInfo.right;
        let menuTop = menuButtonInfo.top;
        let contentTop = result.statusBarHeight + 44;
        let menuInfo = {
          statusBarHeight: statusBarHeight, //状态栏高度----用来给自定义导航条页面的顶部导航条设计padding-top使用：目的留出系统的状态栏区域
          menuWidth: menuWidth, //右侧的胶囊宽度--用来给自定义导航条页面的左侧胶囊设置使用
          menuHeight: menuHeight, //右侧的胶囊高度--用来给自定义导航条页面的左侧胶囊设置使用
          menuBorderRadius: menuBorderRadius, //一半的圆角--用来给自定义导航条页面的左侧胶囊设置使用
          menuRight: menuRight, //右侧的胶囊距离右侧屏幕距离--用来给自定义导航条页面的左侧胶囊设置使用
          menuTop: menuTop, //右侧的胶囊顶部距离屏幕顶部的距离--用来给自定义导航条页面的左侧胶囊设置使用
          contentTop: contentTop, //内容区距离页面最上方的高度--用来给自定义导航条页面的内容区定位距离使用
        };
        // console.log(menuInfo, "menuInfo")
        uni.setStorageSync('menuInfo', menuInfo);
        // #endif
      },
      fail: (error) => {
        console.log(error);
      },
    });
  },
  onHide: function () {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';

page {
  background-color: #f8f8f8;
  color: #222222;
  font-size: 28rpx;
}

.bgfff {
  background-color: #fff;
}

.bgf8 {
  background-color: #f8f8f8;
}

.pageContainer {
  padding: 24rpx 36rpx;
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.alc {
  align-items: center;
}

.jsc {
  justify-content: center;
}

.jsb {
  justify-content: space-between;
}

.tac {
  text-align: center;
}

.size20 {
  font-size: 20rpx;
}

.size24 {
  font-size: 24rpx;
}

.size28 {
  font-size: 28rpx;
}

.size32 {
  font-size: 32rpx;
}

.mt10 {
  margin-top: 10rpx;
}

.mt20 {
  margin-top: 20rpx;
}

.mt30 {
  margin-top: 30rpx;
}

.mb10 {
  margin-bottom: 10rpx;
}

.ml10 {
  margin-left: 10rpx;
}

.ml20 {
  margin-left: 20rpx;
}

.mb20 {
  margin-bottom: 20rpx;
}

.mr10 {
  margin-right: 10rpx;
}

.fw500 {
  font-weight: 500;
}

.fwb {
  font-weight: bold;
}

.br10 {
  border-radius: 10rpx;
}

.mainRed {
  color: #d91b1b;
}

.colorff {
  color: #ffffff;
}

.bgRed {
  background-color: #d91b1b;
}

.bgGray {
  background-color: #999999;
}

.txtDarkGray {
  color: #666;
}

.txtLighGray {
  color: #999;
}

.mr20 {
  margin-right: 20rpx;
}

.txtColorWhite {
  color: #ffffff;
}

.txtls {
  text-decoration: line-through;
}

.moreLine {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.oneLine {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.u-flex-wrap {
  flex-wrap: wrap;
}

.rebate-img {
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230824/file_1692868301238.png');
  background-size: 100% 100%;
  z-index: 2;
}

.rebate-style {
  background: #ffdbdb;
  border-radius: 24rpx;
  font-size: 24rpx;
  color: #d91b1b;
  font-weight: bold;
  padding: 8rpx 8rpx 8rpx 46rpx;
  margin-left: -40rpx;
  z-index: 1;
}

.rebate-size {
  width: 48rpx;
  height: 48rpx;
}

.margin25 {
  margin: 25rpx;
}

.padding25 {
  padding: 25rpx;
}

.joinshop {
  width: 160rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  background: #d91b1b;
  border-radius: 137rpx;
  font-size: 28rpx;
  color: #ffffff;
}
.mt40 {
  margin-top: 40rpx;
}

.waterfall {
  #waterfalls_flow_column_2,
  .waterfalls-flow-column {
    margin-left: 10rpx !important;
  }
  .column-value-show {
    margin-bottom: 10rpx !important;
  }
}

// 我的搜索 组件在：dcqcjlbH5\components\TypeTabs
.typeTabsClass {
  .u-tabs__wrapper__nav__line {
    display: none;
  }
  .u-tabs__wrapper__nav > .u-tabs__wrapper__nav__item:first-child {
    padding-left: 0;
  }
}
.search__placeholder {
  .u-notice-bar {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .u-notice__left-icon {
    display: none;
  }
}
</style>
