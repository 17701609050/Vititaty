<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <i-input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="22" type="ios-person"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="22" type="md-lock"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button :loading="buttonLoading" @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        buttonLoading: false,
        form: {
          username: '',
          password: ''
        },

        rules: {
          username: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      };
    },
    created() {
      this.$Loading.finish();
    },
    methods: {
      ...mapActions({
        login: 'admin/login'
      }),

      // 提交登录
      handleSubmit() {
        this.buttonLoading = true;
        // 表单验证
        var formLabel = this.$refs.loginForm;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }

          this.login(this.form).then(ret => {
            console.log(ret)
            if(ret.data.status==1){
              this.$ls.set('token', ret.data.token);
              // 跳转
              this.$Message.success("登录成功！");
              window.location.href = '/'
            }else{
              this.$Message.error(ret.data.error);
              this.buttonLoading = false;
            }
            
            

          }).catch(err => {
            this.buttonLoading = false
            if (err.status === 401 || err.status === 403) {
              this.$Message.error(err.data.msg || "登录失败！");
            }
          })
        })
      }
    }
  };
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }

  .login {
    width: 100%;
    height: 100%;
    background-image: url('../assets/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

  }

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .login-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }

  .form-con {
    padding: 10px 0 0;
  }

  .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
</style>

