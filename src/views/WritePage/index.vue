<template>
    <div>
      <el-page-header @back="goBack" class="back-sign"></el-page-header>
      <div class="editor-wrapper">
        <div ref="editor" style="text-align:left" class="the-editor"></div>
        <el-input
          v-model="title"
          placeholder="请输入你的文章标题"
          class="title-input"
          maxlength="20"
          suffix-icon="el-icon-edit"></el-input>
        <el-button @click="getContent">提交我的文章</el-button>
      </div>
      <div class="set-msg">
        <el-card class="box-card">
          <el-form ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="旅游地点">
            <el-select v-model="form.location" placeholder="请选择旅游地点">
              <el-option v-for="(item,index) of allLocals" :label="item.value" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="form.sdate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="form.edate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="文章状态">
            <el-select v-model="form.public" placeholder="请选择公开或私密">
              <el-option label="公开" value=1 selected="selected"></el-option>
              <el-option label="私密" value=0 ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        </el-card>
      </div>
    </div>
</template>

<script>
import E from 'wangeditor';
import { postArticle } from '@/api/demo';
import { mapState } from 'vuex';
import emoji from './emoji.json';

const MENUS = [
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'fontName', // 字体
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'link', // 插入链接
  'list', // 列表
  'justify', // 对齐方式
  'quote', // 引用
  'emoticon', // 表情
  'image', // 插入图片
  'table', // 表格
  'code', // 插入代码
  'undo', // 撤销
  'redo' // 重复
];

export default {
  name: 'editor',
  data() {
    return {
      editorContent: '',
      imgUrl: [],
      imgUploadAcount: 0,
      imgAllAcount: 0,
      // 编辑器数据
      form: {
        public: null,
        location: null,
        edate: '',
        sdate: ''
      },
      title: '',
      showE: false
    };
  },
  computed: {
    ...mapState(['user', 'allLocals'])
  },
  methods: {
    async getContent() {
      const params = this.form;
      params.public = parseInt(params.public, 10);
      params.userid = this.user.userid;
      params.body = this.editorContent;
      params.title = this.title;
      const res = await postArticle(params);
      console.log('res results:', res);
    },
    initialEditor() {
      const editor = new E(this.$refs.editor);
      editor.customConfig = {
        onchange: (html) => {
          this.editorContent = html;
        },
        uploadImgShowBase64: true,
        showLinkImg: false,
        emotions: [{
          type: 'image',
          content: emoji
        }],
        menus: MENUS
      };
      editor.create();
    },
    goBack() {
      window.history.back();
    },

  },
  mounted() {
    this.initialEditor();
  }
};
</script>

<style lang="scss" scoped>
.back-sign {
  margin: 10px 0 10px 40px;
  color: #f56c6c;
}
.editor-wrapper {
  display: inline-block;
  width: 800px;
  margin-left: 60px;
}
.the-editor {
  width: 800px;
  background-color: #fff;
}
.box-card {
  width: 330px;
  height: 330px;
}
.set-msg {
  margin-left: 40px;
  display: inline-block;
  vertical-align: top;
}
.title-input {
  margin: 10px 0;
}
</style>
