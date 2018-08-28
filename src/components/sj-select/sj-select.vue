<template>
  <el-select v-model="text"
             :size="size"
             :multiple="multiple"
             :placeholder="placeholder?placeholder:'请选择'"
             @change="handleChange"
             :disabled="disabled">
    <el-option v-for="(item,index) in dataSource"
               :key="index"
               :label="item[labelKey]"
               :value="item[valueKey]">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "SjSelect",
  data() {
    return {
      text: '',
      placeholder:''
    };
  },
  props: {
    dataSource: {
      type: Array,
      default () {
        return [];
      }
    },

    size: {
      type: String,
      default: 'medium'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    multiple: {
      type: Boolean,
      default: false
    },

    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
</style>
