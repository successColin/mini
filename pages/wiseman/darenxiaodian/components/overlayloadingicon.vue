<template>
    <view>
        <u-overlay :show="show">
            <view class="overlay">
                <u-loading-icon :show="show" color="#5ac725" />
            </view>
        </u-overlay>
    </view>
</template>

<script>
export default {
    components: {},
    props: {
        show: {
            type: Boolean,
            default() {
                return false
            },
        },
    },
    data() {
        return {}
    },
    onLoad() { },
    onShow() { },
    methods: {}
}
</script>

<style lang="scss" scoped>
.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>