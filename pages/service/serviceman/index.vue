<template>
	<view class="page">
		<view v-if="isconnect" class="endservice">
			<text @click="show=true">结束会话</text>
		</view>
		<view class="card" v-if="isautomaticreply">
			<view class="card-left">
				<view class="problemtype">
					<view @click="Onproblemtype(index)" style="margin-top: 20rpx;" v-for="(item,index) in dataList"
						:key="index" :class="{'current':index==current}">
						{{item[0].name}}
					</view>
				</view>
				<view class="hr">
				</view>
			</view>
			<view class="card-right">
				<view class="problem" v-for="(item,index) in dataList[current][1]" :key="index">
					<view @click="Onquestion(item)">{{item.questionDescribe}}</view>
					<view style="margin-top: 10rpx;">
						<u-icon size="12" name="arrow-right" :bold='true' color="#666666"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 10rpx;padding-top: 40rpx;" v-else>
			<view v-for="(item,index) in message" :key="index" :class="item.type==1?'me-class':null">
				<view v-if="item.type==1" class="message-me">
					<view style="margin-right: 20rpx;">
						<view class="title">
							<text style="margin-right: 20rpx;">我</text>
							<text>{{item.time}}</text>
						</view>
						<view class="question">
							{{item.msg}}
						</view>
					</view>
					<view>
						<u-avatar shape="square" :src="getheadImg()" size="35"></u-avatar>
					</view>
				</view>
				<view class="message-zn" v-else-if="item.type==2">
					<view v-if="item.avatar">
						<u-avatar shape="square"
							src="https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20220922/fdd6c3d2d6d44dd88fc14cb6049540c9.png"
							size="35"></u-avatar>
					</view>
					<view v-else>
						<u-avatar shape="square"
							src="https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20220922/cb0410204365437aa669ddbb815f435d.png"
							size="35"></u-avatar>
					</view>

					<view style="margin-right: 20rpx;">
						<view class="title">
							<text style="margin-right: 20rpx;">{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<view class="defaultAnswer">
							<view>{{item.defaultAnswer}}</view>
							<view v-if="item.questions" class="about">
								<view>【相关问题】</view>
								<view v-for="(item2,index2) in item.questions" :key="index2" class="about-question"
									@click="OnOnquestion2(item2)">
									{{item2.questionDescribe}}
								</view>
							</view>
							<!-- 分割线 -->
							<view v-if="!item.isfalse">
								<u-divider text="以上回答是否解决了您的问题"></u-divider>
							</view>
							<view class="feedback">
								<view v-if="!item.isfalse" class="thumb" @click="Onthumb(1)"
									:class="thumb2==1?'choosethumb':null">
									<view style="margin-left: 34rpx;">有用</view>
									<view v-if="thumb2==1">
										<u-icon color="#ffffff" labelSize="14" name="thumb-up"></u-icon>
									</view>
									<view v-else>
										<u-icon labelSize="14" name="thumb-up"></u-icon>
									</view>

								</view>
								<view v-if="!item.isfalse" class="thumb" @click="Onthumb(2)"
									:class="thumb2==2?'choosethumb':null">
									<view style="margin-left: 34rpx;">无用</view>
									<view v-if="thumb2==2">
										<u-icon color="#ffffff" labelSize="14" name="thumb-down"></u-icon>
									</view>
									<view v-else>
										<u-icon labelSize="14" name="thumb-down"></u-icon>
									</view>
								</view>
							</view>

						</view>
						<view v-if="thumb2==1" style="font-size: 28rpx;text-align: center;margin-top: 40rpx;">
							感谢您的支持，欢迎常来~
						</view>
						<view v-if="isconnecttext&&!item.isfalse"
							style="font-size: 28rpx;text-align: center;margin-top: 40rpx;">
							是否联系<text style="color: #3098e0;text-decoration: underline;"
								@click="Oncustomerservice">人工客服</text>？
						</view>
					</view>
				</view>
				<view class="message-zn" v-else-if="item.type==3">
					<view v-if="item.avatar">
						<u-avatar shape="square"
							src="https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20220922/fdd6c3d2d6d44dd88fc14cb6049540c9.png"
							size="35"></u-avatar>
					</view>
					<view v-else>
						<u-avatar shape="square"
							src="https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20220922/cb0410204365437aa669ddbb815f435d.png"
							size="35"></u-avatar>
					</view>
					<view style="margin-right: 20rpx;">
						<view class="title">
							<text style="margin-right: 20rpx;">{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<view class="defaultAnswer">
							<view>{{item.defaultAnswer}}</view>
							<!-- 分割线 -->
							<view v-if="!item.isfalse">
								<u-divider text="以上回答是否解决了您的问题"></u-divider>
							</view>
							<view class="feedback" v-if="!item.isfalse">
								<view class="thumb" @click="Onthumb3(1)" :class="thumb3==1?'choosethumb':null">
									<view style="margin-left: 34rpx;">有用</view>
									<view v-if="thumb3==1">
										<u-icon color="#ffffff" labelSize="14" name="thumb-up"></u-icon>
									</view>
									<view v-else>
										<u-icon labelSize="14" name="thumb-up"></u-icon>
									</view>

								</view>
								<view class="thumb" @click="Onthumb3(2)" :class="thumb3==2?'choosethumb':null">
									<view style="margin-left: 34rpx;">无用</view>
									<view v-if="thumb3==2">
										<u-icon color="#ffffff" labelSize="14" name="thumb-down"></u-icon>
									</view>
									<view v-else>
										<u-icon labelSize="14" name="thumb-down"></u-icon>
									</view>
								</view>
							</view>

						</view>
						<view v-if="thumb3==1" style="font-size: 28rpx;text-align: center;margin-top: 40rpx;">
							感谢您的支持，欢迎常来~
						</view>
						<view v-if="isconnecttext3" style="font-size: 28rpx;text-align: center;margin-top: 40rpx;">
							是否联系<text style="color: #3098e0;text-decoration: underline;"
								@click="Oncustomerservice">人工客服</text>？
						</view>

					</view>
				</view>

			</view>
		</view>
		<view style="display: none;">
			<u-count-down @finish='Onfinish' ref="countDown" :time="120000" format="mm:ss" :autoStart="false"
				millisecond>
			</u-count-down>
		</view>

		<view style="height: 400rpx;"></view>
		<view class="bottom-chat">
			<view class="u-input">
				<view class="input">
					<u--input v-model="msg" placeholder="请输入对话内容"></u--input>
				</view>
				<view @click="Onsendout" class="btn-send">
					<view>发送</view>
					<view>
						<image style="width: 30rpx;height: 24rpx;" src="@/pages/service/static/image/zhifeiji.png"></image>
					</view>
				</view>
			</view>
		</view>
		<u-loading-page :loading="loading"></u-loading-page>
		<u-popup :safeAreaInsetBottom='false' :show="show" @close="returnrouter" mode="center">
			<view class="pop">
				<view style="margin-top: 40rpx;margin-left: 40rpx;">1.本次回话您的问题是否得到了解决？</view>
				<view style="margin-top: 20rpx;margin-left: 80rpx;">
					<u-radio-group labelSize='14' v-model="score.statusResult" placement="row">
						<u-radio labelSize='14' :customStyle="{marginBottom: '8px'}" label="已解决" name="0">
						</u-radio>
						<u-radio labelSize='14' :customStyle="{marginBottom: '8px'}" label="未解决" name="1">
						</u-radio>
					</u-radio-group>
				</view>
				<view style="margin-top: 40rpx;margin-left: 40rpx;">2.您是否会将51车俱乐部的服务推荐给好友？</view>
				<view style="margin-top: 20rpx;margin-left: 80rpx;">
					<u-radio-group labelSize='14' v-model="score.isRecommend" placement="row">
						<u-radio labelSize='14' :customStyle="{marginBottom: '8px'}" label="推荐" name="0">
						</u-radio>
						<u-radio labelSize='14' :customStyle="{marginBottom: '8px'}" label="不推荐" name="1">
						</u-radio>
					</u-radio-group>
				</view>
				<view style="margin-top: 40rpx;margin-left: 40rpx;">3.请您为本次服务进行评价</view>
				<view style="margin-top: 20rpx;margin-left: 80rpx;">
					<u-rate active-color="#f7c261" count="5" v-model="score.score"></u-rate>
				</view>
				<view class="btn">
					<text @click="Onevaluate">提交评价</text>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				score: {
					statusResult: '0',
					isRecommend: '0',
					score: 5
				},
				vshow: true,
				show: false,
				thumb3: false,
				isconnecttext: false,
				isthumb2: false,
				thumb2: null,
				message: [],
				loading: false,
				isconnect: false,
				isautomaticreply: true,
				dataList: [],
				msg: '',
				current: 0,
				serviceNo: '',
				serviceId: '',
				serviceName: '',
				question: '',
				isthumb3: '',
				isconnecttext3: '',
				show: false,
			}
		},

		onLoad() {
			this.getList()
		},
		onShow() {},
		onUnload() {
			uni.closeSocket({})
		},
		methods: {
			Onevaluate() {
				this.score.serviceNo = this.serviceNo
				this.show = false
				this.$request.post("/coc-asback/api/v1/complaint_feedback/update", this.score).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: "评分成功",
							type: "success",
							complete() {
								uni.navigateBack({
									delta: 1
								});
							}
						})
					}
				})
			},
			returnrouter() {
				uni.navigateBack({
					delta: 1
				});
			},
			Onfinish() {
				this.show = true
			},
			Onthumb3(index) {
				if (!this.isthumb3) {

					this.thumb3 = index
					this.isthumb3 = true
					if (index == 2) {
						this.isconnecttext3 = true
					}
				}
			},
			Onthumb(index) {

				if (!this.isthumb2) {

					this.thumb2 = index
					this.isthumb2 = true
					if (index == 2) {
						this.isconnecttext = true
					}
				}

			},
			getheadImg() {
				return getstorage('headImg')
			},
			OnOnquestion2(item) {
				let date = new Date();
				let hours = date.getHours()
				let minutes = date.getMinutes()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				this.question = item.questionDescribe
				this.message.push({
					type: 3,
					msg: item.questionDescribe,
					time: hours + ':' + minutes,
					name: '【智能客服】',
					defaultAnswer: item.defaultAnswer,
				})
				this.scrollToBottom()
			},
			Onquestion(item) {
				let date = new Date();
				let hours = date.getHours()
				let minutes = date.getMinutes()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				this.isautomaticreply = false
				this.question = item.questionDescribe
				this.message.push({
					type: 1,
					msg: item.questionDescribe,
					time: hours + ':' + minutes,
					name: '我'
				})
				this.message.push({
					type: 2,
					msg: item.questionDescribe,
					time: hours + ':' + minutes,
					name: '【智能客服】',
					defaultAnswer: item.defaultAnswer,
					questions: item.questions
				})
			},
			sendinfo() {
				let customerServiceId = this.serviceId ? this.serviceId : ''
				let msg = this.msg
				let question = this.question ? this.question : this.msg
				let questionId = this.questionId ? this.questionId : ''
				let serviceNo = this.serviceNo
				let userId = getstorage('userId')
				let obj = {}
				if (customerServiceId) {
					obj.customerServiceId = customerServiceId
				}
				if (questionId) {
					obj.questionId = questionId
				}
				obj.question = question
				obj.msg = msg
				obj.serviceNo = serviceNo
				obj.type = 1
				obj.userId = userId
				let date = new Date();
				let hours = date.getHours()
				let minutes = date.getMinutes()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				this.$request.post("/coc-asback/api/v1/complaint_feedback/send", obj).then(res => {
					if (res.code == 200) {
						this.loading = false
						this.message.push({
							type: 1,
							msg: this.msg,
							time: hours + ':' + minutes,
							name: '我'
						})
						this.$refs.countDown.reset();
						this.$refs.countDown.start();
						this.msg = ''
						this.scrollToBottom()
					}
				})

			},
			scrollToBottom() {
			    this.$nextTick(function() {
			        setTimeout(() => {
			            uni.pageScrollTo({
			              scrollTop: 99999,
			              duration: 0
			            })
			          }, 200) // 要加点延迟, 不然有可能不生效
				})
				},
			Oncustomerservice() {
				let _this = this
				let date = new Date();
				let hours = date.getHours()
				let minutes = date.getMinutes()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				if (!this.isconnect) {
					this.loading = true
					let userId = getstorage('userId')
					uni.connectSocket({
						url: 'ws://172.16.91.106:28088/websocket/' + userId + '/1',
						data() {
							return {
								x: '',
								y: ''
							};
						},
						header: {
							'content-type': 'application/json'
						},
						method: 'GET',
						success: () => {
							_this.isconnect = true
							_this.isautomaticreply = false
							_this.message.push({
								type: 3,
								time: hours + ':' + minutes,
								name: '【智能客服】',
								defaultAnswer: '正在为您转接人工客服，请稍等。',
								isfalse: 1

							})
							this.isconnecttext3 = false
							_this.$refs.countDown.reset();
							_this.$refs.countDown.start();
							uni.onSocketMessage(function(res) {
								let obj = JSON.parse(res.data)
								if (obj.code == 2001) { //连接得
									_this.serviceNo = obj.serviceNo
									_this.loading = false
									_this.scrollToBottom()
								} else if (obj.code == 2005) { //应答得
									_this.serviceId = obj.serviceId
									_this.serviceName = obj.serviceName
									_this.message.push({
										type: 3,
										time: hours + ':' + minutes,
										name: '【客服' + _this.serviceName + '】',
										defaultAnswer: '当前为人工客服【' + _this.serviceName +
											'】为您服务，请问有什么可以帮助您？',
										avatar: '1',
										isfalse: 1
									})
									_this.$refs.countDown.reset();
									_this.$refs.countDown.start();
									_this.scrollToBottom()
								} else if (obj.code == 2002) {
									_this.message.push({
										type: 2,
										time: hours + ':' + minutes,
										name: '【客服' + _this.serviceName + '】',
										defaultAnswer: obj.message,
										avatar: '1',
										isback: 1,
										isfalse: 1
									})
									_this.$refs.countDown.reset();
									_this.$refs.countDown.start();
									_this.scrollToBottom()
								} //收到消息得

							});
						},
					})
				}
			},
			Onsendout() {
				let _this = this
				let date = new Date();
				let hours = date.getHours()
				let minutes = date.getMinutes()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				if (!this.isconnect) {
					this.loading = true
					let userId = getstorage('userId')
					uni.connectSocket({
						url: 'ws://172.16.91.106:28088/websocket/' + userId + '/1',
						data() {
							return {
								x: '',
								y: ''
							};
						},
						header: {
							'content-type': 'application/json'
						},
						method: 'GET',
						success: () => {
							_this.isconnect = true
							_this.isautomaticreply = false
							uni.onSocketMessage(function(res) {
								let obj = JSON.parse(res.data)
								if (obj.code == 2001) { //连接得
									_this.serviceNo = obj.serviceNo
									uni.$u.sleep(300).then(() => {
										if (_this.serviceNo) {
											_this.sendinfo()
										}
									})
									_this.scrollToBottom()
								} else if (obj.code == 2005) { //应答得
									_this.serviceId = obj.serviceId
									_this.serviceName = obj.serviceName
									_this.message.push({
										type: 3,
										time: hours + ':' + minutes,
										name: '【客服' + _this.serviceName + '】',
										defaultAnswer: '当前为人工客服【' + _this.serviceName +
											'】为您服务，请问有什么可以帮助您？',
										avatar: '1',
										isfalse: 1,

									})
									_this.$refs.countDown.reset();
									_this.$refs.countDown.start()
									_this.scrollToBottom()
								} else if (obj.code == 2002) {
									_this.message.push({
										type: 2,
										time: hours + ':' + minutes,
										name: '【客服' + _this.serviceName + '】',
										defaultAnswer: obj.message,
										avatar: '1',
										isback: 1,
										isfalse: 1
									})
									_this.$refs.countDown.reset();
									_this.$refs.countDown.start();
									_this.scrollToBottom()
								} //收到消息得

							});


						}
					})
				} else {
					_this.sendinfo()
				}

			},
			getList() {
				this.$request.get("/coc-social/api/v1/customer/problem").then(res => {
					this.dataList = res.data

				})
			},
			Onproblemtype(index) {
				this.current = index
			}
		}
	}
