<template>
	<view class="page">
		<!-- 没有爱车时 -->
		<view class="card" v-if="!mycarobj.id">
			<view class="size28 fwb">
				保养车辆
			</view>
			<view class="u-flex alc mt20 ">
				<image style="width: 36rpx;height: 36rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20231010/file_1696930530924.png"></image>
				<view class="mainRed size24 ml10" @click="OnpushMycar">
					新增我的爱车
				</view>
			</view>
		</view>
		<!-- 有爱车或者选择了爱车时 -->
		<view class="card" v-else-if="mycarobj.id">
			<view class="u-flex jsb alc">
				<view class="size28 fwb">
					保养车辆
				</view>
				<view class="changecar" @click="OnpushMycar">
					更换车辆
				</view>
			</view>
			<view class="choosecar">
				<view>
					<image style="width: 100rpx;height: 100rpx;" :src="mycarobj.imgUrl"></image>
				</view>
				<view style="margin-left: 26rpx;">
					<view class="fwb size28">{{ mycarobj.vehicleName }}</view>
					<view class="mt10 size20 txtLighGray">{{ mycarobj.plate }}</view>
				</view>
			</view>
		</view>
		<!-- 选择到店日期 -->
		<view class="card">
			<view class="size28 fwb">
				选择到店日期
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb" @click="OnchangearrivalDate">
				<view class="size24 txtLighGray">
					{{ formData.arrivalDate ? formData.arrivalDate : '请选择您的到店日期' }}
				</view>
				<view>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
		</view>
		<!-- 选择到店时间 -->
		<view class="card">
			<view class="size28 fwb">
				选择到店时间
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb" @click="OnchangearrivalTime">
				<view class="size24 txtLighGray">
					{{ formData.arrivalTime ? formData.arrivalTime : '请选择您的到店时间' }}
				</view>
				<view>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
		</view>
		<!-- 有保养套餐的情况 -->
		<view class="card" v-if="orderlist.length > 0">
			<view class="u-flex jsb">
				<view class="size28 fwb">是否使用保养套餐</view>
				<view>
					<u-radio-group v-model="isupkeepmeal" placement="row" inputAlign='right' @change="upleepchange">
						<u-radio labelSize='12' labelColor='#222222' :customStyle="{ marginRight: '10rpx' }"
							v-for="(item, index) in upkeepmeallist" :key="index" :label="item.name" :name="item.name"
							activeColor="#D91B1B">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view v-if="formData.isupkeepmeal == 1">
				<view v-for="(item, index) in orderlist" :key="item.orderId" class="u-flex alc choosecar"
					@click="Onchoosemeal(item.orderId)">
					<view>
						<image v-if="getincludes(item)" style="width: 24rpx;height: 24rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1696994250158.png"></image>
						<image v-else style="width: 24rpx;height: 24rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1696994457910.png"></image>
					</view>
					<view class="ml20">
						<image style="width: 80rpx;height: 80rpx;border-radius: 10rpx;" :src="item.coverImage"></image>
					</view>
					<view class="ml10">
						<view class="size24 oneLine" style="width: 490rpx;">{{ item.maintainName }}</view>
						<view class="mainRed size24 mt10">￥{{ item.price }}</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 选购保养套餐 -->
		<view class="card" v-else-if="orderlist.length == 0 && meallist.length">
			<view class="size28 fwb">选购保养套餐</view>
			<scroll-view scroll-x="true" class="mt20">
				<view class="u-flex">
					<view v-for="item in meallist" :key="item.id" class="mr20" @click="OnPushDetail(item)">
						<view>
							<image style="width:206rpx;height: 206rpx;border-radius: 10rpx;" :src="item.cover_image">
							</image>
						</view>
						<view class="size20 mt10 oneLine" style="width: 206rpx;">
							{{ item.maintain_name }}
						</view>
						<view class="u-flex mt10 alc">
							<u-icon name="rmb" bold='true' color="#D91B1B" size="10"></u-icon>
							<view class="mainRed fwb size24">{{ item.bankCardPrice ? item.bankCardPrice : item.price }}
							</view>
							<view class="txtLighGray txtls" style="font-size: 16rpx;margin-left: 4rpx;margin-top: 2rpx;">
								原价{{ item.market_price }}元</view>
						</view>
						<view class="flex alc jsb mt10">
							<view class="txtLighGray" style="font-size: 16rpx;">{{ shopdetail.storeAbbreviation }}
							</view>
							<view class="goShop">购买</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 		<view class="card">
			<view class="u-flex jsb">
				<view class="size28 fwb">上门取送车服务</view>
				<view>
					<u-radio-group v-model="deliveryCarService" placement="row" inputAlign='right'
						@change="groupChange">
						<u-radio labelSize='12' labelColor='#222222' :customStyle="{ marginRight: '10rpx' }"
							v-for="(item, index) in radiolist" :key="index" :label="item.name" :name="item.name"
							activeColor="#D91B1B">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="u-flex jsb">
				<view class="size28 fwb">替换车服务</view>
				<view>
					<u-radio-group v-model="replaceCarService" placement="row" inputAlign='right' @change="carChange">
						<u-radio labelSize='12' labelColor='#222222' :customStyle="{ marginRight: '10rpx' }"
							v-for="(item, index) in radiolist" :key="index" :label="item.name" :name="item.name"
							activeColor="#D91B1B">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</view> -->
		<!-- 未绑定客户经理 -->
		<view class="card flex jsb alc bgfff br10 mb20" @click="checkSale" v-if="!mySale.customerManagerId">
			<view class="contacts-item-label">选择您的专属客户经理</view>
			<u-icon name="arrow-right" size="14"></u-icon>
		</view>
		<!-- 已绑定客户经理 -->
		<view class="card flex jsb alc bgfff br10 " v-else>
			<view class="flex alc">
				<image :src="mySale.url" class="salePic"></image>
				<view class="fwb">{{ mySale.nickname }}</view>
				<view class="contacts-item-label" style="margin-left:40rpx;font-weight: normal;">您的专属客户经理</view>
			</view>
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20231010/file_1696923217553.png" class="saletel"
				@click="OnTell()"></image>
		</view>
		<view class="card-e8">
			提交预约后，会有客户经理与您确认到店时间和保养相关事宜， 请留意接听电话。
		</view>
		<view style="height: 120rpx;">
		</view>
		<!-- 底部提交框 -->
		<view class="btn-add">
			<view class="order-btn" @click="togo()">立即预约</view>
		</view>
		<!-- 到店日期弹窗 -->
		<u-datetime-picker :show="showarrivalDate" mode="date" :minDate='todaydate' @confirm='OnarrivalDate'
			@cancel='showarrivalDate = false'></u-datetime-picker>
		<!-- 到店时间弹窗 -->
		<u-picker :show="showarrivalTime" :columns="columns" @confirm='OnarrivalTime'
			@cancel='showarrivalTime = false'></u-picker>
	</view>
