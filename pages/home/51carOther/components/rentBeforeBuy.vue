<template>
	<view class="page">
		<carousel :topStyle="{ marginTop: '20rpx' }" :radius="5" height="300rpx" urlkey="url" :dataType="2"
			systemCode="applets_rent_before_buy" :indicatorType="5">
		</carousel>
		<view class="tab_list">
			<image class="tab_item" v-for="item in tabList" :src="item.url" @click="jumpShowUrl(item)"></image>
		</view>
		<callist :type="2" :brandApi="brandApi" :carApi="carApi"></callist>
		<consultation v-if="msgShow" @close="msgShow=false" title="测融资额" :msgObj="msgObj" :type="3"></consultation>
	</view>
</template>

<script>
	import consultation from './consultation.vue'
	import carousel from "@/components/carousel/index.vue"
	import callist from "./carList.vue"
	export default {
		components: {
			carousel,
			callist,
			consultation
		},
		data() {
			return {
				tabList: [{
					name: '个人购车',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695088885702.png',
					type: 1
				}, {
					name: '企业购车',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695088905061.png',
					type: 2
				}, {
					name: '了解51车',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695088924221.png',
					type: 3
				}, {
					name: '测试融资',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695088940938.png',
					type: 4
				}],
				brandApi: "/app/wechat/api",
				carApi: "/app/wechat/api",
				msgShow: false,
				msgObj: {}
			}
		},
		methods: {
			jumpShowUrl(item) {
				if (item.type == 4) {
					this.openMsg()
				} else {
					uni.navigateTo({
						url: `/pages/carShops/51carOther/showPage?type=${item.type}&title=${item.name}`
					})
				}
			},
			openMsg(obj) {
				this.msgShow = true
				this.msgObj = obj
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 0 25rpx;
	}

	.tab_list {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.tab_item {
			width: 165rpx;
			height: 102rpx;
		}
	}
</style>
