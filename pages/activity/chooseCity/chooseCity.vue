<template>
	<view class="warp">
		<u-index-list :scrollTop="scrollTop" :index-list="lettersArr" :sticky='false'>

			<view v-for="(listItem, index) in indexListData" :key="index">
				<u-index-item>
					<u-index-anchor :text="lettersArr[index]" use-slot>
					</u-index-anchor>
					<view class="list-cell" v-for="(li,indasd) in listItem.item" :key='indasd' @click="bindClick(li)">
						<text>{{li.name}}</text>
					</view>
				</u-index-item>
			</view>

		</u-index-list>

	</view>
</template>

<script>
	import indexListData from '@/utils/city.js'
	export default {
		data() {
			return {
				keyword: '',
				scrollTop: 0,
				indexList: indexListData.map(item => item.title),
				indexListData: indexListData,
				lettersArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				emitName: ''
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad({
			emitName
		}) {
			this.emitName = emitName
		},
		methods: {
			washData(wordArrs) {
				let newArrs = this.lettersArr.map(item => ({
					letter: item,
					data: []
				}));
				for (let i = 0; i < wordArrs.length; i++) {
					//获取每条数据里的名称
					let wordName = wordArrs[i].name;
					//获取所有名称的首字母，并且大写
					let fristName = pinyin(wordName, {
						style: pinyin.STYLE_NORMAL,
						heteronym: true
					})[0][0].substring(0, 1).toUpperCase();

					newArrs.forEach((el) => {
						if (el.letter === fristName) {
							//放入新的数组中
							el.data.push(wordArrs[i])
						}
					});

				}
				return newArrs.filter(item => item.data.length)
			},
			bindClick(item) {
				uni.$emit('homeChangeCity', item)
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.indexAnchor {
		padding-left: 10rpx;
		border-left: 2px solid red;
		font-size: 14px;
		line-height: 1.2;

	}


	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		align-items: center;

		>text {
			margin-left: 10rpx;
		}

		>image {
			height: 30rpx;
			width: 30rpx;
		}
	}

	.search {
		padding: 10rpx 30rpx;
	}

	.recommend {
		display: flex;
		flex-wrap: wrap;
		// background-color: #f5f5f5;
		padding-bottom: 20rpx;

		>.car {
			margin: 20rpx 0 0 20rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #222222;
			padding: 0 22rpx;
			line-height: 72rpx;
			background-color: #fff;
			box-sizing: border-box;
			border-radius: 10rpx;
			border: 1px solid #eee;

			>image {
				height: 30rpx;
				width: 30rpx;
			}

			>text {
				margin-left: 10rpx;
			}
		}

	}

	.indexedList {
		position: relative;
		height: calc(100vh - 100rpx);
	}
</style>
