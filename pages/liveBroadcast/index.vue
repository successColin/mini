<!--
 * @Descripttion: 直播
 * @Author: ytx
 * @Date: 2023-10-27 08:20:47
 * @Last Modified by: ytx
 * @Last Modified time: 2023-10-27 08:20:47
-->
<template>
  <channel-live
    :finder-user-name="finderUserName"
    :feedId="feedId"
    @click="handleClick"
  ></channel-live>
</template>

<script>
import { finderUserName } from '@/config/index';

export default {
  props: {},
  onLoad(option) {
    this.feedId = option.feedId;
    this.finderUserName = finderUserName;
  },
  data() {
    return {
      finderUserName: '',
      feedId: '',
    };
  },
  methods: {
    handleClick() {
      wx.openChannelsLive({
        finderUserName: this.finderUserName,
        feedId: this.feedId,
      });
    },
    handleFun() {
      // 查看直播内容
      wx.getChannelsLiveInfo({
        finderUserName: this.finderUserName,
        success: (res) => {
          if (res.feedId) {
            uni.navigateTo({
              // 跳直播页面
              url: `/pages/liveBroadcast/index?feedId=${res.feedId}`,
            });
          }
        },
        complete: (res) => {
          console.log('错误信息', res);
          // 直播内容没有情况，显示直播预告信息
          if (res.err_code === '1416104') {
            wx.getChannelsLiveNoticeInfo({
              finderUserName: this.finderUserName,
              success: (res) => {
                console.log(11111, res);
                // 预约
                wx.reserveChannelsLive({
                  noticeId: res.noticeId,
                });
              },
              complete: (res) => {
                console.log('错误信息', res); // 现在还不清楚没有预约的错误码
                // 没有预约情况，打开视频号主页
                if (res.err_code === '1416104') {
                  wx.openChannelsUserProfile({
                    finderUserName: this.finderUserName,
                  });
                }
              },
            });
          }
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