</script>

<style lang="scss">
	.card {
		margin: 40rpx;
		background-color: #ffffff;
		border-radius: 14rpx;
		display: flex;


		.card-left {
			display: flex;

			.problemtype {
				font-size: 32rpx;
				margin-left: 20rpx;
				margin-bottom: 20rpx;
				z-index: 999,
			}

			.current {
				color: #d91b1b;
				border-right: #d91b1b 7rpx solid;
				width: 180rpx;
			}

			.hr {
				background-color: #999999;
				width: 1rpx;
				margin-left: -5rpx;
				z-index: 998;
			}
		}

		.card-right {
			font-size: 28rpx;
			color: #666666;
			margin-top: -10rpx;
			margin-left: 40rpx;
			width: 406rpx;

			.problem {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				margin-bottom: 20rpx;

			}
		}
	}

	.me-class {
		display: flex;
		justify-content: flex-end;
	}

	.bottom-chat {
		width: 100%;
		height: 10%;
		background-color: #ffffff;
		bottom: 0rpx;
		position: fixed;

		.u-input {
			display: flex;
			justify-content: center;
			padding-top: 30rpx;

			.input {
				background-color: #f8f8f8;
				width: 527rpx;
			}

			.btn-send {
				padding: 0rpx 20rpx;
				font-size: 28rpx;
				color: #ffffff;
				line-height: 74rpx;
				margin-left: 10rpx;
				display: flex;
				background-color: #d91b1b;
				border-radius: 12rpx;
			}
		}
	}

	.message-me {
		// float: right;
		margin-top: 40rpx;
		margin-right: 40rpx;
		display: flex;

		.title {
			font-size: 24rpx;
			color: #999999;
			text-align: right;
		}

		.question {
			background-color: #ffffff;
			border-radius: 10rpx 0rpx 10;
			font-size: 28rpx;
			padding: 10rpx 20rpx;
			margin-top: 10rpx;
			margin-left: 40rpx;
		}

	}

	.message-zn {
		margin-top: 40rpx;
		margin-left: 40rpx;
		display: flex;
		// float: left;

		.title {
			font-size: 24rpx;
			color: #999999;
			text-align: left;
			margin-left: 20rpx;
		}

		.defaultAnswer {
			background-color: #ffffff;
			border-radius: 10rpx 0rpx 10;
			font-size: 28rpx;
			padding: 10rpx 20rpx;
			margin-top: 10rpx;
			margin-left: 20rpx;
			margin-right: 40rpx
		}

		.about {
			width: 485rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			padding: 10rpx 0rpx;
			margin-top: 20rpx;
			padding-bottom: 40rpx;

			.about-question {
				color: #3098e0;
				font-size: 28rpx;
				margin-left: 10rpx;
				text-decoration: underline;
				margin-top: 10rpx;
			}
		}

		.feedback {
			display: flex;
			justify-content: space-around;

			.thumb {
				width: 140rpx;
				height: 50rpx;
				background-color: #f8f8f8;
				border-radius: 10rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;
			}

			.choosethumb {
				background-color: #d91b1b;
				color: #ffffff;
			}
		}
	}

	.pop {
		width: 640rpx;
		background-color: #f8f8f8;
		text-align: left;
		padding: 20rpx;
		font-size: 28rpx;

		.btn {
			text-align: center;
			margin-top: 40rpx;

			text {
				width: 500rpx;
				height: 60rpx;
				background-color: #d91b1b;
				display: inline-block;
				line-height: 60rpx;
				color: #ffffff;
				border-radius: 16rpx;
			}
		}
	}

	.endservice {
		position: fixed;
		right: 40rpx;
		height: 20rpx;

		text {
			background-color: #d91b1b;
			border-radius: 10rpx;
			color: #ffffff;
			display: inline-block;
			width: 200rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
		}
	}
</style>
