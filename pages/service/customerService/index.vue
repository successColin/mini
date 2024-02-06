<template>
  <div></div>
</template>

<script>
const myPluginInterface = requirePlugin('qi-yu');

console.log(myPluginInterface);
myPluginInterface.__configAppId('DxenATN3J0I');
myPluginInterface._$configAppKey('fe91af87bcf9ec3232648a95894d2f69'); // 申请企业的appKey
myPluginInterface.__configDomain('https://dsrzzlyxgs.qiyukf.com'); // 1.1.1版本以前需要手动配置下七鱼服务器域名

export default {
  mounted() {
    uni.redirectTo({
      url: 'plugin://qi-yu/chat',
    });
  },
};
</script>
<style lang='scss' scoped>
</style>
