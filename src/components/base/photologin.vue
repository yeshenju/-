<template>
  <div class="login">
    <div class="button" @click="$router.push('/recommend')" style="float: left">
      <span style="font-size: 16px" class="iconfont icon-arrow-left-bold"
        >返回</span
      >
    </div>
    <div class="button" @click="$router.push('/login')" style="float: right">
      <span style="font-size: 16px">短信登录</span>
    </div>
    <h1>欢迎登录</h1>
    <div class="form">
      <div class="item">
        <span class="iconfont icon-shoujihao"></span>
        <input type="text" placeholder="手机号码" v-model="phone" />
      </div>
      <div class="item">
        <span class="iconfont icon-verify"></span>
        <input type="text" placeholder="密码" v-model="password" />
      </div>
      <div class="item">
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import { getPhone } from "../../api/base";
// import {getCaptcha} from "../../api/base"
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    submit() {
      // 1.验证手机号
      let reg =
        /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      if (!reg.test(this.phone)) {
        Notify({ type: "warning", message: "请输入正确手机号码" });
        return;
      }

      getPhone({
        phone: this.phone,
        password: this.password,
      })
        .then((data) => {
          if (data.code == 200) {
            Notify({ type: "success", message: "登录成功" });
            window.localStorage.setItem("login", "true");
            window.localStorage.setItem("id", data.account.id);
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("cookie", data.cookie);
            // 个人中心判断是否登录
            this.$router.push("/userInfo");
            // 必须登录才能使用
            this.$router.push("/recommend");
          } else {
            Notify({ type: "danger", message: "登录失败" });
          }
        })
        .catch(function () {
          Notify({ type: "danger", message: "登录失败" });
        });
    },
  },
};
</script>

<style lang="less" >
.login {
  background-color: #d4473c;
  width: 100%;
  height: 100%;
  color: #fff;
  .button {
    margin: 10px;
  }
}
h1 {
  font-size: 48px;
  text-align: center;
  height: 48px;
  padding: 150px 0 40px 0;
}
.form {
  .item {
    width: 76%;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    background-color: #f47378;
    border-radius: 30px;
    margin-bottom: 12px;
    input {
      background-color: transparent;
      border: 0px;
      outline: none;
      text-indent: 0.5em;
      font-size: 14px;
      color: #fff;
    }
    span {
      font-size: 20px;
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }

    .submit {
      font-size: 15px;
      background-color: #fff;
      text-align: center;
      color: #d4473c;
      border-radius: 15px;
    }
  }
}
</style>