<template>
  <view class="search">
    <view class="search__box">
      <swiper
        :vertical="true"
        duration="500"
        :circular="true"
        :autoplay="autoplay"
        class="search__swiperBox"
      >
        <swiper-item v-for="(v, index) in barArr" :key="index">
          <input
            :value="value"
            :placeholder="placeholderVal(v)"
            placeholder-style="color:#999999;font-size:27rpx;font-family: PingFang SC-Regular, PingFang SC;"
            class="search__input"
            @blur="handleBlur"
            @input="handleChange"
            @focus="handleFocus"
          />rightImage
        </swiper-item>
      </swiper>
      <image
        v-if="inputSrc"
        :src="inputSrc"
        class="search__image"
        @click="handleBlur"
      />
    </view>
    <image
      v-if="rightImage"
      :style="rightImageStyle"
      :src="rightImage"
      class="search__right--img"
      @click="handleClick"
    />
    <view
      v-else-if="rightType === 1"
      style="position: relative"
      @click="handleClick"
    >
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231106/file_1699234220308.png"
        class="search__right--img"
      />
      <view class="search__right--num" v-if="rightVal > 0">{{ rightVal }}</view>
    </view>
    <!-- 客服按钮 -->
    <button
      v-else-if="labour"
      open-type="contact"
      session-from=""
      class="kefu-contact"
    >
      <image class="search-frame-right" src="@/static/image/kefu.svg"></image>
    </button>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputSrc: {
      type: String,
      default:
        'https://oss.dcqcjlb.com/51che_java_dev/20231106/file_1699234499627.png',
    },
    rightImage: {
      type: String,
      default: '',
    },
    barArr: {
      type: Array,
      default: () => ['51车·人车生活俱乐部', '请输入技师名称'],
    },
    rightImageStyle: {
      type: String,
      default: '',
    },
    // 类型
    rightType: {
      type: Number,
      default: 0,
    },
    rightVal: {
      type: Number,
      default: 0,
    },
    labour: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      autoplay: true,

      input: '',
    };
  },
  computed: {
    placeholderVal() {
      return function (v) {
        return this.autoplay ? v : this.placeholder;
      };
    },
  },
  mounted() {},
  // watch: {
  //   value: function (v) {
  //     console.log(v);
  //     if (v !== '') {
  //       this.autoplay = false;
  //     }
  //   },
  // },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    handleFocus() {
      this.autoplay = false;
    },
    handleBlur(v) {
      console.log(v);
      if (this.value) {
        this.autoplay = false;
      } else {
        this.autoplay = true;
      }
      this.$emit('blur');
    },
    handleChange(v) {
      this.$emit('update:value', v.target.value);
      if (!v.target.value) {
        // 没直也要调用接口
        this.$emit('blur');
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.search {
  background: #ffffff;
  padding: 16rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__box {
    position: relative;
    height: 64rpx;
    line-height: 64rpx;
    width: 100%;
    flex: 1;
    background: #f8f8f8;
    border-radius: 32rpx;
    overflow: hidden;
  }
  &__swiperBox {
    width: 100%;
    height: 64rpx;
    line-height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
  &__input {
    flex: 1;
    height: 64rpx;
    line-height: 64rpx;
    display: block;
    padding-left: 30rpx;
    border-radius: 30rpx;
  }
  &__image {
    width: 46rpx;
    height: 46rpx;
    margin-right: 15rpx;
    position: absolute;
    right: 10rpx;
    top: 4px;
  }
  &__right--img {
    width: 46rpx;
    height: 46rpx;
    padding-left: 20rpx;
  }
  &__right--num {
    background: #d91b1b;
    border-radius: 275rpx;
    font-size: 23rpx;
    font-family: PingFang SC, PingFang SC;
    padding: 3rpx 10rpx;
    position: absolute;
    right: -7px;
    top: -10px;
    color: #ffffff;
  }
}
.kefu-contact {
  background: none;
  border: none;
  outline: none;
  padding: 0 15rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  .search-frame-right {
    width: 37rpx;
    height: 37rpx;
  }
}

button::after {
  border: none;
}
</style>
