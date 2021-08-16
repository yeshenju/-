<template>
  <div>
    <div class="mvComment">
      <div class="title">
           <!-- <router-link
          to="/player"
          tag="span"
          class="iconfont icon-arrow-left-bold"
        ></router-link -->

        <!-- <span @click="goBFun" -->
        <span
          class="iconfont icon-arrow-left-bold"
          @click="$router.push('/rank'),showplayer = true"
        ></span
        ><span>精彩评论</span>
      </div>
      <div class="commentMain">
        <ul>
          <li v-for="(item, index) in reviewsLists" :key="index">
            <div class="commentItem">
              <div class="img">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
            </div>

            <div class="commentUser">
              <span>{{ item.user.nickname }}</span>
              <span class="iconfont icon-dianzan1"></span>
              <span>{{ item.likedCount }}</span>
              <p>2020年12月11日</p>
            </div>
            <div class="commentText">
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getSongReviews } from "../../api/base.js";
export default {
  data() {
    return {
      id: "",
      reviewsLists: [],
    };
  },
  methods: {
    // 有问题
    // goBFun() {
    //   let id = this.$route.params.id;
    //   this.$router.push({ path: `/rank/ranklist?id=${id}` });
    // },
    getSongReviewsFun() {
      let id = this.$route.params.id;
      getSongReviews(id).then((data) => {
        this.reviewsLists = data.hotComments;
      });
    },
  },
  beforeMount() {
    this.getSongReviewsFun();
    // this.goBFun()
  },
};
</script>
<style lang="less">
.mvComment {
  width: 100%;
  background-color: #fff;
  bottom: 0px;
  overflow-y: scroll;
  .title {
    background-color: #d4473c;
    padding: 10px;
    color: white;
    span:nth-child(1) {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .commentMain {
    width: 100%;
    ul {
      width: 94%;
      margin: 0 auto;
      li {
        margin-top: 15px;
        border-bottom: 1px solid #bfbfbf49;
        .commentItem {
          .img {
            float: left;
            margin-left: 10px;
            margin-right: 10px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 40px;
            }
          }
        }
        .commentUser {
          height: 40px;
          position: relative;
          span:nth-child(1) {
            float: left;
          }
          span:nth-child(2) {
            float: right;
            padding-left: 10px;
            margin-right: 5px;
          }
          span:nth-child(3) {
            font-size: 14px;
            padding-top: 3px;
            float: right;
          }
          p {
            position: absolute;
            top: 23px;
            left: 60px;
            font-size: 14px;
            color: #b2b2b2;
          }
        }
        .commentText {
          margin-bottom: 10px;
          p {
            margin-top: 5px;
            margin-left: 60px;
            font-size: 14px;
          }
          div {
            float: right;
            width: 315px;
            height: 10px;
            border-bottom: 1px solid #e6e6e6;
          }
        }
      }
    }
  }
}
</style>