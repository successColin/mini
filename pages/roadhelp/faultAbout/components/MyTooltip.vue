<!--
 * @Descripttion: 长按
 * @Author: ytx
 * @Date: 2023-11-28 14:23:01
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-28 14:23:01
-->
<template>
  <view class="tooltip">
    <u-overlay
      :show="showTooltip"
      customStyle="backgroundColor: rgba(0, 0, 0, 0)"
      @click="overlayClickHandler"
    ></u-overlay>
    <view class="tooltip__wrapper">
      <rich-text
        :nodes="node.body"
        @longpress.stop="longpressHandler"
      ></rich-text>
      <u-transition
        mode="fade"
        :show="showTooltip"
        duration="300"
        :customStyle="{
          position: 'absolute',
          top: tooltipTop,
          zIndex: 10071,
          ...tooltipStyle,
        }"
      >
        <view class="tooltip__wrapper__popup">
          <view
            class="tooltip__wrapper__popup__indicator"
            hover-class="tooltip__wrapper__popup__indicator--hover"
            :style="[indicatorStyle]"
          >
          </view>
          <view class="tooltip__wrapper__popup__list">
            <block v-for="(item, index) in shadeArr" :key="index">
              <view
                class="tooltip__wrapper__popup__list__btn"
                hover-class="tooltip__wrapper__popup__list__btn--hover"
              >
                <text
                  class="tooltip__wrapper__popup__list__btn__text"
                  @click="btnClickHandler(item.fun)"
                >
                  {{ item.name }}
                </text>
              </view>
              <u-line
                direction="column"
                color="#8d8e90"
                v-if="index < shadeArr.length - 1"
                length="18"
              ></u-line>
            </block>
          </view>
        </view>
      </u-transition>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showTooltip: false,
      tooltipTop: 0,
      pos: {},
      // 三角形指示器的样式
      indicatorStyle: {},

      shadeArr: [
        {
          name: '复制',
          fun: 'handleCopy',
        },
        // {
        //   name: '删除',
        //   fun: 'handleDelete',
        // },
        // {
        //   name: '撤回',
        //   fun: 'handleRevocation',
        // },
      ],
    };
  },
  computed: {
    // 计算气泡和指示器的位置信息
    tooltipStyle() {
      this.indicatorStyle = {};
      const style = {
        transform: `translateY(-100%)`,
      };

      // let left = '';
      // if (this.shadeArr.length === 1) {
      //   left = '40rpx';
      // } else if (this.shadeArr.length === 2) {
      //   left = '60rpx';
      // } else if (this.shadeArr.length === 3) {
      //   left = '80rpx';
      // }
      if (this.pos.x < 375 / 2 / 2) {
        style.left = '-20rpx';
        this.indicatorStyle.left = '20rpx';
      } else if (this.pos.x < 375 / 2) {
        style.left = '40rpx';
        this.indicatorStyle.left = '40rpx';
        // this.indicatorStyle.left = '80rpx';
      } else if (this.pos.x < (375 / 2 / 2) * 3) {
        style.left = '240rpx';
        this.indicatorStyle.left = '40rpx';
        // style.left = '160rpx';
        // this.indicatorStyle.left = '160rpx';
      } else if (this.pos.x < 375) {
        style.right = '-60rpx';
        this.indicatorStyle.right = '50rpx';
      }
      style.marginTop = '-23rpx';
      this.indicatorStyle.bottom = '-4rpx';
      return style;
    },
  },
  mounted() {},
  methods: {
    // 长按触发事件
    async longpressHandler(e) {
      console.log(e);
      // this.pos = e.detail;
      // this.showTooltip = true;
      // this.tooltipTop = 0;
    },
    // 点击透明遮罩
    overlayClickHandler() {
      this.showTooltip = false;
    },
    // 点击弹出按钮
    btnClickHandler(func) {
      this.showTooltip = false;
      this[func]();
    },
    // 复制
    handleCopy() {
      console.log('复制');
      uni.setClipboardData({
        // 优先使用copyText字段，如果没有，则默认使用text字段当做复制的内容
        data: this.node.body,
        success: () => {
          this.showTooltip && uni.$u.toast('复制成功');
        },
        fail: () => {
          this.showTooltip && uni.$u.toast('复制失败');
        },
      });
    },
    // 删除
    handleDelete() {
      console.log('删除');
    },
    // 撤回
    async handleRevocation() {
      console.log('撤回');
      msg = await getApp().globalData.nim.msg.recallMsg({
        ps: 'recall msg',
        msg: this.node,
      });
      console.log();
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  &__wrapper {
    &__text {
      font-size: 14px;
    }
    &__popup {
      @include flex;
      justify-content: center;

      &__list {
        background-color: #060607;
        position: relative;
        flex: 1;
        border-radius: 5px;
        padding: 0px 0;
        @include flex(row);
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        &__btn {
          padding: 11px 13px;
          &--hover {
            background-color: #58595b;
          }
          &__text {
            line-height: 12px;
            font-size: 13px;
            color: #ffffff;
          }
        }
      }
      &__indicator {
        position: absolute;
        background-color: #060607;
        width: 14px;
        height: 14px;
        bottom: -4px;
        transform: rotate(45deg);
        border-radius: 2px;
        z-index: -1;
        &--hover {
          background-color: #58595b;
        }
      }
    }
  }
}
</style>
