<template>
  <div>
    <el-form
            v-model="searchForm"
            label-position="right"
            label-width="80px"
            class="sj-table-search"
            v-if="options.filters"
    >
      <el-col v-for="(filter, index) in options.filters.props"
              :key="index" :span="6">
        <el-form-item v-if="filter.type=='input'"
                      :label-width="filter.labelWidth"
                      :label="filter.label">
          <el-input v-model="searchForm[filter.prop]"
                    :placeholder="filter.placeholder"></el-input>
        </el-form-item>
        <el-form-item v-else-if="filter.type=='select'"
                      :label-width="filter.labelWidth"
                      :label="filter.label">
          <el-select v-model="searchForm[filter.prop]"
                     :placeholder="filter.placeholder">
            <el-option v-for="(fileType, ftIndex) in filter.options"
                       :key="fileType.value"
                       :label="fileType.label"
                       :value="fileType.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 增加日期选择 -->
        <el-form-item v-else-if="filter.type=='date'||filter.type=='datetime'"
                      :label-width="filter.labelWidth"
                      :label="filter.label">
          <el-date-picker
                  v-model="searchForm[filter.prop]"
                  :placeholder="filter.placeholder"
                  :type="filter.type"
                  :format="filter.format"
                  :value-format="filter.valueFormat">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <div style="float: left;text-align: right;">
        <el-form-item label-width="10px">
          <el-button type="primary" @click="findPage" v-if="searchBtn">搜索</el-button>
          <el-button type="primary" @click="handleReset" v-if="clearBtn">清空</el-button>
        </el-form-item>
      </div>

    </el-form>
    <el-col class="sj-table-operation">
      <el-button v-for="(btn, btnIndex) in options.operateBtns"
                 :type="btn.type"
                 @click="btn.func"
                 v-if="btn.show"
                 :icon="btn.icon"
                 class="sj-table-operation-item">{{btn.label}}
      </el-button>
    </el-col>

    <el-table
            :data="data"
            border
            stripe
            @selection-change="selectionChange"
            style="width: 100%;text-align:center">
      <template v-if="options.selection">
        <el-table-column type="selection"
                         width="50"
                         align="center">
        </el-table-column>
      </template>
      <!-- 序号 -->
      <template v-if="options.index">
        <el-table-column type="index"
                         label="序号"
                         width="50"
                         align="center">
        </el-table-column>
      </template>
      <template>
        <el-table-column
                v-for="(column, index) in options.columns"
                :prop="column.prop"
                :key="index"
                :label="column.label"
                :type="column.type"
                align="center"
                :width="column.width"
                :min-width="column.minWidth"
        >
          <template slot-scope="scope">

            <div v-if="column.operation">
              <span v-for="(operation_btn, index) in column.operation">
                <el-button size="small"
                           v-if="!operation_btn.show"
                           :type="operation_btn.type"
                           :icon="operation_btn.icon"
                           @click="operation_btn.func(scope.row)">
                  {{operation_btn.label}}
                </el-button>
                <el-button size="small"
                           v-else-if="operation_btn.show(scope.row)"
                           :type="operation_btn.type"
                           :icon="operation_btn.icon"
                           @click="operation_btn.func(scope.row)"
                           style="margin-left: 16px">
                  {{operation_btn.label}}
                </el-button>
              </span>
            </div>
            <sj-column-render v-else-if="column.render" :row="scope.row" :render="column.render"></sj-column-render>
            <span v-else>
            {{scope.row[column.prop]}}
          </span>
          </template>
        </el-table-column>
      </template>


    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination v-if="options.pagination"
                     :layout="options.pagination.layout"
                     :page-size="pageSize"
                     :current-page="pageNo"
                     :total='total'
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>

  import NProgress from 'nprogress' // progress bar
  import 'nprogress/nprogress.css' // progress bar style
  import SjColumnRender from "@/components/sj-table/sj-column-render";

  export default {
    name: 'SjTable',
    components: {SjColumnRender},
    props: {
      options: Object
    },
    data() {
      return {
        data: [],
        searchForm: {},
        pageNo: 1,
        pageSize: 10,
        total: 0,
        tableSelect: []
      }
    },
    created() {
      this.findPage();
    },
    methods: {

      findPage(obj) {
        NProgress.start();
        let page = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        let param = Object.assign(page, this.searchForm, obj);
        this.$props.options.refresh(param).then(res => {
          this.data = res.data.records;
          this.total = parseInt(res.data.total);
          this.pageSize = res.data.size;
          this.pageNo = res.data.current;
          NProgress.done();
        });
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.findPage();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findPage();
      },
      handleReset() {
        this.searchForm = {};
      },
      //选择回调
      selectionChange(val) {
        this.tableSelect = val;
      },
      findPage(obj) {
        NProgress.start();
        let page = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        let param = Object.assign(page, this.searchForm, obj);
        console.log(param)
        this.$props.options.refresh(param).then(res => {
          console.log(res)
          this.data = res.data.records;
          this.total = parseInt(res.data.total);
          this.pageSize = res.data.size
          this.pageNo = res.data.current
          NProgress.done();
        });
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.findPage();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findPage();
      },
      handleReset() {
        this.searchForm = {};
        this.findPage()
      },
      //选择回调
      selectionChange(val) {
        this.tableSelect = val;
      }
    },
    watch: {},
    computed: {
      searchBtn: function() {
        if(!this.options.filters){
          return false;
        }

        if(!this.options.filters.btns){
          return true;
        }

        if(this.options.filters.btns.indexOf('search') != -1){
          return true;
        }
        return false;
      },
      clearBtn: function() {
        if(!this.options.filters){
          return false;
        }

        if(!this.options.filters.btns){
          return true;
        }

        if(this.options.filters.btns.indexOf('clear') != -1){
          return true;
        }
        return false;
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