</template>

<script>
import {
	gettoken,
	tologin,
	setstorage,
	getstorage
} from '@/utils/index.js'
export default {
	data() {
		return {
			columns: [],
			mycarobj: null,
			mySale: {},
			formData: {
				deliveryCarService: 0,
				replaceCarService: 0,
				managerId: '',
				arrivalDate: '',
				arrivalTime: '',
				iskeep: 0,
				isupkeepmeal: 1, // 是否使用保养套餐
				mealid: [], //选中的套餐的id
			},
			radiolist: [{
				name: '需要',
				value: 1
			},
			{
				name: '不需要',
				value: 0
			},
			],
			upkeepmeallist: [{
				name: '是',
				value: 1
			},
			{
				name: '否',
				value: 0
			},
			],
			deliveryCarService: '不需要',
			replaceCarService: '不需要',
			isupkeepmeal: '是',
			managerId: '', //客户经理ID，
			shopId: '',
			codeurl: '',
			brandId: '',
			showarrivalDate: false, //到店日期弹窗
			todaydate: '', // 今天日期
			showarrivalTime: false,
			orderlist: [],
			meallist: [],
			shopdetail: {},//4S店详情
			isrepeat: true
		}
	},
	onLoad(option) {
		let _this = this
		if (option.brandId) {
			this.brandId = option.brandId
		}
		this.shopId = option.shopId
		uni.$on('refresh', res => {
			_this.mycarobj = res
		})
		this.getshopdetail()
		let today = new Date()
		let tomorrow = new Date(today)
		tomorrow.setDate(today.getDate() + 1)
		this.formData.arrivalDate = tomorrow.getFullYear() + '-' + Number(tomorrow.getMonth() + 1) +
			'-' + tomorrow.getDate()
		this.todaydate = today.getTime()

	},
	onShow() {
		this.getorderList()
		this.getDetail()
	},
	methods: {
		getincludes(e) {
			return this.formData.mealid.includes(e.orderId)
		},
		getcar() {

			this.$request.post("/coc-my/api/v1/my/user/car/lists/v2", {
				brandId: Number(this.brandId)
			}).then(res => {
				this.mycarobj = res.data[0]
			})
		},
		togo() {
			if (!this.formData.arrivalTime) {
				uni.$u.toast('请选择您的到店时间')
				return false
			}
			// if(!this.mySale.customerManagerId){
			// 		uni.$u.toast('请选择您的专属客户经理')
			// 		return false
			// }
			if (!this.mycarobj) {
				uni.$u.toast('请选择您的爱车')
				return false
			}
			if (!this.isrepeat) {
				return false
			}
			this.isrepeat = false
			let maintainMealOrderId = ''
			if (this.formData.mealid) {
				maintainMealOrderId = this.formData.mealid.join(',')
			}
			this.$request.post("/coc-active/api/v1/maintenance_appointment/save", {
				arrivalDate: this.formData.arrivalDate,
				arrivalTime: this.formData.arrivalTime,
				brandId: this.brandId,
				plate: this.mycarobj.plate,
				vehicleName: this.mycarobj.vehicleName,
				customerManagerId: this.mySale.customerManagerId,
				shopId: this.shopId,
				pickUpService: this.formData.iskeep,
				replacementCarService: this.formData.replaceCarService,
				maintainMealOrderId: maintainMealOrderId
			}).then(res => {
				if (res.code == 200) {
					uni.redirectTo({
						url: '/pages/upkeep/reservationend?shopId=' + this.shopId + '&status=1'
					})
				} else {
					uni.$u.toast(res.message)
				}
			})

		},
		OnPushDetail(item) {
			uni.navigateTo({
				url: '/pages/carShops/upkeep/detail?id=' + item.id + '&isform=1'
			})
		},
		getshopdetail() {
			this.$request.get('/coc-active/api/v1/four_s/shopDetails/' + this.shopId).then(res => {
				this.brandId = res.data.brandId
				this.shopdetail = res.data
				this.getcar()
			})
		},
		Onchoosemeal(id) {
			if (this.formData.mealid.includes(id)) {
				this.formData.mealid = this.formData.mealid.filter(element => element !== id)
			} else {
				this.formData.mealid.push(id)
			}

		},
		getmeallist() {
			this.$request.post('/coc-active/api/v1/four_s/maintain_meal/list', {
				shopId: this.shopId
			}).then(res => {
				this.meallist = res.data.maintainMealListVOS
			})
		},
		getorderList() {
			this.$request.post("/coc-active/api/v2/maintain_meal/orderList", {
				shopId: this.shopId,
				current: 1,
				size: 99,
				status: 1,
				isSelect: 0
			}).then(res => {

				if (res.data.total == 0) {
					this.getmeallist()
				} else {
					this.orderlist = res.data.records
					// this.formData.mealid=res.data.records[0].orderId
				}
			})
		},
		getTodayFormatted() {
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1; // 注意：JavaScript 中月份从 0 开始，所以需要加 1  
			var day = today.getDate();

			// 将月份和日期格式化为两位数字，如果是一位数字的话  
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;

			return year + '-' + month + '-' + day;
		},
		customFormat(now) {
			let date = ("0" + now.getHours()).slice(-2) + ':00'
			return date
		},
		OnchangearrivalTime() {
			let todaydate = this.getTodayFormatted()
			if (todaydate == this.formData.arrivalDate) {
				this.columns = []
				let today = new Date()
				for (let hour = today.getHours() + 1; hour <= 16; hour++) {
					// 获取开始时间  
					let start = new Date();
					start.setHours(hour);
					start.setMinutes(0);
					start.setSeconds(0);
					start.setMilliseconds(0);

					// 获取结束时间  
					let end = new Date();
					end.setHours(hour + 1);
					end.setMinutes(0);
					end.setSeconds(0);
					end.setMilliseconds(0);
					start = this.customFormat(start)
					end = this.customFormat(end)
					this.columns.push(start + ' - ' + end)
					// this.columns.push(start.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', hour12: false }) + ' - ' + end.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', hour12: false }))
					console.log('获取今天时间', this.columns)
				}

				this.columns = [this.columns]
			} else {
				this.columns = [
					[
						'08:00-09:00',
						'09:00-10:00',
						'10:00-11:00',
						'11:00-12:00',
						'12:00-13:00',
						'13:00-14:00',
						'14:00-15:00',
						'15:00-16:00',
						'16:00-17:00',
					]
				]
			}
			this.showarrivalTime = true
		},
		OnarrivalTime(val) {
			this.formData.arrivalTime = val.value[0]
			this.showarrivalTime = false
		},
		OnarrivalDate(val) {
			this.formData.arrivalTime = ''
			let time = val.value
			var date = new Date(time);
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() +
				1) :
				date
					.getMonth() + 1;
			var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date
				.getDate();
			var hh = date.getHours() < 10 ? "0" + date.getHours() : date
				.getHours();
			var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date
				.getMinutes();

			this.formData.arrivalDate = date.getFullYear() + "-" +
				month +
				"-" +
				currentDate
			this.showarrivalDate = false
		},
		OnchangearrivalDate() {
			this.showarrivalDate = true
		},
		OnpushMycar() {
			uni.navigateTo({
				url: '/pages/my/mycar/index?isupkeep=1' + "&brandId=" + this.brandId
			})
		},
		getDetail() {

			let obj = {
				shopId: this.shopId
			}
			this.$request.post("/coc-active/api/v2/maintain_meal/shop/customerManager/list", obj).then(res => {
				if (res.data.length == 1) {
					this.mySale = res.data[0]
					this.formData.managerId = res.data[0].customerManagerId
				} else {
					this.mySale = {}
				}


			})
		},
		// 选择客户经理
		checkSale() {
			uni.navigateTo({
				url: "/pages/carShops/upkeep/checkSales?shopId=" + this.shopId
			});
		},
		upleepchange(e) {
			if (e == '是') {
				this.formData.isupkeepmeal = 1
			} else {
				this.formData.isupkeepmeal = 0
				this.formData.mealid = []
			}
		},
		groupChange(e) {
			if (e == '需要') {
				this.formData.iskeep = 1
			} else {
				this.formData.iskeep = 0
			}
		},
		carChange(e) {
			if (e == '需要') {
				this.formData.replaceCarService = 1
			} else {
				this.formData.replaceCarService = 0
			}
		},
		OnTell() {
			if (this.mySale.phone) {
				uni.makePhoneCall({
					phoneNumber: this.mySale.phone
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '暂无联系方式'
				})
			}
		},



	}
}
</script>

