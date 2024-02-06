export function gettoken() {
  if (uni.getStorageSync('token')) {
    return true;
  } else {
    return false;
  }
}
// 是否登录
export function tologin() {
  if (uni.getStorageSync('token')) {
    return true;
  } else {
    uni.navigateTo({
      url: '/pages/activity/share/index',
    });
    return false;
  }
}
export function setstorage(key, value) {
  uni.setStorageSync(key, value);
}
export function getstorage(key) {
  return uni.getStorageSync(key);
}

