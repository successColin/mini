<template>
  <div>
    <div class="cooperationIntention">
      <u--form :model="form" ref="uForm">
        <u-form-item
          v-for="(item, index) in formArr"
          :borderBottom="index !== formArr.length - 1"
          labelWidth="auto"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :required="item.isRequired"
          @click="handleClick(item)"
        >
          <u-input
            v-model="form.name"
            :border="border"
            :disabled="item.type === 1"
            disabledColor="#ffffff"
            :placeholder="item.type === 1 ? '请选择' : '请输入'"
          />
          <div
            slot="right"
            style="margin-right: 5rpx; position: relative; left: -10rpx"
          >
            <u-icon
              name="arrow-right"
              v-if="item.type === 1"
              color="#999999"
            ></u-icon>
          </div>
        </u-form-item>
      </u--form>
    </div>
    <div style="width: 100%; position: fixed; bottom: 100rpx">
      <div class="cooperationIntention__btn" @click="submit">提交</div>
    </div>
    <u-calendar
      :title="title"
      :show="showCalendar"
      mode="range"
      @confirm="confirm"
      color="#D91B1B"
      closeOnClickOverlay
      showLunar
      :round="10"
      :monthNum="6"
      @close="showCalendar = false"
    ></u-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '意向合作时间',
      showCalendar: false,
      formArr: [
        {
          i: 1,
          label: ' 意向套餐',
          prop: 'name',
          type: 1,
          isRequired: true,
        },
        {
          label: ' 意向份数',
          prop: 'name',
          isRequired: true,
        },
        {
          label: ' 意向单价（元/份）',
          prop: 'name',
          isRequired: true,
        },
        {
          i: 2,
          label: ' 意向合作时间',
          prop: 'name',
          type: 1,
          isRequired: true,
        },
        {
          label: ' 联系人',
          prop: 'name',
          isRequired: true,
        },
        {
          label: ' 手机号码',
          prop: 'name',
          isRequired: true,
        },
        {
          label: ' 备注说明',
          prop: 'name',
        },
      ],
      form: {
        name: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入合作意向',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    handleClick(item) {
      if (item.type !== 1) return;
      if (item.i === 1) {
        uni.navigateTo({
          url: `/pages/talentShow/selectPackage`,
        });
      } else if (item.i === 2) {
        this.title = item.label;
        this.showCalendar = true;
      }
    },
    confirm(e) {
      console.log(e);
      this.showCalendar = false;
    },
    submit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          uni.$u.toast('校验通过');
        })
        .catch((errors) => {
          uni.$u.toast('校验失败');
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.cooperationIntention {
  margin: 20rpx;
  background: #ffffff;
  border-radius: 15rpx;
  &__item {
    margin: 0 40rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
  }
  &__btn {
    width: 512rpx;
    height: 77rpx;
    background: linear-gradient(270deg, #d91b1b 0%, #e94141 100%);
    border-radius: 137rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 27rpx;
    font-family: PingFang SC, PingFang SC;
    color: #ffffff;
  }
}
::v-deep {
  .u-form-item__body__left__content__label {
    font-size: 27rpx !important;
    color: #222222 !important;
    font-family: PingFang SC, PingFang SC;
  }
  .u-form-item__body {
    padding: 10rpx 0 10rpx 30rpx !important;
  }
  .u-line {
    width: 94% !important;
    margin: 0 auto !important;
  }
  input {
    text-align: right !important;
  }
  .u-form-item {
    position: relative;
  }
  .u-form-item__body__right__message {
    position: absolute;
    bottom: 2px;
    right: 10px;
  }
}
</style>