<style lang="scss" scoped>
.page {
	padding-bottom: 150rpx;
}

.contacts-item-label {
	color: #222;
	font-weight: bold;
	font-size: 28rpx;
}

.salePic {
	width: 84rpx;
	height: 84rpx;
	border-radius: 50%;
	margin-right: 26rpx;
}

.saletel {
	width: 34rpx;
	height: 34rpx;
}

.card {
	border-radius: 16rpx;
	padding: 24rpx;
	background: #FFFFFF;
	margin: 24rpx;
}

.card-e8 {
	border-radius: 16rpx;
	padding: 12rpx 116rpx 12rpx 26rpx;
	background: #e8e8e8;
	color: #999999;
	margin: 24rpx;
	font-size: 20rpx;
}

.changecar {
	width: 128rpx;
	height: 48rpx;
	line-height: 48rpx;
	color: #d91b1b;
	text-align: center;
	font-size: 24rpx;
	border-radius: 136rpx;
	border: 1rpx solid #d91b1b;
}

.choosecar {
	border: 2rpx solid #F8F8F8;
	padding: 10rpx;
	border-radius: 10rpx;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
}

.goShop {
	width: 48rpx;
	height: 22rpx;
	line-height: 22rpx;
	background: #D91B1B;
	border-radius: 100rpx;
	text-align: center;
	color: #FFFFFF;
	font-size: 16rpx;
}

.btn-add {
	position: fixed;
	bottom: 0rpx;
	background-color: #ffffff;
	height: 120rpx;
	width: 100%;

}

.order-btn {
	width: 400rpx;
	height: 72rpx;
	line-height: 72rpx;
	background: #D91B1B;
	border-radius: 100rpx;
	font-size: 28rpx;
	color: #ffffff;
	margin: 20rpx auto;
	text-align: center;
}
</style>