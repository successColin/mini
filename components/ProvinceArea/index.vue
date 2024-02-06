<!--
 * @Descripttion: 省市区
 * @Author: ytx
 * @Date: 2023-11-08 16:07:28
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-08 16:07:28
-->
<template>
  <!-- :loading="loading" -->
  <u-picker
    :show="show"
    ref="uPicker"
    :columns="columns"
    keyName="name"
    closeOnClickOverlay
    @close="handleCancel"
    @cancel="handleCancel"
    @change="changeHandler"
    @confirm="handleConfirm"
  ></u-picker>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    columnData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // loading: false,
    };
  },
  mounted() {},
  methods: {
    handleConfirm(item) {
      console.log(222222222222, item, item.value[1]);
      if (!item.value[1]) {
        this.$emit('update:show', false);
        return;
      }
      this.$emit('confirm', item.value);
      this.$emit('update:show', false);
      // this.handleCancel();
    },
    handleCancel() {
      this.$emit('update:show', false);
    },
    async changeHandler(e) {
      const { columnIndex, index, picker = this.$refs.uPicker } = e;
      if (columnIndex === 0) {
        // this.loading = true;
        const { data } = await this.$request.get(
          `/coc-active/api/v1/technician/city/list/${this.columns[0][index].adCode}`
        );
        picker.setColumnValues(1, data);
        this.$set(this.columnData, index, data);
        // this.loading = false;
      }
    },
  },
};
</script>
