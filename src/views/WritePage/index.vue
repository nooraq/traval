<template>
    <div>
      <el-page-header @back="goBack" class="back-sign"></el-page-header>
      <div class="editor-wrapper">
        <div ref="editor" style="text-align:left" class="the-editor"></div>
        <el-button @click="getContent">提交文本</el-button>
      </div>
      <div class="set-msg">
        <el-card class="box-card">
          <el-form ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="旅游地点">
            <el-select v-model="form.local" placeholder="请选择旅游地点">
              <el-option v-for="(item,index) of allLocals" :label="item.value" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="form.timeStart" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="form.timeEnd" type="date" placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
        </el-card>
      </div>
      <div v-show="showE" class="show-e"><div v-html="editorContent"></div><el-button type="primary" @click="showE = false">收起</el-button></div>
    </div>
</template>

<script>
import E from 'wangeditor';
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
      allLocals: [
        { value: '北京' },
        { value: '天津市' },
        { value: '上海市' },
        { value: '重庆市' },
        { value: '河北' },
        { value: '河南' },
        { value: '云南' },
        { value: '辽宁' },
        { value: '黑龙江' },
        { value: '湖南' },
        { value: '安徽' },
        { value: '山东' },
        { value: '新疆' },
        { value: '江苏' },
        { value: '浙江' },
        { value: '江西' },
        { value: '湖北' },
        { value: '广西壮族自治区' },
        { value: '甘肃' },
        { value: '山西' },
        { value: '内蒙古自治区' },
        { value: '陕西' },
        { value: '吉林' },
        { value: '福建' },
        { value: '贵州' },
        { value: '广东' },
        { value: '青海' },
        { value: '西藏自治区' },
        { value: '四川' },
        { value: '宁夏回族自治区' },
        { value: '海南' },
        { value: '台湾' },
        { value: '香港特别行政区' },
        { value: '澳门特别行政区' }
      ],
      // 编辑器数据
      form: {
        content: {},
        local: '',
        timeStart: null,
        timeEnd: null
      },
      showE: false
    };
  },
  methods: {
    getContent() {
      alert(this.editorContent);
      this.showE = true;
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
      window.history.back()
    },
    onSubmit() {
      this.$message('form');
      console.log(this.form);
    }
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
.show-e {
  width: 900px;
  margin: 100px auto;
  background-color: #fff;
}
</style>
