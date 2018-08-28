<template>
  <div>
    <img v-if="src" :src="imageSrc" class="avatar"/>
    <img v-else-if="imageUrl" :src="imageUrl" class="avatar"/>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </div>
</template>

<script>

  import 'nprogress/nprogress.css' // progress bar style
  import SjColumnRender from "@/components/sj-table/sj-column-render";
  import StrUtil from "@/util/str";
  import FileApi from "@/api/file/FileApi";

  export default {
    name: 'SjImage',
    props: {
      src: String,
      fileId: String
    },
    data() {

    },
    created() {
      // this.preview();
    },
    methods: {
      preview(){
        if(StrUtil.isEmpty(this.src) && !StrUtil.isEmpty(this.fileId)){
          let fileApi = new FileApi();
          let params = {};
          params.fileId = this.fileId;
          fileApi.preview(params.fileId);
        }
      }
    },
    computed: {
      imageSrc: function() {
        return '/share-file/file/preview?fileId='+this.fileId;
      }
    },

    watch: {}
  }
</script>

<style lang="scss">
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
</style>
