<template>
	<view>
		<activityMall ref="mall" :shopCategoryId='shopCategoryId' />
	</view>
</template>

<script>
	import activityMall from '@/pages/home/activityMall/components/home.vue'
	export default {
		components: {
			activityMall
		},
		data() {
			return {
				shopCategoryId:0
			}
				},
		onReachBottom() {
		this.$refs.mall.getmore()
		},
		onLoad(options) {
			if(options.shopCategoryId==27){
				this.shopCategoryId=18
				uni.setNavigationBarTitle({  
				  title: '户外商家'  
				})
			}else if (options.shopCategoryId==26){
				this.shopCategoryId=17
				uni.setNavigationBarTitle({  
				  title: '户内商家'  
				})
			}else if (options.shopCategoryId==28){
				this.shopCategoryId=19
				uni.setNavigationBarTitle({  
				  title: '团购商家'  
				})
			}
			let {
				type,
				shopCategoryId,
				shopCategoryName,
				keyword
			} = options
			let categotyInfo = ''
			if (type == 2 && shopCategoryId) {
				categotyInfo = {
					id: parseInt(shopCategoryId),
					name: shopCategoryName
				}
			}
			this.$refs.mall.initData(type, categotyInfo, keyword)
		}
	}
</script>

<style lang="scss" scoped>

</style>
