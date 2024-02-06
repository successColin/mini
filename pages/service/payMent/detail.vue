<template>
	<view class="page">
		<view class="card u-flex" style="align-items: center;">
			<view style="font-size: 28rpx;font-weight: bold;width: 120rpx;">
				联系方式
			</view>
			<view style="margin-left: 30rpx;">
				<u--input type="number" :customStyle="{color:'#999999',height:'34rpx'}" placeholder="请输入准确的联系方式"
					border="none" v-model="mobile"></u--input>
			</view>

		</view>
		<view v-if="activityPaymentPreferenceId==4" class="card u-flex" style="align-items: center;">
			<view style="font-size: 28rpx;font-weight: bold;width: 120rpx;">
				车牌号
			</view>
			<view @click='OpenCarkeyboard' style="margin-left: 30rpx;">
				<u--input disabledColor='#ffffff' :disabled='true' :customStyle="{color:'#999999',height:'34rpx'}"
					placeholder="请输入车牌号" border="none" v-model="plate"></u--input>
			</view>
		</view>
		<view class="card u-flex" style="align-items: center;">
			<view style="font-size: 28rpx;font-weight: bold;width: 120rpx;">
				备注
			</view>
			<view style="margin-left: 30rpx;">
				<u--input :customStyle="{color:'#999999',height:'34rpx'}" placeholder="请输入备注信息" border="none"
					v-model="remark"></u--input>
			</view>
		</view>

		<view class="card" style="margin-top: 20rpx;">
			<view style="display: flex;justify-content: space-between;width: 100%;">
				<view style="font-size: 24rpx;">
					<text style="font-size: 28rpx;font-weight: bold;">报名信息</text>
					<text style="margin-left: 10rpx;">您需选择<text
							style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">{{adultNum}}</text>位成人<text
							style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">{{childrenNum}}
						</text>位儿童
					</text>
				</view>
				<view class="u-flex" @click="OnAddUser">
					<view style="font-size: 24rpx;color: #D91B1B;margin-right: 10rpx;margin-top: 4rpx;">添加</view>
					<view>
						<image src="../static/image/tianjia.png" style="width: 24rpx;height: 24rpx;"></image>
					</view>
				</view>
			</view>
			<view v-if="userList.length==0" class="u-flex" style="margin-top: 20rpx;">
				<view style="margin-top: -4rpx;">
					<image style="width: 22rpx;height: 28rpx;" src="../static/image/zanwu.png"></image>
				</view>
				<view style="font-size: 24rpx;color: #999999;margin-left: 20rpx;">
					您还没有常用人员信息，请先添加
				</view>
			</view>
			<view v-else>
				<view class="u-flex" style="margin-left: -30rpx;flex-wrap: wrap;margin-bottom: 50rpx;">
					<view v-for="(item,index) in userList" :key="index" class="user-list"
						:class="{'current-obj':registrationList.indexOf(item)!=-1}" @click="OnChooseUsre(item,index)">
						<view>{{item.name}}
							<view v-if="registrationList.indexOf(item)!=-1"
								style="position: absolute;bottom: -15rpx;left: 84rpx;">
								<image src="../static/image/xiaogougou.png" style="width: 14rpx;height: 14rpx;"></image>
							</view>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in registrationList" :key="index">
					<u-divider v-if="index!=0" :text="null"></u-divider>
					<view style="display: flex;justify-content: space-between;margin-top: 40rpx;">
						<view
							style="color: #999999;font-size: 28rpx;text-align: right;margin-right: 20rpx;align-self: center;">
							<text v-if="item.type==1" style="display: inline-block;width: 80rpx;">成人</text>
							<text v-else style="display: inline-block;width: 80rpx;">儿童</text>
						</view>
						<view style="margin-left: -60rpx;">
							<view
								style="font-size: 28rpx; font-weight: bold;width: 380rpx;	text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								{{item.name}}
							</view>
							<view v-if="item.mobile" style="font-size: 24rpx;margin-top: 6rpx;">手机号<text
									style="margin-left: 20rpx;">{{item.mobile}}</text></view>
							<view style="font-size: 24rpx;margin-top: 6rpx;">身份证<text
									style="margin-left: 20rpx;">{{item.idCard}}</text></view>
						</view>
						<view>
							<view class="u-flex" style="margin-top: 20rpx;margin-right: 10rpx;">
								<view @click="Onedit(item.id)" style="margin-right: 20rpx;">
									<u-icon size="28px" color="#a8a8a8" name="edit-pen"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 保险 -->
		<view style="margin-top: 20rpx;" v-if="insuranceList.length>0">
			<view class="insurance-title">
				<image src="../static/image/baoxianxinxi.png" style="width: 35rpx;height: 38rpx;">
				</image>
				<view style="margin-left: 20rpx;font-weight: bold;color: #D91B1B;font-size: 32rpx;">
					保险信息
				</view>
			</view>
			<view class="insurance-card" style="padding: 20rpx;border-radius: 0rpx 0rpx 10rpx 10rpx;">
				<view v-for="(item,index) in insuranceList" :key="index" style="margin-top: 20rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view
							style="font-size: 28rpx;font-weight: bold;width: 380rpx;display: flex;align-items: center;">
							<view>
								{{item.insuranceName}}
							</view>
							<view style="margin-left: 16rpx;">
								<u-icon size="14" name="arrow-right" :bold='true' color="#222222"></u-icon>
							</view>
						</view>
						<view class="u-flex">
							<view style="margin-right: 10rpx;">
								<text style="font-size: 24rpx;color: #DC2E2E;">¥</text>
								<text
									style="font-size: 32rpx;color: #DC2E2E;font-weight: bold;">{{item.insurancePriceStr}}</text>
								<text style="font-size: 24rpx">/人x{{choosepeople}}份x{{day}}天</text>
							</view>
							<view style="margin-top: 8rpx;" @click="OnChoose(item,index)">
								<image v-if="item.istrue" src="../static/image/xuanzhong.png"
									style="width: 30rpx;height: 30rpx;"></image>
								<image v-else src="../static/image/weixuanzhong.png"
									style="width: 30rpx;height: 30rpx;"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="u-flex" style="margin-top: 10rpx;align-items: center;" @click="Onopenpop()">
					<view>
						<image mode="widthFix" src="../static/image/zhuyi.png" style="width: 28rpx;"></image>
					</view>
					<view style="font-size: 24rpx;color: #666666;margin-left:10rpx;">保险条款</view>
				</view>

				<view style="margin-top: 20rpx;">
					<view v-for="(item,index) in registrationList" :key="index"
						style="background-color: #f8f8f8;margin-top: 10rpx;padding-bottom: 20rpx;padding-top: 20rpx;">
						<view style="display: flex;justify-content: space-between;">
							<view
								style="color: #999999;font-size: 28rpx;text-align: right;margin-right: 20rpx;align-self: center;">
								<text style="display: inline-block;width: 120rpx;">被保人</text>
							</view>
							<view>
								<view
									style="font-size: 28rpx; font-weight: bold;width: 460rpx;	text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
									{{item.name}}<text style="font-size: 24rpx;font-weight: normal;">（被保人需与报名人一致）</text>
								</view>
								<view style="font-size: 24rpx;margin-top: 6rpx;">身份证<text
										style="margin-left: 20rpx;">{{item.idCard}}</text></view>
							</view>
							<view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 140rpx;">

		</view>
		<!-- 底部悬浮框 -->
		<view v-if="!showcarkeyboard" @click="OnOpenDetail"
			style="z-index: 10076;border-top: 1rpx #e7e7e7 solid;position: fixed;bottom: 0rpx;background-color: #ffffff;padding: 20rpx;margin-left: -25rpx;width: 100%;padding: 30rpx 20rpx 50rpx 20rpx;">
			<view class="u-flex" style="justify-content: space-between;">
				<view>
					<text style="font-size: 24rpx;">
						合计：
					</text>
					<text style="font-size: 24rpx;color: #D91B1B;font-weight: bold;">
						¥
					</text>
					<text style="font-size: 44;color: #D91B1B;font-weight: bold;">
						{{totalprice.toFixed(2)}}
					</text>
				</view>
				<view class="u-flex" style="margin-right: 70rpx;">
					<view class="u-flex" style="margin-right: 20rpx;">
						<view style="font-size: 24rpx;margin-right: 6rpx;">明细</view>
						<view>
							<u-icon name="arrow-up" :bold='true' color="#222222"></u-icon>
						</view>
					</view>
					<view class="btn">
						<text @click.stop="OnPay">去支付</text>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-popup :safeAreaInsetBottom='false' :show="showclause" @close="showclause=false" mode="bottom"
			:customStyle="{position:'relative',bottom:'130rpx'}">
			<view class="pop">
				<view class="pop-title">
					<view>
						<image src="../static/image/baoxianxinxi.png" style="width: 35rpx;height: 38rpx;"></image>
					</view>
					<view style="font-size: 34rpx;color: #D91B1B;font-weight: bold;margin-left: 20rpx;">
						保险条款信息
					</view>
				</view>
				<view style="margin: 40rpx 55rpx;font-size: 24rpx;">
					<text>
						本页面由大昌保险代理有限公司管理并运营，请您仔细阅读投保须知、保险条款、免责说明、被保险人同意声明以及个人信息保护政策、客户告知书等其他内容。为确保您的投保权益，您的投保信息轨迹将被记录。
					</text>
				</view>
				<view class="tiaokuan">
					<view>
						<u-checkbox-group v-model="checkboxValue1" activeColor="#D91B1B">
							<u-checkbox :customStyle="{marginBottom: '8px'}">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<view>我已阅读<text style="color: #D91B1B;" v-for="(item,index) in insurance" :key="index"
							@click="OnOpenPdf(item)">《{{item.name}}》</text>条款</view>
				</view>
				<view class="pop-btn">
					<text @click="Onknow">我已知晓</text>
				</view>
			</view>
			<u-toast ref="uToast"></u-toast>
		</u-popup>
		<u-popup overlayOpacity='0.001' :safeAreaInsetBottom="false"
			:customStyle="{position:'relative',bottom:'130rpx'}" :show="showdetail" @close="showdetail=false"
			mode="bottom">
			<view class="pop-detail">
				<view class="detail-title">
					<view>费用明细</view>
					<view @click="Onclosedetail" style="position: relative;left: 240rpx;">
						<u-icon name="close-circle" size="24"></u-icon>
					</view>
				</view>
				<view style="font-size: 28rpx;margin-top: 20rpx;">
					{{title}}
				</view>
				<view class="u-flex"
					style="justify-content: space-between;font-size: 24rpx;color: #666666;margin-top: 20rpx;">
					<view>
						{{MealName}}
					</view>
					<view>
						¥{{flashSalePrice}}x{{setMealNum}}
					</view>
				</view>
				<view style="font-size: 28rpx;margin-top: 40rpx;">
					保险
				</view>
				<view v-for="(item,index) in insuranceList" :key="index">
					<view v-if="item.istrue" class="u-flex"
						style="justify-content: space-between;font-size: 24rpx;color: #666666;margin-top: 20rpx;">
						<view style="width: 450rpx;">
							{{item.insuranceName}}
						</view>
						<view>
							¥{{item.insurancePriceStr}}x{{choosepeople}}x{{day}}天
						</view>
					</view>
				</view>
				<view class="u-flex"
					style="justify-content: space-between;font-size: 24rpx;color: #666666;margin-top: 20rpx;">
					<view>官方减免</view>
					<view style="color: #D91B1B;">-¥{{officialrelief}}</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>

		<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>

		<u-modal @confirm='Ontrue' @cancel='OnAddUser' confirmColor='#D91B1B' cancelText='去添加' confirmText='去支付'
			:show="showmodal" :showCancelButton='true' content='当前报名人数少于套餐人数'>
		</u-modal>
		<view>
			<u-keyboard @backspace='Onbackspace' @cancel='showcarkeyboard=false' @confirm='showcarkeyboard=false'
				@change='changekeyboard' ref="uKeyboard" mode="car" :show="showcarkeyboard"></u-keyboard>
		</view>
		<u-popup :mask-close-able='false' :safeAreaInsetBottom='false' :show="showagreement" mode="center" round="10">
			<view class="pop-agreement">
				<view class="pop-title">
					免责声明
				</view>
				<view style="margin-top: 40rpx;margin-bottom: 40rpx;">
					<scroll-view scroll-y="true" style="height: 700rpx;text-align: left;font-size: 24rpx;">
						<text>

							特别提示：
							您在参加活动前，请确保您的身体状况适合参加此活动。因参加此活动而引起的一切风险、损害及责任等，需由您自行承担。请您仔细阅读本服务条款。您点击同意本条款，即表示您同意接受本条款的约束，本条款即构成对您与51车俱乐部双方具有约束力的法律文件。
							一、服务条款的确认、接受及变更
							1. 您点击同意本条款前，需确认自己根据《中华人民共和国民法典》相关规定，具有合法的主体资格：
							（1）年满18周岁，精神健康、智力健全，具有完全民事行为能力，可以独立进行民事活动，独立承担法律责任；或
							（2）16周岁以上不满18周岁的公民，以自己的劳动收入为主要生活来源的，精神健康、智力健全的，可以独立进行民事活动，独立承担法律责任；或
							（3）未满16周岁，精神健康、智力健全的限制民事行为能力人，必须在父母或监护人的全程监护陪同下参与，其父母和监护人能够承担相应的法律责任。
							2. 您同意本条款并完成报名程序后，即成为本活动的参与者。您即确认本条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。您即同意并确认：
							（1）您是在了解风险的情况下参加活动的。
							（2）您承担与自己参与活动相关的所有风险，包括但不限于迷路、跌坠、山洪、泥石流、落石、雷电、涉水、中暑失温及冻伤、中毒、疾病、动物袭击、山火、捕兽器具伤害、天气异常、第三人带来的伤害、交通意外…外力所致和自身原因所导致的其他风险等等。出发前，您已经了解、掌握了面临可能发生的危险时应该采取的减轻和避免伤害的措施。
							（3）参加活动往返交通途中和活动中如果发生意外事故，组织者有义务组织救援，但对于事故造成的身体损害，乃至不可逆转的永久性身体损伤、后遗症等，以及事件伴随的经济损失，组织者不承担任何法律和经济责任。
							3.
							根据国家法律法规的更新及平台运营需要，51车俱乐部有权对本条款不时地进行修改，以为您提供更好的服务体验。修改后的服务条款一经您的同意，即发生效力，并替代原条款。我们建议您在参与本活动之前阅读本条款及其他相关公告。如果本条款中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
							4. 您一旦报名，即视为参加者（包括代他人报名者，被代报名参加者）已经充分了解并自愿接受本免责条款，本免责条款自动生效。否则，请终止报名参加，已报名的参加者请在活动开始前退出本次活动。
							二、平台防诈骗提醒
							1.幸福生活双手造，馅饼不会天上掉。
							2.个人资料要保密，不明来电（短信）多警惕，多方确认防上当。
							3.个人信息很重要，账号密码保管好。
							4.网络诈骗不难防，不贪不给不上当。不乱加群，不点不明来源的链接，防范网络诈骗和病毒侵害。
							5.购买金额较大物品年轻人要多与父母交流，老年人要多咨询子女意见。
							6.发现诱导、忽悠、捆绑销售等手段，诓骗您或他人以高价购买假冒商品，及时向平台官方客服400-801-0111进行举报。
							7.诈骗手法日益新，你我务必要小心。
							★ 51车俱乐部已尽到防诈骗宣传告知提醒，请您提高自我防范意识。
							三、合法使用
							1.您在参加本活动过程中不得直接或间接地违反国家法律法规及社会公序良俗。51车俱乐部保留对您参加本活动过程中的行为进行监督的权利。若51车俱乐部发现您在参与活动中违反国家法律法规或社会公序良俗，51车俱乐部有权取消您参加本次活动的权利。若涉及违法行为，51车俱乐部将保留举报和追究的权利。
							2.在参与本活动过程中，您不得有任何违反国家法律法规或社会公序良俗的行为，因存在上述行为而给51车俱乐部造成损失，您将承担法律责任并赔偿51车俱乐部遭受的一切损失。
							3.在活动参与过程中，因第三方的原因导致您承担任何责任或遭受任何损失的，由您与第三方自行解决，与51车俱乐部无关。
							本人已经仔细阅读、完全理解和认同本声明。
						</text>
					</scroll-view>
				</view>

				<view class="pop-bottom" @click="Onqianshu">
					我已阅读并同意签署
					<view v-if="!isfinish" style="display: inline-block;">
						<u-count-down @finish='Onfinish' :autoStart="false" ref="countDown" :time="5*1000" format="ss"
							@change="onChange">
							<view class="time__custom">
								（<text class="time__custom__item">{{ timeData.seconds }}</text>秒）
							</view>
						</u-count-down>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {},
		data() {
			return {
				timeData: {},
				isfinish: false,
				showcarkeyboard: false,
				plate: '',
				showloading: false,
				isInsuranceVOS: [],
				totalprice: 0,
				allpeople: '',
				checkboxValue1: [],
				showdetail: false,
				showclause: false,
				setMealNum: '', //套餐数量
				chooseadult: 0,
				choosechildren: 0,
				mobile: '',
				remark: '',
				adultNum: '',
				childrenNum: '',
				userList: [],
				registrationList: [],
				activityId: '',
				insuranceList: [],
				insurance: [],
				title: '',
				MealName: '',
				flashSalePrice: '',
				day: '',
				officialrelief: 0,
				setMealId: '',
				attendId: '',
				registrationInformations: [],
				Events: '',
				choosepeople: '0',
				SelectedInsuranceNum: 0,
				showmodal: false,
				appletsShareType: 0,
				isfirst: false,
				activityPaymentPreferenceId: '',
				showagreement: false,
				forwardUserId:''
			}
		},

		onLoad(option) {
			let _this = this
			uni.$on('refresh', res => {
				_this.registrationList = [];
				_this.chooseadult = 0;
				_this.choosechildren = 0;

				let pages = getCurrentPages();
				let prevPage = {}
				pages.filter(s => {
					if (s.$page.fullPath == '/pages/home/activityDetail/index?id=' + _this.activityId) {
						prevPage = s;
						prevPage.$vm.Onaginsingup()
					}
				})
			})
			if (getstorage(option.activityId)) {
				this.appletsShareType = getstorage(option.activityId).split('_')[0]
			}
			if (option.activityPaymentPreferenceId) {
				this.activityPaymentPreferenceId = option.activityPaymentPreferenceId
			}
			this.forwardUserId=option.forwardUserId
			this.Events = option.Events
			this.attendId = option.attendId
			this.setMealId = option.setMealId
			this.mobile = getstorage('mobile')
			this.adultNum = option.personnum
			this.childrenNum = option.childnum
			this.setMealNum = option.setMealNum
			this.activityId = option.activityId
			this.title = option.title
			this.MealName = option.MealName
			this.flashSalePrice = option.flashSalePrice
			this.totalprice = option.flashSalePrice * option.setMealNum
			this.day = option.day
			this.allpeople = Number(option.personnum) + Number(option.childnum)
			this.getActivityInsurance(option.activityId)

			this.showagreement = true
			setTimeout(() => {
				this.$refs.countDown.start();
			}, 500)



		},
		onShow() {
			this.getuser()


		},
		computed: {},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			Onqianshu() {
				if (!this.isfinish) {
					return false
				} else {
					this.showagreement = false
					this.agree = true
				}
			},
			Onfinish() {
				this.isfinish = true
			},
			Onbackspace() {
				if (this.plate.length == 0) {
					return false
				}
				this.plate = this.plate.substr(0, this.plate.length - 1);
			},
			changekeyboard(value) {
				if (this.plate.length == 8) {
					return false
				}
				this.plate = this.plate + value
			},
			OpenCarkeyboard() {
				this.showcarkeyboard = true
			},
			OnOpenPdf(url) {
				console.log(url)
				uni.navigateTo({
					url: '/pages/activity/GoPdf/webview?url=' + url.url
				})
			},
			paytrue(){
				if (this.totalprice === 0) {
					this.registrationInformations = []
					this.registrationList.filter(res => {
						this.registrationInformations.push({
							participantsType: res.type,
							userName: res.name,
							idCard: res.idCard,
							participantsMobile: res.mobile,
						})
					})
					this.showloading = true
				
					if (this.isfirst) {
						return false
					}
				
					this.$request.post("/coc-active/api/v1/sign_up/signUp", {
						forwardUserId:this.forwardUserId,
						plate: this.plate,
						activityId: this.activityId,
						mobile: this.mobile,
						setMealId: this.setMealId,
						setMealNum: this.setMealNum,
						attendId: this.attendId,
						registrationInformations: this.registrationInformations,
						isInsuranceVOS: this.isInsuranceVOS,
						appletsShareType: this.appletsShareType,
						remark: this.remark
					}).then(res => {
						if (res.code == 200) {
							this.showmodal = false
							uni.navigateTo({
								url: '/pages/my/myorder/couponcode?id=' + res.data.orderNo
							})
							this.showloading = false
				
						} else {
							this.showmodal = false
							this.isfirst = true
							this.showloading = false,
								this.$refs.uToast.show({
									message: res.message,
								});
						}
					})
				} else {
					let num = 0
					this.insuranceList.filter(res => {
						if (res.istrue) {
							num++
						}
					})
				
					if (this.checkboxValue1.length == 0 && num > 0) {
						this.insurance = []
						this.insuranceList.filter((res, index) => {
							if (res.istrue) {
								this.insurance.push({
									name: res.insuranceName,
									url: res.sericeClause
								})
							}
						})
						this.showmodal = false
						this.showclause = true
						return false
					} else {
						this.registrationInformations = []
						this.registrationList.filter(res => {
							this.registrationInformations.push({
								participantsType: res.type,
								userName: res.name,
								idCard: res.idCard,
								participantsMobile: res.mobile
							})
						})
						this.isInsuranceVOS = []
						this.insuranceList.filter(res => {
							if (res.istrue) {
								this.isInsuranceVOS.push(res)
							}
						})
						if (this.isfirst) {
							return false
						}
						this.isfirst = true
						
						this.$request.post("/coc-active/api/v1/sign_up/signUp", {
							forwardUserId:this.forwardUserId,
							plate: this.plate,
							activityId: this.activityId,
							mobile: this.mobile,
							setMealId: this.setMealId,
							setMealNum: this.setMealNum,
							attendId: this.attendId,
							registrationInformations: this.registrationInformations,
							isInsuranceVOS: this.isInsuranceVOS,
							appletsShareType: this.appletsShareType,
							remark: this.remark
						}).then(res => {
							if (res.code == 200) {
								let list = []
								this.showmodal = false
								this.insuranceList.filter(res => {
									if (res.istrue) {
										list.push(res)
									}
								})
								uni.navigateTo({
									url: '/pages/service/payMent/index?MealName=' + this.MealName +
										'&setMealNum=' + this.setMealNum + '&flashSalePrice=' + this
										.flashSalePrice + '&Events=' + this.Events + '&allpeople=' + this
										.allpeople + '&day=' + this.day + '&officialrelief=' + this
										.officialrelief + '&totalprice=' + this.totalprice +
										'&activityId=' +
										this.activityId + '&setMealId=' + this.setMealId + '&orderNo=' +
										res.data.orderNo +
										'&choosepeople=' + this.choosepeople + '&signUpId=' + res.data
										.signUpId + '&isScoreDeduction=' + res.data.isScoreDeduction +
										'&scoreDeduction=' + res.data.scoreDeduction + '&surplusScore=' +
										res.data.surplusScore,
									success: function(s) {
										// 通过eventChannel向被打开页面传送数据
										s.eventChannel.emit('payinfo', {
											data: {
												list: list,
												couponVOS: res.data.couponVOS
											}
										})
									}
								})
							} else {
								this.showmodal = false
								this.isfirst = true
								this.$refs.uToast.show({
									message: res.message,
								});
							}
						})
					}
				}
			},
			Ontrue() {
				console.log('转跳支付',this.forwardUserId)
				this.showdetail = false
				this.$request.post("/coc-active/api/v1/payment/preference/userIsCanBuyProduct",{
								activityPaymentPreferenceId:this.activityPaymentPreferenceId,
								goodsId:this.activityId,
								plate:this.plate,
								type:1						
							}).then(res=>{
								if(res.code==200){
									if(res.data.isCanBuy==1){
										this.paytrue()
									}else if (res.data.isCanBuy==0){
										let type=''
										if(this.activityPaymentPreferenceId==4){
											type='人保'
										}else if (this.activityPaymentPreferenceId==5){
											type='农行'
										}
										else if (this.activityPaymentPreferenceId==6){
											type='工行'
										}
										else if (this.activityPaymentPreferenceId==7){
											type='邮储'
										}
										else if (this.activityPaymentPreferenceId==8){
											type='民生'
										}else if (this.activityPaymentPreferenceId==10){
											type='官方'
										}
										uni.$u.toast('当月每人'+type+'活动仅限参与'+res.data.userOrderLimitCount+'次，您已参加过')
										return false
									}
								}else{
									uni.$u.toast(res.message)
									return false
								}
							})		
				
			},
			OnPay() {
						console.log('转跳支付',this.forwardUserId)
				this.showdetail = false
				let adultNum = 0
				let childrenNum = 0
				this.registrationList.filter(res => {
					if (res.type == 1) {
						adultNum++
					} else {
						childrenNum++
					}
				})
				if (adultNum == 0 && childrenNum == 0) {
					this.$refs.uToast.show({
						message: '请选择报名人'
					});
					return false
				}
				if (adultNum != this.adultNum || childrenNum != this.childrenNum) {
					this.showmodal = true
					return false
				}
				this.$request.post("/coc-active/api/v1/payment/preference/userIsCanBuyProduct",{
								activityPaymentPreferenceId:this.activityPaymentPreferenceId,
								goodsId:this.activityId,
								plate:this.plate,
								type:1						
							}).then(res=>{
								if(res.code==200){
									if(res.data.isCanBuy==1){
										this.paynext()
									}else if (res.data.isCanBuy==0){
										let type=''
										if(this.activityPaymentPreferenceId==4){
											type='人保'
										}else if (this.activityPaymentPreferenceId==5){
											type='农行'
										}
										else if (this.activityPaymentPreferenceId==6){
											type='工行'
										}
										else if (this.activityPaymentPreferenceId==7){
											type='邮储'
										}
										else if (this.activityPaymentPreferenceId==8){
											type='民生'
										}else if (this.activityPaymentPreferenceId==10){
											type='官方'
										}
										uni.$u.toast('当月每人'+type+'活动仅限参与'+res.data.userOrderLimitCount+'次，您已参加过')
										return false
									}
								}else{
									uni.$u.toast(res.message)
									return false
								}
							})			
			},
			paynext(){
				if (this.totalprice === 0) {
					this.registrationInformations = []
					this.registrationList.filter(res => {
						this.registrationInformations.push({
							participantsType: res.type,
							userName: res.name,
							idCard: res.idCard,
							participantsMobile: res.mobile
						})
					})
					this.isInsuranceVOS = []
					this.insuranceList.filter(res => {
						if (res.istrue) {
							this.isInsuranceVOS.push(res)
						}
					})
					this.showloading = true
					if (this.isfirst) {
						return false
					}
					this.isfirst = true
							
					this.$request.post("/coc-active/api/v1/sign_up/signUp", {
						forwardUserId:this.forwardUserId,
						plate: this.plate,
						activityId: this.activityId,
						mobile: this.mobile,
						setMealId: this.setMealId,
						setMealNum: this.setMealNum,
						attendId: this.attendId,
						registrationInformations: this.registrationInformations,
						isInsuranceVOS: this.isInsuranceVOS,
						appletsShareType: this.appletsShareType,
						remark: this.remark
					}).then(res => {
						if (res.code == 200) {
							this.showmodal = false
							uni.navigateTo({
								url: '/pages/my/myorder/couponcode?id=' + res.data.orderNo
							})
							this.showloading = false
				
						} else {
							this.showmodal = false
							this.isfirst = true
							this.showloading = false,
								this.$refs.uToast.show({
									message: res.message,
								});
						}
					})
				} else {
					let num = 0
					this.insuranceList.filter(res => {
						if (res.istrue) {
							num++
						}
					})
					if (this.checkboxValue1.length == 0 && num > 0) {
						this.insurance = []
						this.insuranceList.filter((res, index) => {
							if (res.istrue) {
								this.insurance.push({
									name: res.insuranceName,
									url: res.sericeClause
								})
							}
						})
						this.showclause = true
						return false
					} else {
						this.registrationInformations = []
						this.registrationList.filter(res => {
							this.registrationInformations.push({
								participantsType: res.type,
								userName: res.name,
								idCard: res.idCard,
								participantsMobile: res.mobile
							})
						})
						this.isInsuranceVOS = []
						this.insuranceList.filter(res => {
							if (res.istrue) {
								this.isInsuranceVOS.push(res)
							}
						})
						if (this.isfirst) {
							return false
						}
						this.isfirst = true
					
						this.$request.post("/coc-active/api/v1/sign_up/signUp", {
							forwardUserId:this.forwardUserId,
							plate: this.plate,
							activityId: this.activityId,
							mobile: this.mobile,
							setMealId: this.setMealId,
							setMealNum: this.setMealNum,
							attendId: this.attendId,
							registrationInformations: this.registrationInformations,
							isInsuranceVOS: this.isInsuranceVOS,
							appletsShareType: this.appletsShareType,
							remark: this.remark
						}).then(res => {
							if (res.code == 200) {
								let list = []
								this.showmodal = false
								this.insuranceList.filter(res => {
									if (res.istrue) {
										list.push(res)
									}
								})
								uni.navigateTo({
									url: '/pages/service/payMent/index?MealName=' + this.MealName +
										'&setMealNum=' + this.setMealNum + '&flashSalePrice=' + this
										.flashSalePrice + '&Events=' + this.Events + '&allpeople=' + this
										.allpeople + '&day=' + this.day + '&officialrelief=' + this
										.officialrelief + '&totalprice=' + this.totalprice +
										'&activityId=' +
										this.activityId + '&setMealId=' + this.setMealId + '&orderNo=' +
										res.data.orderNo +
										'&choosepeople=' + this.choosepeople + '&signUpId=' + res.data
										.signUpId + '&isScoreDeduction=' + res.data.isScoreDeduction +
										'&scoreDeduction=' + res.data.scoreDeduction + '&surplusScore=' +
										res.data.surplusScore,
									success: function(s) {
										// 通过eventChannel向被打开页面传送数据
										s.eventChannel.emit('payinfo', {
											data: {
												list: list,
												couponVOS: res.data.couponVOS
											}
										})
									}
								})
							} else {
								this.showmodal = false
								this.isfirst = false
								this.$refs.uToast.show({
									message: res.message,
								});
							}
						})
					}
				}
			},
			Onknow() {
				if (this.checkboxValue1.length == 0) {
					this.$refs.uToast.show({
						message: '请确认阅读条款',
					});
					return false
				}
				this.showclause = false
			},
			getActivityInsurance(id) {
				let price = 0
				this.SelectedInsuranceNum = 0
				this.$request.get("/coc-active/api/v1/activity/getActivityInsurance/" + id).then(res => {
					res.data.filter(s => {
						// Official relief
						if (s.isUndertaker == 1) {
							this.SelectedInsuranceNum++
							s.istrue = true
							price = 0
							price = s.insurancePrice * this.day * this.choosepeople
							this.officialrelief = this.officialrelief + price
						} else {
							s.istrue = false
						}
					})
					this.insuranceList = res.data
				})
			},
			Onclosedetail() {
				this.showdetail = false
			},
			OnOpenDetail() {
				this.showdetail = !this.showdetail
			},
			Onopenpop(item) {
				this.insurance = []
				this.insuranceList.filter((res, index) => {
					if (res.istrue) {
						this.insurance.push({
							name: res.insuranceName,
							sericeClause: res.sericeClause
						})
					}
				})
				this.showclause = true
			},
			Onedit(id) {
				uni.navigateTo({
					url: '/pages/my/contacts/detail?id=' + id
				})
			},
			OnChooseUsre(item, index) {
				let ispush = true
				if (this.registrationList.length > 0) {
					this.registrationList.filter((res, i) => {
						if (res.id == item.id) {
							if (res.type == 1) {
								this.insuranceList.filter(res => {
									if (res.istrue && res.isUndertaker == 2) {
										this.totalprice = this.totalprice - res.insurancePrice * Number(
											this.day)
									}
								})
								if (this.chooseadult > 0) {
									this.chooseadult--
								}

							}
							if (res.type == 2) {
								this.insuranceList.filter(res => {
									if (res.istrue && res.isUndertaker == 2) {
										this.totalprice = this.totalprice - res.insurancePrice * Number(
											this.day)
									}
								})
								if (this.choosechildren > 0) {
									this.choosechildren--
								}
							}
							this.registrationList.splice(i, 1)
							this.choosepeople = this.registrationList.length
							ispush = false
						}
					})
				}

				uni.$u.sleep(30).then(() => {
					if (ispush) {
						if (item.type == 1) {
							if (this.adultNum > this.chooseadult) {
								this.insuranceList.filter(res => {
									if (res.istrue && res.isUndertaker == 2) {
										this.totalprice = this.totalprice + res.insurancePrice * Number(
											this.day)
									}
								})

								this.chooseadult += 1;
							} else {
								this.$refs.uToast.show({
									message: '最多选择' + this.adultNum + '个成人',
								})
								return false
							}
						}
						if (item.type == 2) {
							if (this.childrenNum > this.choosechildren) {
								this.insuranceList.filter(res => {
									if (res.istrue && res.isUndertaker == 2) {
										this.totalprice = this.totalprice + res.insurancePrice * Number(
											this.day)
									}
								})
								this.choosechildren += 1;

							} else {
								this.$refs.uToast.show({
									message: '最多选择' + this.childrenNum + '个儿童',
								})
								return false
							}
						}
						this.registrationList.push(item)
						this.choosepeople = this.registrationList.length
					}
					this.officialrelief = 0

					let price = 0
					this.insuranceList.filter(s => {

						if (s.isUndertaker == 1) {

							price = 0
							price = s.insurancePrice * this.day * this.choosepeople
							this.officialrelief = this.officialrelief + price
						}
					})
				})
			},
			OnChoose(item, index) {
				if (item.isUndertaker == 1) {
					return false
				} else {
					if (item.istrue) {
						let price = 0
						price = item.insurancePrice * Number(this.day) * this.choosepeople
						this.totalprice = this.totalprice - price
						this.insuranceList[index].istrue = !this.insuranceList[index].istrue
						return false
					}
					this.insuranceList[index].istrue = !this.insuranceList[index].istrue
					this.insuranceList.filter(res => {
						if (res.isUndertaker == 2 && res.istrue) {
							this.totalprice = res.insurancePrice * this.day * this.choosepeople + this.totalprice
						}
					})
					this.SelectedInsuranceNum = 0
					this.insuranceList.filter(res => {
						if (res.istrue) {
							this.SelectedInsuranceNum++
						}
					})
				}
			},
			OnAddUser() {
				uni.navigateTo({
					url: '/pages/my/contacts/index'
				})
				this.showmodal = false

			},
			getuser() {
				this.$request.post("/coc-my/api/v1/userContacts/list", {
					keyword: '',
					current: 1,
					size: 99
				}).then(res => {

					if (this.userList.length != res.data.records.length) {
						this.chooseadult = 0,
							this.choosechildren = 0,
							this.userList = res.data.records
					}

				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 25rpx;
	}

	.tiaokuan {
		display: flex;
		font-size: 24rpx;
		justify-content: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-left: 54rpx;
		margin-right: 54rpx;
	}

	.pop-detail {
		background-color: #f8f8f8;
		padding: 60rpx 50rpx 200rpx 60rpx;

		.detail-title {
			display: flex;
			justify-content: center;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.pop {
		background-color: #ffffff;

		.pop-title {
			background: linear-gradient(180deg, #fdf9f3, #fff6ed);
			border-radius: 10rpx 10rpx 0rpx 0rpx;
			height: 36rpx;
			display: flex;
			padding: 24rpx 30rpx;
			line-height: 36rpx;
			justify-content: center;
			font-size: 28rpx;
		}

		.pop-btn {
			text-align: center;
			margin-bottom: 80rpx;

			text {
				border-radius: 10rpx;
				display: inline-block;
				width: 200rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				color: #ffffff;
				background-color: #D91B1B;
			}
		}
	}

	.insurance-card {
		background-color: #ffffff;
	}

	.insurance-title {
		background: linear-gradient(180deg, #fdf9f3, #fff6ed);
		border-radius: 10rpx 10rpx 0rpx 0rpx;
		height: 36rpx;
		display: flex;
		padding: 24rpx 30rpx;
		line-height: 36rpx;
	}

	.user-list {
		position: relative;
		width: 100rpx;
		height: 46rpx;
		background-color: #F8F8F8;
		opacity: 0.96;
		border-radius: 5rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 46rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 37rpx 28rpx;
	}

	.current-obj {
		border: 1rpx solid #D91B1B;
		border-radius: 5rpx;
		background: #FDF3F3;
		opacity: 0.96;
		color: #D91B1B;
		width: 96rpx;
		height: 42rpx;
	}

	.btn {
		margin-top: -14rpx;

		text {
			width: 180rpx;
			height: 60rpx;
			background-color: #D91B1B;
			border-radius: 10rpx;
			display: inline-block;
			text-align: center;
			color: #ffffff;
			line-height: 60rpx;
			font-size: 28rpx;

		}
	}

	.pop-agreement {
		width: 650rpx;
		margin: 40rpx 28rpx 40rpx 28rpx;

		.pop-title {
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
		}

		.pop-bottom {
			text-align: center;
			width: 350rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background-color: #C71D1D;
			font-size: 24rpx;
			line-height: 60rpx;
			color: #ffffff;
			margin: 20rpx auto;
		}
	}
</style>
