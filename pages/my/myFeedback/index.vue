<template>
	<view class="page">
		<view class="card">
			<view class="title">意见反馈</view>
			<view style="margin-top: 40rpx;">
				<u--textarea v-model="dataList.complaintContent" placeholder="请输入反馈意见"
					:customStyle="{backgroundColor:'rgb(248,248,248)'}"></u--textarea>
			</view>
		<!-- 	<view style="margin-top: 40rpx;">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="9"></u-upload>
			</view> -->
		</view>
		<view class="u-flex card" style="margin-top: 40rpx;padding: 20rpx; display: none;"  v-if="type==1">
			<view style="border-right: 1rpx #e6e6e6 solid;padding-right: 40rpx;">
				<image style="width: 81rpx;height: 81rpx;" :src="info.shopVO.headImg"></image>
			</view>
			<view style="margin-left: 40rpx;font-size: 24rpx;width: 466rpx;">
				<view style="font-size: 28rpx;">
					{{info.shopVO.shopName}}<text
						style="font-size: 24rpx;color: #999999;margin-left: 20rpx;">{{info.activity.createdAt}}</text>
				</view>
				<view style="margin-top: 20rpx;">
					{{info.activity.title}}
				</view>
				<view style="margin-top: 20rpx;">
					发起人{{info.shopVO.shopName}}
				</view>
			<!-- 	<view style="margin-top: 20rpx;">
					报名截至时间{{info.activity.signUpEndTime}}
				</view> -->
				<view style="margin-top: 20rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
						<u-parse :content="info.activity.detail"></u-parse>
				</view>
			</view>
		</view>
		<view style="margin-top: 40rpx;" class="u-flex">
			<view style="font-size: 32rpx;    line-height: 76rpx;">
				联系方式
			</view>
			<view style="margin-left: 20rpx;">
				<u--input v-model="dataList.mobile" placeholder="请输入手机号码" type="number"
					:customStyle="{backgroundColor:'#ffffff',width:'480rpx'}"></u--input>
			</view>
		</view>
		<view class="Submit" @click="OnSubmit">
			<text>提交反馈</text>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				info: {},
				type: '',
				fileList1: [],
				dataList: {
					imgs: '',
					complaintContent: '',
					mobile: ''
				}
			}
		},

		onLoad(option) {
			let _this = this
			if (option.type == 2) {
				this.type =option.type
			} else {
				this.type =option.type
				let _this = this
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.on('getinfo', function(data) {
					uni.$u.sleep(0).then(() => {
						_this.info = data.data
					})

				})
			}
		},
		onShow() {},
		methods: {
			getdate(val) {
				var aa = val.substring(5, 10)
				return aa

			},
			gettiem(dateTimeStamp) {
				let newdate = Date.parse(dateTimeStamp)
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - newdate;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = ''
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else
					result = "刚刚";
				return result;
			},
			OnSubmit() {
				var reg = '^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$';
				var regExp = new RegExp(reg);
				if (!this.dataList.complaintContent) {
					this.$refs.uToast.show({
						type: 'default',
						message: '请输入反馈意见',
					})
					return false
				}
				if (!regExp.test(this.dataList.mobile)) {
					this.$refs.uToast.show({
						type: 'default',
						message: '请输入正确格式手机号码',
					})
					return false
				}

				this.fileList1.filter((res, index) => {
					if (index == 0) {
						this.dataList.imgs = res.url
					} else {
						this.dataList.imgs = this.dataList.imgs + "," + res.url
					}
				})
				this.dataList.type = this.type

				if (this.type == 1) {
					this.dataList.objId = this.info.activity.id
					this.dataList.objType = 1
				}
				this.$request.post('/coc-my/api/v1/my/complaint/management/add', this.dataList).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							type: 'success',
							message: '反馈成功',
							complete() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: getApp().globalData.uploadUrl, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).data)
							}, 0)
						}
					});
				})
			},

		}
	}
</script>

<style lang="scss">
	.page {
		margin: 40rpx;
	}

	.card {
		background-color: #ffffff;
		border-radius: 14px;
		padding: 20rpx;

		.title {
			font-size: 28rpx;
			font-weight: bold;
		}
	}

	.Submit {
		margin-top: 100rpx;
		text-align: center;

		text {
			background-color: #d91b1b;
			border-radius: 40rpx;
			font-size: 32rpx;
			color: #ffffff;
			font-weight: bold;
			width: 599rpx;
			height: 81rpx;
			display: inline-block;
			line-height: 81rpx;
		}
	}
</style>
