import { newrequest } from '@/common/request.js';
import { getstorage } from '@/utils/index.js';
import NIMSDK from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK';
// account
export async function loginWYYX() {
  const app = getApp();
  console.log('==========================>', app.globalData);
  if (app && app.globalData && app.globalData.nim) {
    const params = {
      userId: uni.getStorageSync('userId'),
      name: uni.getStorageSync('nickname'),
      icon: getstorage('userImg'),
      // mobile: uni.getStorageSync('realName'),
    };
    // 注册或登录
    const user = await newrequest.post(
      '/coc-tencent-im/api/v1/yunxin/registerYunXinAccount',
      params,
    );

    const { code, data } = user;
    console.log(user);
    if (code === 200) {
      const { accid, token } = data;

      // 更新信息
      newrequest.post('/coc-tencent-im/api/v1/yunxin/updateYunXinAccountInfo', {
        accid: accid,
        name: uni.getStorageSync('nickname'),
        icon: getstorage('userImg'),
      });

      // 去除刷新 token 接口
      // const res = await newrequest.post(
      //   '/coc-tencent-im/api/v1/yunxin/refreshYunXinToken',
      //   {
      //     accid,
      //   },
      // );

      uni.setStorageSync('WYYXAccid', accid);

      // appkey: 'ff794bd97d8d07c5d1fb75551c96009d',
      app.globalData.nim = NIMSDK.getInstance({
        appkey: '4d0d00f14d9f5a617401c3d1d8c1b077',
        account: accid,
        token: token,
        // account: res.data.accid,
        // token: res.data.token,
        // account,
        // token: '123456',
        // debugLevel: 'debug',
      });

      await getApp().globalData.nim.connect();
    } else {
      return uni.showToast({
        title: '接口请求错误',
        icon: 'none',
      });
    }
  }
}

import dayjs from 'dayjs';
export function timeFun(ss) {
  //当前年的最开始
  let yearStar = dayjs().startOf('year').$d.valueOf();
  //当前月的最开始
  let monthStar = dayjs().startOf('month').$d.valueOf();
  //当前周的最开始
  let weekStar = dayjs().startOf('week').$d.valueOf();
  //当前天的最开始
  let todayStar = dayjs().startOf('day').$d.valueOf();
  //昨天的最开始
  let yestodayStar = dayjs().startOf('day').$d.valueOf() - 1000 * 60 * 60 * 24;

  let currenttime;

  console.log(
    dayjs().startOf('year').$d,
    dayjs().startOf('month').$d,
    dayjs().startOf('week').$d,
    dayjs().startOf('day').$d,
  );

  //超出今年的年份
  if (ss < yearStar) {
    //本身所在的年份 let ss = 1525492800000;
    console.log('本身所在的年份');
    let month = dayjs(ss).month() + 1;
    let date = dayjs(ss).date();

    month >= 10 ? (month = month) : (month = '0' + month);
    date >= 10 ? (date = date) : (date = '0' + date);

    currenttime = `${dayjs(ss).year()}-${month}-${date}`;
  }

  //在今年不在本月中
  if (ss > yearStar && ss < monthStar) {
    //当前年的日期 let ss = 1571760000000;
    console.log('当前年的日期');

    let month = dayjs(ss).month() + 1;
    let date = dayjs(ss).date();

    month >= 10 ? (month = month) : (month = '0' + month);
    date >= 10 ? (date = date) : (date = '0' + date);
    currenttime = `${dayjs(ss).year()}-${month}-${date}`;
  }

  //在本月不在本周
  if (ss > monthStar && ss < weekStar) {
    //当前月的日期 let ss = 1575302400000;
    console.log('当前月的日期');
    let month = dayjs(ss).month() + 1;
    let date = dayjs(ss).date();

    month >= 10 ? (month = month) : (month = '0' + month);
    date >= 10 ? (date = date) : (date = '0' + date);

    currenttime = `${month}-${date}`;
  }

  //在本周不在昨天
  if (ss > weekStar && ss < yestodayStar) {
    //周几  let ss = 1576987200000;
    console.log('周几');
    let weekObj = {
      0: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
    };
    let week = dayjs(ss).day();
    let weekValue = weekObj[week];

    let hour = dayjs(ss).hour();
    let minute = dayjs(ss).minute();
    hour >= 10 ? (hour = hour) : (hour = '0' + hour);
    minute >= 10 ? (minute = minute) : (minute = '0' + minute);

    currenttime = `周${weekValue}-${hour}:${minute}`;
  }

  //昨天的
  if (ss > yestodayStar && ss < todayStar) {
    //昨天 let ss = 1577073600000;
    console.log('昨天');

    let hour = dayjs(ss).hour();
    let minute = dayjs(ss).minute();
    hour >= 10 ? (hour = hour) : (hour = '0' + hour);
    minute >= 10 ? (minute = minute) : (minute = '0' + minute);

    currenttime = `昨天-${hour}:${minute}`;
  }

  //当天的
  if (ss > todayStar) {
    //时 + 分 let ss = 1577145600000;
    console.log('今天');

    let hour = dayjs(ss).hour();
    let minute = dayjs(ss).minute();
    hour >= 10 ? (hour = hour) : (hour = '0' + hour);
    minute >= 10 ? (minute = minute) : (minute = '0' + minute);

    currenttime = `${hour}:${minute}`;
  }

  return currenttime;
}
export function toDateArrFun(arr) {
  let todayStar = dayjs().startOf('day').$d.valueOf();
  let val = [];
  let num = 0; // 技师回复数
  //当天的
  arr.forEach((item) => {
    if (item.time > todayStar) {
      val.push(item);
      num += 1;
      // if (item.flow === 'in') {
      // }
    }
  });
  return {
    val,
    num,
  };
}

export function timeDiff(startTime, endTime) {
  return dayjs(startTime).diff(dayjs(endTime), 'minutes');
}
