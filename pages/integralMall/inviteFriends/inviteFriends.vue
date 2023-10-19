<template>
	<view class="page ">
    <view class="bodybg">
      <view class="close">
        <u-icon name="close" size="16" @click="closedPage" ></u-icon>
      </view>
      <view class="title">
        <iamge src="https://oss.dcqcjlb.com/51che_java_dev/20221220/file_1671538313000.jpg" mode="widthFix"></iamge>
        <view class="fatherBox">
          <view class="creatBtn" >生成海报</view>
        </view>
        <view class="inteNum">
          <image src="https://oss.dcqcjlb.com/51che_java_dev/20221220/file_1671538402068.jpg" class="inteBg"></image>
          <view class="nums">
            <!-- <text class="numSize">500</text> -->
         <!--   <view class="inteTxt">
              <text>积</text>
              <text>分</text>
            </view> -->
          </view>

            
        </view>
      <!--  <view class="textExplain">邀请新用户完成实名认证获得500积分，一天最多获得5000积分(即10个人)</view> -->
        <view class="yellowBtn">去邀请</view>

      </view>
      <view class="myInvite">
        <image src="https://oss.dcqcjlb.com/51che_java_dev/20230320/file_1679296100277.png" class="listBgTOp" mode="widthFix"></image>
        <view class="friends">
          <view class="flex friendItem">
            <view class="flex frl">
              <image src="https://oss.dcqcjlb.com/51che_java_dev/20221220/file_1671538402068.jpg" class="fHead"  mode="widthFix"></image>
              <text>朋友的昵称</text>
            </view>
            <view class="frR">18895236541</view>
          </view>
          <view class="flex friendItem">
            <view class="flex frl">
              <image src="https://oss.dcqcjlb.com/51che_java_dev/20221220/file_1671538402068.jpg" class="fHead"  mode="widthFix"></image>
              <text>朋友的昵称</text>
            </view>
            <view class="frR">18895236541</view>
          </view>
          <view class="flex friendItem">
            <view class="flex frl">
              <image src="https://oss.dcqcjlb.com/51che_java_dev/20221220/file_1671538402068.jpg" class="fHead"  mode="widthFix"></image>
              <text>朋友的昵称</text>
            </view>
            <view class="frR">18895236541</view>
          </view>
          <view class="continue">继续邀请</view>
        </view>

      </view>
      
    </view>
  </view>
</template>

<script>
	export default {
    data() {
			return {
     
			}
		},
		onLoad() {
    },
		onShow() {},
		methods: {
      closedPage() {
       console.log('关闭')
      }
		} 

	}
</script>
<style lang="scss" scoped>
  .bodybg {
    background-color: rgba(249, 203, 169, 1);
    padding-bottom: 100rpx;
  }
  .close {
    margin: 20rpx 0 0 20rpx;
    display: inline-block;
  }
  .inteNum{
    position: relative;

    .inteBg  {
      width: 640rpx;
      height: 750rpx;
      margin: 0 auto;
      display: block;
      margin-top: 20rpx;
    }
    .numSize{
      font-size: 180rpx;
      font-weight: bold;
      color: #E8412B;
    }
    .nums {
      position: absolute;
      top: 140rpx;
      justify-content: center;
      align-items: center;
      width: 410rpx;
      display: flex;
      left: 160rpx;
    }
    .inteTxt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 75rpx;
      font-weight: bold;
      color: #E8412B;
    }
  }
  .fatherBox{
    overflow: hidden;
    .creatBtn{
      font-size: 28rpx;
      color: #EAA578;
      display: flex;
      flex-direction: row-reverse;
      width: 164rpx;
      height: 72rpx;
      justify-content: center;
      line-height: 72rpx;
      background: rgba(255,247,218,0.62);
      border-radius: 128rpx 0px 0px 128rpx;
      float: right;
    }
  }
  .textExplain {
    position: absolute;
    top: 680rpx;
    text-align: center;
    width: 644rpx;
    display: flex;
    justify-content: center;
    left: 60rpx;
    font-size: 30rpx;
    color: #E7C247;
  }
  .yellowBtn {
    position: absolute;
    top: 740rpx;
    width: 250rpx;
    height: 80rpx;
    background: #FCE499;
    border-radius: 80rpx;
    left: 246rpx;
    text-align: center;
    line-height: 80rpx;
    color: #E8412B;
  }
  .myInvite{
    margin-top: 50rpx;
    .listBgTOp{
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .friends{
      width: 700rpx;
      background-color: #fff;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 40rpx;
      border-radius: 0px 0px 32rpx 32rpx;
  
      .friendItem{
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        margin-bottom:40rpx;
        .frl{
          align-items: center;
          .fHead {
            width: 85rpx;
            width: 85rpx;
            border-radius: 50%;
            margin-right: 15rpx;
          }
        }

      }

      .continue{
        width: 400rpx;
        height: 76rpx;
        background: linear-gradient(180deg, #FFF8E1 0%, #FADC79 100%);
        border-radius: 170rpx 170rpx 170rpx 170rpx;
        text-align: center;
        line-height: 76rpx;
        margin: 0 auto;
        color: #E8412B;
      }
    }
  }
</style>
