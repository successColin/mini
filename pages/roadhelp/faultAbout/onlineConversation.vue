<!--
  * @Descripttion: 在线对话
  * @Author: ytx
  * @Date: 2023-11-17 09:06:41
  * @Last Modified by: ytx
  * @Last Modified time: 2023-11-17 09:06:41
 -->
 <!-- 发送消息状态
 sending: 发送中
 sent: 发送成功
 receipt: 发送成功且对方发送了已读回执
 deleted: 已删除
 sendFailed: 发送失败
 接收消息状态
 unread: 收到对方发送的消息，消息未读
 read: 收到对方发送的消息，消息已读
 deleted: 已删除 -->
 <template>
  <div class="onlineConversation">
    <!-- 空白页 -->
    <!-- <div
      class="onlineConversation__blankPage"
      v-if="keyboardHeight !== 0"
      :style="{ height: `calc(${keyboardHeight}px + 240rpx)` }"
    ></div> -->
    <div
      class="onlineConversation__cooperation"
      @click="handleJumpCooperation"
      v-if="showType == 1"
    >
      <image
        style="width: 32rpx; height: 32rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20240204/file_1707033698720.png"
      ></image>
      <span style="margin-left: 10rpx">发起合作意向</span>
    </div>
    <scroll-view
      class="onlineConversation__content"
      scroll-y
      :scroll-into-view="bottomId"
      @scrolltolower="scrolltolower"
    >
      <div @click.stop="closeKeyBoard">
        <!-- 我的内容 -->
        <div
          v-for="(item, i) in historyArr"
          :key="i"
          :id="'item_' + i"
          class="onlineConversation__forChat"
        >
          <!-- 时间 -->
          <div class="onlineConversation__time" v-if="item.sendTime">
            {{ item.sendTime }}
          </div>
          <div class="onlineConversation__content--dec">
            <div class="onlineConversation__chat__left">
              <u-avatar
                v-if="item.flow === 'in'"
                :src="nickImg(item) || defaultImg"
                size="34"
              ></u-avatar>
            </div>
            <div
              class="onlineConversation__chat__center"
              :class="[
                item.flow === 'in' ? 'onlineConversation__otherPeople' : '',
              ]"
            >
              <div
                :class="
                  item.type === 'image' || item.type === 'geo'
                    ? 'onlineConversation__noBgn'
                    : ''
                "
              >
                <view v-if="item.type === 'text'">
                  <!-- <rich-text
                    :nodes="item.body"
                    @longpress="handleLongpress"
                  ></rich-text>
                  <u-tooltip
                    text="高亮选中文本背景色"
                    :buttons="['扩展']"
                    bgColor="#e3e4e6"
                  ></u-tooltip> -->
                  <my-tooltip :node="item"></my-tooltip>
                  <!-- 复制 -->
                </view>
                <template v-else-if="item.type === 'image'">
                  <image
                    style="
                      max-height: 310rpx;
                      max-width: 310rpx;
                      border-radius: 10rpx;
                    "
                    :src="item.attach.url"
                    show-menu-by-longpress
                    @load="handleImgLoad"
                    @click="handleClickImg(item.attach.url)"
                  />
                </template>
                <template v-else-if="item.type === 'geo'">
                  <view
                    style="
                      background: #fff;
                      color: #222;
                      border-radius: 10rpx;
                      width: 400rpx;
                      overflow: hidden;
                    "
                    @click="handleClickMap(item)"
                  >
                    <div
                      style="
                        margin: 10rpx;
                        overflow: hidden;
                        padding-top: 10rpx;
                      "
                      class="moreLine"
                    >
                      {{ item.attach.title }}
                    </div>
                    <!-- iconPath: '/static/image/dingwei.png', -->
                    <view
                      style="
                        height: 230rpx;
                        width: 400rpx;
                        overflow: hidden;
                        position: relative;
                      "
                    >
                      <map
                        :enable-scroll="false"
                        :enable-zoom="false"
                        style="
                          height: 400rpx;
                          width: 400rpx;
                          position: absolute;
                          bottom: -50px;
                        "
                        :latitude="item.attach.lat"
                        :longitude="item.attach.lng"
                        :markers="[
                          {
                            id: i,
                            latitude: item.attach.lat,
                            longitude: item.attach.lng,
                            width: 20,
                            height: 30,
                          },
                        ]"
                      >
                      </map>
                      <div
                        style="position: absolute; width: 100%; height: 100%"
                      ></div>
                    </view>
                  </view>
                </template>
                <!-- <view>
                  <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio>
                </view> -->
                <!-- 已读或未读 -->
                <div
                  v-if="item.flow === 'out' && !item.isnoShow"
                  :class="[item.status === 'receipt' ? '' : 'unread']"
                >
                  <!-- 发送失败也要处理 -->
                  {{ item.status === 'receipt' ? '已读' : '未读' }}
                </div>
              </div>
            </div>
            <div class="onlineConversation__chat__right">
              <!-- 我的内容不需要显示，别人需要显示 -->
              <u-avatar
                v-if="item.flow === 'out'"
                :src="userImg"
                size="34"
              ></u-avatar>
            </div>
          </div>

          <!-- <div
            class="onlineConversation__loading"
            v-if="i === 0 && isShowLoading"
            id="loadingId"
          >
            <u-loading-icon></u-loading-icon>
          </div> -->
        </div>
        <div
          class="onlineConversation__question"
          style="transform: rotate(180deg)"
        >
          <answer-question
            :tabsArr="tabsArr"
            :current.sync="current"
            :listObj="listObj"
            :historyArr.sync="historyArr"
          ></answer-question>
        </div>
        <!-- <div id="bottomId"></div> -->
      </div>
    </scroll-view>
    <div class="onlineConversation__footer">
      <scroll-view
        scroll-x="true"
        style="width: calc(100% - 40rpx); margin: 16rpx 20rpx"
      >
        <view class="onlineConversation__footer--item">
          <div
            v-for="(item, i) in footerArr"
            :key="i"
            @click="handleClick(item)"
          >
            <!-- 上传 -->
            <u-upload
              v-if="i === 0"
              name="upload"
              multiple
              @afterRead="handleSendImg"
            >
              <div class="onlineConversation__footer--item--div">
                <image :src="item.img"> </image>
                {{ item.name }}
              </div>
            </u-upload>
            <!-- 平台客服 -->
            <button
              v-else-if="i === 1"
              open-type="contact"
              session-from=""
              class="onlineConversation__kefu"
            >
              <image :src="item.img"> </image>
              {{ item.name }}
            </button>
            <div v-else class="onlineConversation__footer--item--div">
              <image :src="item.img"> </image>
              {{ item.name }}
            </div>
          </div>
        </view>
      </scroll-view>
      <div class="onlineConversation__footer--input">
        <u-textarea
          class="onlineConversation__footer--input--box"
          v-model="keycode"
          placeholder="请输入你想咨询的问题"
          autoHeight
          fixed
          border="none"
          :placeholderStyle="{
            fontSize: '27rpx',
            fontFamily: 'PingFang SC, PingFang SC',
            color: '#999999',
          }"
          :adjustPosition="true"
          hold-keyboard
          confirm-hold
          :show-confirm-bar="false"
          confirm-type="return"
          :cursor-spacing="30"
          @focus="handleFocus"
          @blur="handleBlur"
        ></u-textarea>
        <div class="onlineConversation__btn" @click="handleSendMsg">发送</div>
      </div>
    </div>
    <a-compress ref="compress"></a-compress>
  </div>
