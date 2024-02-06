export default {
  data() {
    return {
      sessionsArr: [], // 会话数组
      // users: [],
      eventList: ['updateSession', 'sessions', 'disconnect'],
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    async initWYYX() {
      this.eventList.forEach((key) => {
        getApp().globalData.nim.on(key, async (res) => {
          console.log(`${key}============>`, res);
          if (key === 'updateSession') {
            const i = this.sessionsArr.findIndex((v) => v.id === res.id);
            if (i === -1) {
              this.sessionsArr.unshift(res);
            } else {
              this.sessionsArr[i] = res;
            }
          }
          // 会话
          if (key === 'sessions') {
            this.sessionsArr = res;
          }
        });
      });

      // 获取所有会话
      this.sessionsArr = await getApp().globalData.nim.session.getSessions({
        limit: 100,
        desc: true,
      });
      console.log('所有会话=============>', this.sessionsArr);

      // 获取所有用户
      // const userArr = [];
      // this.sessionsArr.forEach((item) => {
      //   userArr.push(item.to);
      // });

      // console.log('获取用户详情：', this.users);
      // // 获取用户信息
      // if (userArr.length !== 0) {
      //   this.users =
      //     await getApp().globalData.nim.user.getUsersNameCardFromServer({
      //       accounts: userArr,
      //     });
      // }
    },
  },
};
