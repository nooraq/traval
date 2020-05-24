<template>
    <div class="body">
      <div class="editor-wrapper">
        <div ref="editor" style="text-align:left" class="the-editor"></div>
        <p class="show-empty" v-if="titleEmpty">
          <span>*请将文章信息填写完整</span>
          <span class="warn-hide" @click="handleHide">收起提示</span>
        </p>
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
          <p class="submitTips">提交文章前请记录信息</p>
          <el-form ref="form" :model="form" class="demo-form-inline" :rules="rules">
            <el-form-item label="旅游地点" prop="location">
              <el-select v-model="form.location" placeholder="请选择旅游地点">
                <el-option v-for="(item,index) of allLocals" :label="item.value" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="sdate">
              <el-date-picker v-model="form.sdate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" style="width: 150px"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="edate">
              <el-date-picker v-model="form.edate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 150px"></el-date-picker>
            </el-form-item>
            <el-form-item label="文章状态" prop="public">
              <el-select v-model="form.public" placeholder="请选择公开或私密">
                <el-option label="公开" value=1 selected="selected"></el-option>
                <el-option label="私密" value=0 ></el-option>
              </el-select>
            </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交信息</el-button>
          </el-form-item> -->
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
      rules: {
        public: [
          { required: true, message: '请选择文章公开或私密', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请选择你的地点', trigger: 'change' }
        ],
        sdate: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        edate: [
          { required: true, message: '请选择结束日期', trigger: 'change' }
        ]
      },
      titleEmpty: false,
      formReady: false,
      title: '',
      showE: false
    };
  },
  computed: {
    ...mapState(['user', 'allLocals'])
  },
  methods: {
    handleHide() {
      this.titleEmpty = false;
    },
    async getContent() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formReady = true;
          // this.$message('form:');
        } else {
          return false;
        }
      });
      if (this.title === '' || this.editorContent === '') {
        this.titleEmpty = true;
      } else if (!this.formReady) {
        this.titleEmpty = true;
      } else {
        const params = this.form;
        params.public = parseInt(params.public, 10);
        params.userid = localStorage.userid;
        params.body = this.editorContent;
        params.title = this.title;
        const res = await postArticle(params);
        this.$message('文章提交成功！');
        this.$refs.form.resetFields();
        this.title = '';
        const articleId = res.id;
        // this.$router.push(`/#/articalShow/${articleId}`);
        this.$router.push(`/articalShow/${articleId}`);
      }
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
@import '@/theme/variable.scss';

.editor-wrapper {
  display: inline-block;
  width: 800px;
  margin-left: 60px;
  margin-top: 35px;
}
.the-editor {
  width: 800px;
  background-color: #fff;
}
.submitTips {
  font-size: 15px;
  text-align: center;
  margin-bottom: 20px;
}
.box-card {
  width: 330px;
  height: 330px;
  margin-top: 35px;
}
.set-msg {
  margin-left: 40px;
  display: inline-block;
  vertical-align: top;
}
.title-input {
  margin: 10px 0;
}
.show-empty {
  color: $--color-danger;
  font-size: 13px;
}
.warn-hide {
  color: $--color-primary;
  text-decoration: underline;
  padding: 3px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
