<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="10">
                <el-col :span="21">
                    server
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search"></el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10" style="padding: 10px 0">
                <el-col :span="21">
                    <el-button type="success"></el-button>
                </el-col>
            </el-row>


        </el-card>
    </div>
</template>

<script>
    export default {
        name: "server_address",
        data() {
            return {

            }
        },
        methods: {
            // 打开新增页面

        },
        created: function () {

        },
        computed: {

        }
    }
</script>

<style>

</style>

