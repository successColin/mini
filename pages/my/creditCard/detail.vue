<template>
	<view class=" bgf8 page" :class="{'pagegh':showType==1||showType==3}">
		<view v-if="showType===1">
      <!-- 农行 -->
      <view class="title tac fwb size32">农行生肖信用卡</view>
      <view>
        <image class="detailCard" src="https://oss.dcqcjlb.com/51che_java_dev/20230227/file_1677482934558.png"></image>
      </view>
      <view class='mt30'>
        <view class="paragraphH fwb ">一、新客一元购</view>
        <view class="lh30">2023年1月1日-2023年3月31日，浙江( 除宁波 )农行信用卡新客可享受1元购买价值100元礼券1份，限前20000名，先到先得。</view>
      </view>
      <view class='mt30'>
        <view class="paragraphH fwb ">二.绑卡有礼</view>
        <view class="lh30">2023年1月1日-2023年3月31日，首次微信绑定信用卡支付的浙江农行信用卡持卡人( 宁波、杭州除外，不含商务卡 )，即可享受网点微信扫码<text class="mainRed">1分购</text></view>
      </view>
      <view class='mt30'>
        <view class="paragraphH fwb ">三.新客一元大礼包</view>
        <view class="lh30">2023年1月1日-2023年3月31日，成功核发中国农业银行信用卡的新客户在2023年4月30日前激活卡片并收到活动达标短信通知后，即可以1元领取50元返现红包礼券，领券成功后次日单笔线上消费满50元( 含 ) 返现50元。领券截止时间2023年4月30日，活动期间每位客户限领1次，消费返现截止时间2023年5月31日。</view>
      </view>
      <view class='mt30'>
        <view class="paragraphH fwb ">四.加油优惠</view>
        <view class="lh30">2023年1月1日一3月31日期间，金华地区(义乌除外)农行信用卡持卡人至金华中石化指定活动站点，在支付宝APP线上小程序“加油浙江上，选择油卡充值，支付宝立即充值，农行信用卡支付，即可享受满200元立减20元优惠。活动期内，同一用户限参与一次，活动名额每日限290个，先到先得!</view>
      </view>
    </view>
	<view v-else-if="showType===3" style="padding: 0rpx;">
		<!-- 邮储 -->
		<view>
				  <image style="width: 750rpx;height:1323rpx ;" src="https://oss.dcqcjlb.com/51che_java_dev/20231010/file_1696904608951.jpg"></image>
		</view>
		</view>
    <view v-else style="padding: 0rpx;">
    
	  
	  <view>
		  <image style="width: 750rpx;height:1080rpx ;" src="https://oss.dcqcjlb.com/51che_java_dev/20230614/file_1686722281689.jpg"></image>
	  </view>
    </view>
    <view class="applyCard">
      <button @click="Onsave"
	  :send-message-title='messagetitle'
	   send-message-img='https://oss.dcqcjlb.com/51che_java_dev/20230309/file_1678343590247.jpg'
		:session-from='sessionfrom' 
		:show-message-card='true' 
		 open-type='contact'
		   class="applyBtn">去办卡</button>
    </view>
	</view>
</template>

<script>
	import {
		tologin
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				showType: 1,
				sessionfrom:'',
				messagetitle:'',
				affiliationId:'',
				affiliationType:'',
				sourceType:0
			}
		},
		onLoad(option) {
			this.affiliationId=option.affiliationId
			this.affiliationType=option.affiliationType
			this.sourceType=option.sourceType
      if(option.type == 'n'){
        this.showType = 1
		this.sessionfrom='nh'
		this.messagetitle='农行生肖信用卡'
        uni.setNavigationBarTitle({
          title: '农行信用卡'
        });
      } else if(option.type == 'y'){
        this.showType = 3
		this.sessionfrom='yc'
		this.messagetitle='邮储车主主题信用卡'
        uni.setNavigationBarTitle({
          title: '邮储信用卡信用卡'
        });
      }else {
        this.showType = 2
		this.sessionfrom='gh'
		this.messagetitle='工行爱车E卡'
        uni.setNavigationBarTitle({
          title: '工行信用卡'
        });
      }
    },
		onShow() {},
		methods: {
		Onsave(){
		if (tologin() !== true) {
			return false
		}
			let type=1
			if(this.showType==1){
				type=1
			}else if(this.showType==3){
				type=3
			}else{
				type=2
			}
			let obj={}
			obj.type=type
			obj.sourceType=this.sourceType
			if(this.affiliationId){
				obj.affiliationId=this.affiliationId
			}
			if(this.affiliationType){
				obj.affiliationType=this.affiliationType
			}
			this.$request.post("/coc-active/api/v1/four_s/clues/credit/card/add",obj).then(res=>{
				
			})
		},
		}
	}
</script>

<style lang="scss">
.page {
 
  margin-bottom: 50rpx;
  background-color: #000;
  height: 2000rpx;
}
.pagegh{
	padding: 0rpx 25rpx 200rpx;
	margin-bottom: 50rpx;
	background-color: #fff;
	height: 100%;
}
.title{
  margin: 0rpx 0rpx 40rpx 0;
}
.detailCard{
  width: 300rpx;
  height: 200rpx;
  display: block;
    margin: 0 auto;
}
.mt30 {
  margin-top: 30rpx;
}
.lh30 {
  line-height: 40rpx;
  font-size: 24rpx;
}
.applyCard{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 25rpx 0;
  background-color: #fff;

  .applyBtn {
    width: 50%;
    background-color: #D91B1B;
    color: #fff;
    font-weight: bold;
    border-radius: 35rpx;
    text-align: center;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    margin:  0 auto;
  }

}
</style>
