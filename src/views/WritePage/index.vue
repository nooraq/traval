<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <el-button @click="getContent">默认按钮</el-button>
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
      imgAllAcount: 0
    };
  },
  methods: {
    getContent() {
      alert(this.editorContent);
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
    }
  },
  mounted() {
    this.initialEditor();
  }
};
</script>

<style lang="scss" scoped>
</style>
