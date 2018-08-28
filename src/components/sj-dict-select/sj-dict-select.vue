<template>
  <div>
    <el-select v-model="text"
               placeholder="请选择"
               @change="handleChange">
      <el-option
              v-for="item in data"
              :key="item.dictId"
              :label="item[labelKey]"
              :value="item[valueKey]">
      </el-option>
    </el-select>
  </div>
</template>

<script>

  import NProgress from 'nprogress' // progress bar
  import 'nprogress/nprogress.css' // progress bar style
  import DictApi from '@/api/dict/DictApi';
  export default {
    name: 'SjDictSelect',
    props: {
      value: String,
      labelKey: {
        type: String,
        default: 'dictName'
      },
      valueKey: {
        type: String,
        default: 'dictCode'
      },
      dictTypeCode: String
    },
    data() {
      return {
        data: [],
        text: null
      }
    },
    created() {
      this.findDict();
      this.text = this.value;
    },
    methods: {
      findDict() {
        NProgress.start();
        let params = {
          dictTypeCode: this.$props.dictTypeCode
        };
        let dictApi = new DictApi();
        dictApi.getDictListByTypeCode(params).then(res=>{
          this.data = res.data;
        });
      },

      //选择回调
      handleChange(val) {
        let dict = {};
        let valueKey = this.valueKey;
        this.data.forEach(function(item) {
          if(item[valueKey] == val){
            dict = item;
          }
        });
        this.$emit("input", dict[valueKey]);
        this.$emit("on-change", dict);
      }


    },
    computed: {
      childrenKey: function() {
        return this.props.children || 'children';
      }
    }
  }
</script>

<style lang="scss">
  .sj-table-search {
    padding-bottom: 50px;
  }

  .sj-table-operation {
    padding-bottom: 8px;
  }

  .sj-table-operation .sj-table-operation-item {
    padding: 8px 20px;
  }
</style>