</template>

<script>
import ACompress from '@/components/samllTool/ACompress.vue';
import { getstorage } from '@/utils/index.js';
import AnswerQuestion from './components/AnswerQuestion.vue';
import MyTooltip from './components/MyTooltip.vue';
import { loginWYYX, timeDiff, timeFun, toDateArrFun } from './utils.js';

export default {
  async onLoad(option) {
    this.getCategoryList();
    if (option.back) {
      this.back = option.back;
    }
    // 展示类型 1 合作商家
    if (option.showType) {
      this.showType = option.showType;
    }
    // 技师账号
    if (option.teacherId) {
      this.teacherId = option.teacherId;
    }
    // 技师id
    if (option.technicianId) {
      this.technicianId = option.technicianId;
    }
    loginWYYX().then(() => {
      // 加好友
      const user = getApp().globalData.nim.friend.addFriend({
        account: this.teacherId,
      });
      console.log(user);
      this.getListDetails();
      this.initWYYX();
    });
  },
  data() {
    return {
      showType: '',
      current: 0,
      tabsArr: [],
      listObj: {},
      technicianId: '',
      defaultImg:
        'https://oss.dcqcjlb.com/51che_java_dev/20231208/file_1702019665548.png',
      // keyboardHeight: 0,
      teacherId: '', // 技师Id
      teacherRecoverNum: 0, // 技师回复数
      issue: false, // 是否发放积分
      scrollAnimation: true,
      bottomId: '',
      isCanSent: true,
      historyArr: [], // 历史数据
      keycode: '',
      limit: 15,
      isMoreEnd: false,
      isShowLoading: false,
      showShade: false, // 长按控制
      shadePos: {},
      back: '',
      sectionTime: 30,
      technicianObj: {},

      footerArr: [
        {
          name: '发送图片',
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231117/file_1700198928474.png',
          // fun: 'handleSendImg',
        },
        // 注意上放改成平台客服 i === 3
        // {
        //   name: '视频通话',
        //   img: 'https://oss.dcqcjlb.com/51che_java_dev/20231117/file_1700199001929.png',
        //   fun: 'handleVideoCall',
        // },
        // {
        //   name: '发送位置',
        //   img: 'https://oss.dcqcjlb.com/51che_java_dev/20231117/file_1700198941148.png',
        //   fun: 'handleSendPos',
        // },
        {
          name: '平台客服',
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231205/file_1701770770880.png',
        },
        {
          name: '结束对话',
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231117/file_1700198957061.png',
          fun: 'handleEndSpeak',
        },
      ],
    };
  },
  components: { ACompress, MyTooltip, AnswerQuestion },
  computed: {
    nickImg() {
      return function () {
        return this.technicianObj.headImg;
      };
    },
    userImg() {
      return getstorage('userImg');
    },
    imgList() {
      return this.historyArr
        .filter((item) => item.type === 'image')
        .map((v) => {
          return v.attach.url;
        })
        .reverse();
    },
    lastItemId() {
      if (this.historyArr.length === 0) return '';
      return `item_${this.historyArr.length - 1}`;
    },
    todayArr() {
      const { val, num } = toDateArrFun(this.historyArr);
      this.teacherRecoverNum = num;
      return val;
    },
  },
  watch: {
    async todayArr(v) {
      if (v.length < 10) return;
      const diff = timeDiff(v[0].time, v[v.length - 1].time);
      console.log('今天的数据', this.teacherRecoverNum, diff, this.issue);
      if (this.teacherRecoverNum >= 10 && diff > 10 && !this.issue) {
        const res = await this.$request.post(
          '/coc-merchant-app/api/v1/technician/sendScoreTechnician',
          {
            accid: this.teacherId,
            giveUserId: getstorage('userId'),
          }
        );
        this.issue = true;

        console.log('奖励次数====================>', res);
      }
    },
  },
  mounted() {},
  methods: {
    handleJumpCooperation() {
      uni.navigateTo({
        url: `/pages/talentShow/cooperationIntention`,
      });
    },
    // 获取咨询数据
    async getCategoryList() {
      const { data } = await this.$newrequest.post(
        '/coc-active/api/v1/fault/category/list'
      );
      const tabsArr = [];
      const listObj = {};
      data.data.forEach((res) => {
        tabsArr.push({
          name: res.name,
          id: res.id,
          isMore: res.questions.length > 6,
        });
        const arr = [];
        res.questions.forEach((v, i) => {
          const { id, question, answer } = v;
          if (i < 6) {
            arr.push({
              id,
              question,
              answer,
            });
          }
        });
        listObj[res.id] = arr;
      });
      this.tabsArr = tabsArr;
      this.listObj = listObj;
      console.log(tabsArr, listObj);
    },
    async initWYYX() {
      // 创建实例
      const eventList = [
        'msg', // 收到消息
        'syncOfflineMsgs', // 同步时收到了离线消息
        'updateSession', // 更新会话
        'syncSysMsgs',

        // 'logined',
        // 'multiPortLogin',
        // 'kicked',
        // 'willReconnect',
        // 'disconnect',
        // 'msg',
        // 'syncdone',
        // 'proxyMsg',
        // 'syncRoamingMsgs',
        // 'syncOfflineMsgs',
        // 'syncMyNameCard',
        // 'syncdone',
        // 'sessions',
        // 'updateMyNameCard',
        // 'updateBlackList',
        // 'updateMuteList',
        // 'sysMsg',
        // 'syncSysMsgs',
        // 'syncFriend',
        // 'friends',
        // 'users',
        // 'updateSystemMessages',
        // 'sysMsgUnread',
        // 'pushEvents',
        // 'msgReceipts',
        // 'teamMsgReceipts',
        // 'updateSession',
        // 'teams',
        // 'myTeamMembers',
        // 'createTeam',
        // 'updateTeamMember',
        // 'updateTeam',
        // 'addTeamMembers',
        // 'updateTeamManagers',
        // 'transferTeam',
        // 'removeTeamMembers',
        // 'dismissTeam',
        // 'updateTeamMembersMute',
      ];
      eventList.forEach((key) => {
        console.log('进来了=====>', key);
        getApp().globalData.nim.on(key, async (res) => {
          console.log(
            `时间接听 ${key} ========>:`,
            res ? JSON.parse(JSON.stringify(res)) : res
          );
          if (key === 'msg') {
            await getApp().globalData.nim.msg.sendMsgReceipt({
              msg: res,
            });
            console.log('msg===item>>', res);
            this.addData(res);
          }
          if (key === 'syncOfflineMsgs') {
            res.msgs.forEach(async (item) => {
              console.log('syncOfflineMsgs===item>>', item);
              await getApp().globalData.nim.msg.sendMsgReceipt({
                msg: item,
              });
            });
          }
          if (key === 'updateSession') {
            await getApp().globalData.nim.session.resetSessionUnreadCount({
              id: res.id,
            });
            if (res.lastMsg.status === 'receipt') {
              this.historyArr.forEach(async (item) => {
                if (item.flow === 'out' && item.status === 'sent') {
                  item.status = 'receipt';
                }
              });
            }
          }
        });
      });

      // await getApp().globalData.nim.msgLog.clearHistoryMsgsFromServer({
      //   scene: 'p2p',
      //   to: this.in,
      //   isSyncSelf: true,
      // });
      // await getApp().globalData.nim.msgLog.clearHistoryMsgsFromServer({
      //   scene: 'p2p',
      //   to: this.teacherId,
      //   isSyncSelf: true,
      // });
      this.getHistoryMsgs();
    },

    // 获取历史数据
    async getHistoryMsgs(isMore) {
      const params = {
        asc: false,
        scene: 'p2p',
        to: this.teacherId, // 聊天对象
        limit: this.limit,
      };
      if (isMore && this.historyArr.length !== 0) {
        console.log(this.historyArr);
        params.endTime = this.historyArr[this.historyArr.length - 1].time;
      }
      const historyArr = await getApp().globalData.nim.msgLog.getHistoryMsgs(
        params
      );

      if (isMore) {
        this.historyArr.push(...historyArr);
        if (historyArr.length < this.limit) {
          this.isMoreEnd = true;
        }
      } else {
        this.historyArr = historyArr;
        if (this.historyArr.length !== 0) {
          await getApp().globalData.nim.session.resetSessionUnreadCount({
            id: this.historyArr[0].sessionId,
          });
        }
      }

      // const copyHistory = JSON.parse(JSON.stringify(this.historyArr));
      this.historyArr.forEach(async (item, i) => {
        if (item.flow === 'in' && item.status === 'unread') {
          await getApp().globalData.nim.msg.sendMsgReceipt({
            msg: item,
          });
        }
        if (this.historyArr.length === 0) return;
        item.sendTime = '';
        if (
          i === this.historyArr.length - 1 ||
          Math.abs(item.time - this.historyArr[i + 1].time) >=
            this.sectionTime * 60 * 1000
        ) {
          item.sendTime = timeFun(item.time);
          console.log(item);
        }
        this.$set(this.historyArr, i, item);
      });
      // this.historyArr = this.historyArr.filter((item) => {
      //   return (
      //     item.type === 'text' || item.type === 'image' || item.type === 'geo'
      //   );
      // });
      console.log('获取云端历史记录:', this.historyArr);
      // this.$nextTick(() => {
      //   // console.log(this.$refs.content.scrollHeight);
      //   if (isMore) {
      //     console.log('=========>+++', historyArr[0]);
      //     if (historyArr.length === 0) return;
      //     this.scrollAnimation = false;
      //     this.bottomId = '';
      //     this.$nextTick(() => {
      //       this.bottomId = `item_${historyArr[historyArr.length - 1].time}`;
      //       this.scrollAnimation = true;
      //     });
      //   } else {
      //     this.resetPos();
      //   }
      // });
    },

    async handleSendMsg() {
      if (!this.keycode || !this.isCanSent) return;
      this.isCanSent = false;

      const keycode = String(this.keycode).replace(/\n/g, '<br/>');
      const sendTextMsg = await getApp().globalData.nim.msg.sendTextMsg({
        scene: 'p2p',
        to: this.teacherId, //消息接收者账户ID
        body: keycode,
        teamSpecializationInfo: {
          needACK: true,
        },
      });

      this.keycode = '';
      this.isCanSent = true;
      console.log(sendTextMsg);
      this.addData(sendTextMsg);
    },

    resetPos() {
      this.bottomId = '';
      this.$nextTick(() => {
        this.bottomId = this.lastItemId;
        console.log('进来了==========>>>>>>>>>>>>', this.lastItemId);
      });
    },

    handleFocus(e) {
      // console.log('2222222222', e.detail.height);

      // if (this.historyArr.length < 8) {
      //   this.keyboardHeight = e.detail.height || 0;
      //   console.log('键盘的高度', e.detail.height);
      // }
      console.log('1111111111111111111111111');
      this.resetPos();
    },
    handleBlur() {
      // this.keyboardHeight = 0;
    },

    closeKeyBoard() {
      uni.hideKeyboard();
    },

    // 下拉
    scrolltolower() {
      console.log('下拉进来了==========>>>>>>>>>>>>');
      if (!this.isMoreEnd) {
        this.getHistoryMsgs(true);
      }
    },

    // 查看图片
    handleClickImg(url) {
      const index = this.imgList.findIndex((v) => v === url);
      console.log(index, this.imgList);
      uni.previewImage({
        urls: this.imgList, //可以展示imgUrl 列表中所有的图片
        current: index, //首先当前index对应图片，左右可以切换其他序号的图片
      });
    },

    // 点击type
    handleClick(item) {
      console.log(item);
      if (item.fun) {
        this[item.fun]();
      }
    },
    compressedImg(url) {
      const _this = this;
      return new Promise((resolve, reject) => {
        this.$refs.compress
          .start(url)
          .then(async (res) => {
            console.log('压缩处理的图片地址=====>' + url);

            url = res;

            const sendImageMsg = await getApp().globalData.nim.msg.sendImageMsg(
              {
                scene: 'p2p',
                to: _this.teacherId,
                filePath: url,
                onUploadStart: function () {
                  console.log(111111111111111);
                  _this.isShowLoading = true;

                  console.log('2222222222222222222222222222');
                  // this.resetPos();
                  _this.bottomId = '';
                  _this.$nextTick(() => {
                    _this.bottomId = 'loadingId';
                  });
                },
              }
            );
            _this.isShowLoading = false;
            _this.addData(sendImageMsg);
            resolve();
          })
          .catch(() => {
            uni.$u.toast('图片压缩失败');
            _this.isShowLoading = false;
            resolve();
          });
      });
    },
    // 发送图片
    async handleSendImg(e) {
      const _this = this;
      console.log('发送图片', e);

      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = e.file;
      for (let i = 0; i < lists.length; i++) {
        this.compressedImg(lists[i].url);
      }
    },

    // 视频通话
    handleVideoCall() {
      console.log('视频通话');
    },

    // 发送位置
    async handleSendPos() {
      console.log('发送位置');
      const _this = this;
      uni.chooseLocation({
        success: async function (res) {
          console.log('位置名称：' + res.name);
          console.log('详细地址：' + res.address);
          console.log('纬度：' + res.latitude);
          console.log('经度：' + res.longitude);
          const pos = await getApp().globalData.nim.msg.sendGeoLocationMsg({
            scene: 'p2p',
            to: _this.teacherId,
            attach: {
              lng: res.longitude,
              lat: res.latitude,
              title: res.name + res.address,
            },
          });
          console.log('发送位置=========>', pos);
          _this.addData(pos);
        },
      });
    },

    // // 平台客服
    // handleLabour() {
    //   console.log('平台客服');
    // },

    // 结束对话
    async handleEndSpeak() {
      console.log('结束对话');
      await getApp().globalData.nim.destroy();
      uni.navigateBack();
    },

    // 添加数据
    addData(data) {
      const arr = JSON.parse(JSON.stringify(this.historyArr));

      if (arr.length === 0) {
        data.sendTime = timeFun(data.time);
      } else {
        const diff = timeDiff(data.time, arr[0].time);
        if (diff > this.sectionTime) {
          data.sendTime = timeFun(data.time);
        }
      }

      this.historyArr.unshift(data);
      console.log('=====>', this.historyArr);

      console.log('333333333333333333333333');
      this.resetPos();
    },

    // 长按事件
    handleLongpress(e) {
      console.log(e);
      this.showShade = true;
      this.shadePos = {};
    },

    // 点击地图
    handleClickMap(item) {
      console.log('点击地图', item);
      uni.openLocation({
        latitude: item.attach.lat,
        longitude: item.attach.lng,
      });
    },

    // 图片的宽高
    handleImgLoad(e) {
      console.log(e);
    },
    // 获取技师列表
    async getListDetails() {
      await this.$newrequest
        .post('/coc-active/api/v1/technician/details', {
          id: this.technicianId,
        })
        .then((res) => {
          this.technicianObj = res.data;
          uni.setNavigationBarTitle({
            title: res.data.name,
          });
        });
    },
  },
  async beforeDestroy() {
    console.log('在线聊天销毁');
    const state = await getApp().globalData.nim.status;
    if (state === 'logined') {
      await getApp().globalData.nim.destroy();
    }
    console.log(1111111111111111111, state);

    if (this.back === '2' || this.back === '1') {
      var pages = getCurrentPages();
      if (this.back === '2') {
        var prevPage = pages[pages.length - 2]; //上上一个页面
      } else if (this.back === '1') {
        var prevPage = pages[pages.length - 1]; //上一个页面
      }
      console.log(prevPage, pages);
      prevPage.$vm.loginWYYXFun();
    }
  },
};
</script>
<style lang='scss' scoped>
.onlineConversation {
  background: #efefef;
  height: calc(100vh - 200rpx);
  display: flex;
  flex-direction: column;
  &__content {
    background: #efefef;
    transform: rotate(180deg);
    flex: 1;
    overflow: hidden;
    // height: calc(100vh - 200rpx);
    &--dec {
      display: flex;
      padding-top: 20rpx;
    }
  }
  &__cooperation {
    padding: 23rpx 0;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 27rpx;
    font-family: PingFang SC, PingFang SC;
    color: #d91b1b;
  }
  &__forChat {
    transform: rotate(180deg);
    padding-bottom: 20rpx;
  }
  &__question {
    transform: rotate(180deg);
    padding-bottom: 20rpx;
    padding: 23rpx;
  }
  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #f6f6f6;
    width: 100%;
    height: 200rpx;
    &--item {
      display: flex;
      &--div {
        display: flex;
        align-items: center;
      }
      & > div {
        background: #ffffff;
        border-radius: 192rpx;
        display: flex;
        margin-right: 15rpx;
        padding: 6rpx 15rpx;
        align-items: center;
        white-space: nowrap;

        font-size: 23rpx;
        font-family: PingFang SC, PingFang SC;
        color: #222222;
        image {
          width: 30rpx;
          height: 30rpx;
          margin-right: 7rpx;
        }
      }
    }
    &--input {
      padding: 0 20rpx 60rpx;
      display: flex;
      align-items: center;
      &--box {
        background: #ffffff;
      }
    }
  }
  &__chat {
    &__left,
    &__right {
      width: 110rpx;
      display: flex;
      justify-content: center;
    }
    &__center {
      flex: 1;
      & > div:nth-child(1) {
        position: relative;
        border-radius: 23rpx 4rpx 23rpx 23rpx;
        font-size: 27rpx;
        font-family: PingFang SC, PingFang SC;
        color: #ffffff;
        padding: 15rpx;
        background: #1270de;
        float: right;
        word-break: break-all;
        & > div:last-child {
          position: absolute;
          top: 18rpx;
          left: -60rpx;
          font-size: 23rpx;
          font-family: PingFang SC, PingFang SC;
          color: #999999;
        }

        // 未读
        .unread {
          color: #1270de !important;
        }
      }
    }
  }
  // 独特的
  &__otherPeople {
    & > div:nth-child(1) {
      background: #ffffff;
      box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(217, 220, 226, 0.5);
      border-radius: 4rpx 23rpx 23rpx 23rpx;
      color: #222222;
      float: left;
      & > div:nth-child(1) {
        position: absolute;
        top: 18rpx;
        left: -60rpx;
        color: #1270de;
      }
    }
  }
  // 客服
  &__kefu {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    width: auto;
    height: 30rpx;

    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 23rpx;
    font-family: PingFang SC, PingFang SC;
    color: #222222;
    padding: 0 4rpx;
  }
  &__kefu::after {
    width: auto;
    height: auto;
    border: 0;
  }
  // 发送图片
  &__noBgn {
    background: none !important;
    padding: 0 !important;
  }
  &__time {
    font-size: 23rpx;
    font-family: PingFang SC, PingFang SC;
    color: #999999;
    text-align: center;
    padding-top: 20rpx;
  }
  &__loading {
    margin: 0 auto 20rpx;
    width: 110rpx;
  }
  &__btn {
    background: #1270de;
    border-radius: 8rpx;
    font-size: 23rpx;
    color: #ffffff;
    height: 55rpx;
    line-height: 55rpx;
    width: 80rpx;
    text-align: center;
    margin-left: 20rpx;
  }
  &__blankPage {
    width: 100%;
    height: 0;
    background: #efefef;
  }
}

::v-deep {
  .u-textarea__field {
    height: 145px;
    max-height: 95px;
    overflow: auto;
  }
  .input-placeholder {
    line-height: 19rpx;
  }
}
</style>
