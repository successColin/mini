<template>
  <movable-area>
    <movable-view direction="all">	
		<view class="float">
			<image
				v-if="tag !== 7 && tag !== 8 && tag !== 9 && tag !== 12 && tag !== 13"
				src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698374080078.png"
				class="float-image1"
				@click="setTag"
			/>
			<image
				v-else-if="tag === 8"
				src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698374236838.png"
				class="float-image2"
				@click="setTag"
			/>
			<image
				v-else-if="tag === 9"
				src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698374324103.png"
				class="float-image3"
				@click="setTag"
			/>
			<image
				v-else-if="tag === 7"
				src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698374358294.png"
				class="float-image4"
				@click="setTag"
			/>
		</view>
	</movable-view>
  </movable-area>
</template>

<script>
export default {
  props: {
    tag: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setTag() {
      const list = [
        {
          id: 1,
          url: '/pages/advertisement/choice',
        },
        {
          id: 2,
          url: '/pages/grouppurchase/index',
        },
        {
          id: 3,
          url: '/pages/activity/activityRegistration/outdoorsactivity',
        },
        {
          id: 4,
          url: '/pages/activity/activityRegistration/indooractivity',
        },
        {
          id: 5,
          url: '/pages/carShops/4sShop/play',
        },
        {
          id: 6,
          url: '/pages/carShops/upkeep/index',
        },
        {
          id: 7,
          url: '/pages/roadhelp/faultAbout/faultSearch',
        },
        {
          id: 8,
          url: '/pages/upkeep/consult',
        },
        {
          id: 9,
          url: '/pages/roadhelp/index',
        },
        {
          id: 10,
          url: '/pages/carShops/motorcycletype/index',
        },
        {
          id: 11,
          url: '/pages/activity/activityRegistration/campusCulture',
        },
        {
          id: 12,
          url: '',
        },
        {
          id: 13,
          url: '',
        },
        {
          id: 14,
          url: '/pages/activity/activityRegistration/playfulperson',
        },
        {
          id: 15,
          url: '/pages/activityMall/list',
        },
        {
          id: 17,
          url: '/pages/gourmetGroggery/index',
        },
      ];
      let url = '';
      list.forEach((v) => {
        if (v.id === this.tag) {
          url = v.url;
        }
      });

      if (url.length) {
        uni.navigateTo({ url });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.float {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160rpx;
  z-index: 2000;

  &-image1 {
    width: 107rpx;
    height: 113rpx;
  }

  &-image2 {
    width: 124rpx;
    height: 120rpx;
  }

  &-image3 {
    width: 124rpx;
    height: 101rpx;
  }

  &-image4 {
    width: 124rpx;
    height: 104rpx;
  }
}

movable-area {
	position: fixed;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 10000;
	top: 0;
	left: 0;
}

movable-view {
	position: absolute;
	width: auto;
	height: auto;
	display: inline-block;
	pointer-events: auto;
	top: 450rpx;
	left: 750rpx;
}
</style>