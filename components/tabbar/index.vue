<template>
    <view class="tab-bar">
        <view class="content">
            <template v-for="(item, index) in tabBarList">
                <view v-if="item.isshow" class="one-tab" :key="index" @click="selectTabBar(item.pagePath)">
                    <view>
                        <view style="position: relative;">
                            <view class="tab-img">
                                <image v-if="routePath === item.pagePath" class="img" :src="item.selectedIconPath">
                                </image>
                                <image v-else class="img" :src="item.iconPath"></image>
                            </view>
                            <view v-if="item.tabs.length > 0" class="label_view_img"
                                style="position: absolute;top: -10rpx;left: 22rpx;">
                                <noticebar class="label_view" :notices="item.tabs" :width="80" :height="36"
                                    :textheight="36"></noticebar>
                                <image class="label_view_img" src="@/static/image/label.png"></image>
                            </view>
                        </view>
                    </view>
                    <view v-if="routePath === item.pagePath" class="tit selectTexts">{{ item.text }}</view>
                    <view v-else class="tit texts">{{ item.text }}</view>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
import noticebar from '@/pages/home/components/noticeBar/index.vue';
import {
getstorage,
setstorage
} from '@/utils/index.js';
export default {
    components: {
        noticebar
    },
    props: {
        // 当前页面路径
        routePath: {
            type: String,
            required: true
        }
    },
    created() {
        uni.hideTabBar()
    },
    mounted() {
        let menulist = getstorage('menuconfiglist')
        if (menulist) {
            this.initmenu(JSON.parse(menulist))
        } else {
            this.$request.post('/coc-active/api/v2/homePage/menuTag/list').then(res => {
                menulist = {}
                res.data.forEach(n => {
                    menulist[n.menuKey] = n.tag ? n.tag.split(',').map(m => {
                        return {
                            text: m
                        }
                    }) : []
                })
                setstorage('menuconfiglist', JSON.stringify(menulist))
                this.initmenu(menulist)
            })
        }
    },
    data() {
        return {
            tabbarHeight: 0,
            tabBarList: []
        };
    },
    methods: {
        initmenu() {
            let menulist = JSON.parse(getstorage('menuconfiglist'))
            this.tabBarList = [{
                "pagePath": "pages/home/index",
                "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240125/file_1706143395081.png",
                "selectedIconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240125/file_1706143278562.png",
                "text": "首页",
                "tabs": menulist['applets_exciting_first_look'] ? menulist['applets_exciting_first_look'] : [],
                "isshow": Object.keys(menulist).findIndex(m => m === 'applets_exciting_first_look') >= 0

            },
            // {
            //     "pagePath": "pages/home/xjl/index",
            //     "iconPath": require("@/static/image/xuejia.png"),
            //     "selectedIconPath": require("@/static/image/activityxuejia.png"),
            //     "text": "51学驾",
            //     "tabs": menulist['applets_drive_car'] ? menulist['applets_drive_car'] : [],
            //     "isshow": Object.keys(menulist).findIndex(m => m === 'applets_drive_car') >= 0
            // },
            {
                "pagePath": "pages/home/faultConsultation/index",
                "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706079951786.png",
                "selectedIconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706079959041.png",
                "text": "故障咨询",
                "tabs": menulist['applets_fault_consultation'] ? menulist['applets_fault_consultation'] : [],
                "isshow": Object.keys(menulist).findIndex(m => m === 'applets_fault_consultation') >= 0
            },
			{
			    "pagePath": "pages/home/4sShop",
			    "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240125/file_1706143534531.png",
			    "selectedIconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240125/file_1706143595133.png",
			    "text": "4S店逛逛",
			    "tabs": menulist['applets_4s_strolling'] ? menulist['applets_4s_strolling'] : [],
			    "isshow": Object.keys(menulist).findIndex(m => m === 'applets_4s_strolling') >= 0
			},
            // {
            //     "pagePath": "pages/home/carhelp",
            //     "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20231202/file_1701495942188.png",
            //     "selectedIconPath": 'https://oss.dcqcjlb.com/51che_java_dev/20231202/file_1701495904965.png',
            //     "text": "道路救援",
            //     "tabs": menulist['applets_51help'] ? menulist['applets_51help'] : [],
            //     "isshow": Object.keys(menulist).findIndex(m => m === 'applets_51help') >= 0
            // },
			// {
			//     "pagePath": "carrental",
			//     "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20231202/file_1701495806619.png",
			//     "selectedIconPath": "https://oss.dcqcjlb.com/51che_java_dev/20231202/file_1701495806619.png",
			//     "text": "51租车",
			//     "tabs": menulist['applets_installment_buy_car'] ? menulist['applets_installment_buy_car'] : [],
			//     "isshow": Object.keys(menulist).findIndex(m => m === 'applets_installment_buy_car') >= 0
			// },
            // {
            //     "pagePath": "pages/home/51carOther/index",
            //     "iconPath": require("@/static/image/shopCheck.png"),
            //     "selectedIconPath": require("@/static/image/shopChecked.png"),
            //     "text": "51购车",
            //     "tabs": menulist['applets_installment_buy_car'] ? menulist['applets_installment_buy_car'] : [],
            //     "isshow": Object.keys(menulist).findIndex(m => m === 'applets_installment_buy_car') >= 0
            // },
            {
                "pagePath": "pages/home/safetyEducation/index",
                "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706079927221.png",
                "selectedIconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706079939259.png",
                "text": "安全教育",
                "tabs": menulist['applets_safety'] ? menulist['applets_safety'] : [],
                "isshow": Object.keys(menulist).findIndex(m => m === 'applets_safety') >= 0
            },
            {
                "pagePath": "pages/home/my",
                "iconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240125/file_1706143711542.png",
                "selectedIconPath": "https://oss.dcqcjlb.com/51che_java_dev/20240125/file_1706143765988.png",
                "text": "我的",
                "tabs": menulist['applets_my'] ? menulist['applets_my'] : [],
                "isshow": Object.keys(menulist).findIndex(m => m === 'applets_my') >= 0
            }
            ]
            setTimeout(() => {
                uni.createSelectorQuery().in(this).select(".tab-bar").boundingClientRect(data => {
                    this.$emit('input', data.height)
                }).exec()
            }, 50)
        },
        selectTabBar(path) {
			console.log(path)
			if(path==='carrental'){
				uni.navigateToMiniProgram({  
				  appId: 'wx3433be59ccbad45d',   
				  extraData: {  
				    // 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。  
				    foo: 'bar'  
				  },  
				  success(res) {  
				    // 打开成功  
				  }  
				});
			}else{
				uni.switchTab({
				    url: '/' + path
				})
			}
           
        }
    }
};
</script>

<style lang="scss" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding-top: 20rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom));
    padding-bottom: calc(env(safe-area-inset-bottom));
    background-color: #fff;
    border-top: 1px solid #D5D5D5;
    z-index: 999;

    .content {
        display: flex;

        .one-tab {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 50%;

            .tab-img {
                width: 50rpx;
                height: 50rpx;

                .img {
                    width: 100%;
                    height: 100%;
                }
            }

            .tit {
                font-size: 30rpx;
                transform: scale(0.7);
            }

            .selectTexts {
                color: #d91b1b;
            }

            .texts {
                color: #7A7E83;
            }
        }
    }

    .label_view_img {
        width: 80rpx;
        height: 36rpx;
    }

    .label_view {
        width: 80rpx;
        height: 36rpx;
        position: absolute;
        top: 0;
    }
}
</style>
