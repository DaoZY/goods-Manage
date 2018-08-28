<template>
  <basic-container>
    <el-container>
      <!-- start 左侧组织树-->
      <el-aside class="sj-tree-container">
        <el-tree :data="treeData" :props="treeProp" node-key="companyInfoId"
                 @node-click="handleNodeClick" class="sj-tree-content">
        </el-tree>
      </el-aside>
      <!-- end 平台划分应用树-->

      <!-- start 组织列表-->
      <el-main style="padding: 5px;">
        <el-card class="box-card">
          <sj-table :options="tableOption" ref="tissueTable"></sj-table>
        </el-card>
      </el-main>
      <!-- end 组织列表-->
    </el-container>

    <!-- start 组织表单-->
    <el-dialog :visible.sync="formDialog" :title="formTitle" @close="closeFormDialog">
      <el-container class="sj-dialog-container">
        <el-main class="sj-dialog-main">
          <el-form :model="tissue" label-width="120px">
            <el-row :gutter="20" class="sj-form-group">
              <el-col :span="12">
                <el-form-item label="组织代码:">
                  <el-input v-model="tissue.tissueCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="sj-form-group">

              <el-col :span="12">
                <el-form-item label="组织名称:">
                  <el-input v-model="tissue.tissueName"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20" class="sj-form-group">
              <el-col :span="12">
                <el-form-item label="组织简称:">
                  <el-input v-model="tissue.tissueShort"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="sj-form-group">
              <el-col :span="12">
                <el-form-item label="行政上级">
                  <sj-select
                          data="tissueSource"
                          v-model="tissue.parentId"
                          :disable="false"
                          labelKey="tissueName"
                          valueKey="tissueId"
                  >
                  </sj-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="sj-form-group">
              <el-col :span="12">
                <el-form-item label="组织类型:">
                  <sj-dict-select
                          v-model="tissue.tissueType"
                          dictTypeCode="tissueType">
                  </sj-dict-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="sj-form-group">
              <el-col :span="12">
                <el-form-item label="组织排序:">
                  <el-input v-model="tissue.ordered"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-main>

      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button class="btnbg1" type="primary" @click="handleSave">保存</el-button>
        <el-button class="btnbg2" @click="closeFormDialog">取消</el-button>
      </div>
    </el-dialog>
    <!-- end 新增组织-->


  </basic-container>
</template>

<script>
  import {treeSource, tableSource} from '@/mock/tissue';
  import auth from '@/util/auth';
  import {Message, Error} from 'element-ui'
  import { mapGetters } from "vuex";

  export default {
    name: "Tissue",
    data() {
      return {
        // 左侧树
        treeData: [],
        treeProp: {
          label: 'tissueName',
          children: 'children'
        },
        selectedNode: {},

        // 新增
        formDialog: false,
        formTitle: '',
        uploadHeader: {Authorization: auth.getToken()},
        imageUrl: '',
        tissueSource: [],
        tissue: {},

        // 列表
        tableOption: {
          refresh: this.findPage,
          //是否有序号列
          index: true,
          columns: [{
            prop: 'tissueName',
            label: '组织名称'
          }, {
            prop: 'tissueShort',
            label: '组织简称'
          }, {
            prop: 'tissueCode',
            label: '组织代码'
          }, {
            prop: 'tissueTypeName',
            label: '组织类型'
          }, {
            prop: '_option',
            label: '操作',
            operation: [{
              label: '编辑',
              type: 'primary',
              func: this.showEditDialog
            },{
              label: '删除',
              type: 'dark',
              show: function (row) {
                return true;
              },
              func: this.handleDelete
            }]
          }],
          filters: {
            props:[{
              prop: 'tissueName',
              // label: '企业名称',
              labelWidth: '0px',
              type: 'input',
              placeholder: '请输入组织名称'
            }],
            // 控制 搜索和清空 按钮的显示与隐藏，如果不设置btns，则全显示。 btns为[]，则全不显示
            btns:['search', 'clear']
          },
          operateBtns: [{
            label: '新增',
            type: 'success',
            icon: 'el-icon-plus',
            func: this.showAddDialog,
            show: function () {
              return true;
            }
          }],
          pagination:{
            layout: "total, sizes, prev, pager, next, jumper"
          }
        },

        // 应用分配
        showAssignDialog: false,
        appList: [],
        assign: {
          tissueId: '',
          appIds: []
        }
      }
    },
    methods: {

      // 获取企业树
      findTissueTree(){

        this.treeData = elTreeData(treeSource);

        function elTreeData (list) {
          let temp = {};
          let ans = [];
          for (let i in list) {
            // console.log(list[i])
            temp[list[i].tissueId] = list[i];
          }
          for (let i in temp) {
            if (temp[i].parentId != -1 && temp[i].parentId && temp[i].parentId) {
              if (!temp[temp[i].parentId].children) {
                temp[temp[i].parentId].children = new Array();
              }
              temp[temp[i].parentId].children.push(temp[i]);
            } else {
              ans.push(temp[i]);
            }
          }
          return ans;
        }
      },

      handleNodeClick(data){

        this.selectedNode = data;
        this.$refs.tissueTable.findPage({tissueId: data.tissueId});
      },

      // 获取应用分页列表
      findPage(params) {
        let result = new Promise((resolve, reject) => {
          resolve(tableSource);
        })
        return result;
      },

      // 弹出新增企业窗口
      showAddDialog(row) {
        this.tissue = {};
        this.formTitle = '新增企业';
        this.formDialog = true;
      },

      // 弹出编辑企业窗口
      showEditDialog(row) {
        this.tissue = row;
        this.formTitle = '编辑企业';
        this.formDialog = true;
      },

      // 更新
      handleSave() {

        let tissueAPi = new TissueApi();
        tissueAPi.save(this.tissue).then(res=>{
          Message({showClose: true, message: res.message, type: 'info'});
          this.$refs.tissueTable.findPage({tissueId: this.selectedNode.tissueId});
          this.formDialog = false;
        });

      },

      closeFormDialog(){
        this.formDialog = false;
      },


      //删除组织
      handleDelete(row){
        let tissueAPi = new TissueApi();
        tissueAPi.delete(row.tissueId).then(res=>{
          Message({showClose: true, message: res.message, type: 'info'});
          this.$refs.tissueTable.findPage({tissueId: this.selectedNode.tissueId});
        });
      },

      closeAssignApp(){
        this.showAssignDialog = false;
      }

    },
    created: function () {
      this.findTissueTree();
    },
    computed: {
      ...mapGetters(["token"]),
      imageSrc: function() {
        if(this.tissue.logo){
          // return 'http://172.30.10.72:9004/file/preview?fileId=d3226fce87e349c49eb7b89ce9212416';
          return '/share-file/file/preview?fileId='+this.tissue.logo+'&token='+this.token;
        }
        return '/static/img/image-broken.png';
      }
    }
  }
</script>

<style>

  .sj-tree-container{
    width: 300px;
    margin-top: 5px;
    padding-top: 5px;

  }

  .sj-tree-content{

  }

  .sj-form-group{

  }

  /** 文件上传 ***/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }


  /*分组框*/

  .sj-fieldset {
    border: 1px solid #00142a;
    padding: 8px; width: 90%;
    margin: 0px auto;
    min-height: 120px;
    border-radius:5px;

  }

  .sj-legend {
    font: bold 12px Arial, Helvetica, sans-serif;
    color: #00142a;
    background-color: #FFFFFF;
  }

</style>

