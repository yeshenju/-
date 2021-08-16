<template>
  <div>
    <div class="mvDetails">
      <div class="mV">
        <router-link
          to="/newmv"
          tag="span"
          class="iconfont icon-arrow-left-bold"
          style="font-size: 18px"
        ></router-link>
        <video
          controls
          :src="http"
          :ref="'video'"
          @loadeddata="loadeddataFun"
        ></video>
      </div>

      <div class="details">
        <h3>{{ data.name }}</h3>
        <p>相关人物:{{ data.artistName }}</p>
        <p>
          <span>发布时间: {{ data.publishTime }}</span>
        </p>
        <p>
          <span class="iconfont icon-zanting">{{ playCount }}</span>
          <span class="iconfont icon-dianzan1">{{
            detailInfo.likedCount
          }}</span>
          <span class="iconfont icon-shoucang1">{{
            detailInfo.shareCount
          }}</span>
        </p>
      </div>
      <div class="navs">
        <span class="item" @click="modeType = false">
          <span
            class="iconfont icon-buoumaotubiao48"
            style="margin-right: 5px"
          ></span
          >精彩评论({{ detailInfo.commentCount }})</span
        >
        <span class="item" @click="modeType = true" style="border-left: 1px solid #ffffff;"
          ><span class="iconfont icon-MV" style="margin-right: 5px;"></span
          >相关推荐</span
        >
      </div>
      <!-- 相关推荐 -->
      <div class="correlation" v-if="modeType">
        <ul class="tj">
          <li v-for="(item, index) in mvs" :key="index" @click="goTo(item.id)">
            <div class="img">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-shexiangji">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 评论 -->
      <div class="mvComment" v-if="!modeType">
        <div class="commentMain">
          <ul>
            <li v-for="(item, index) in comments" :key="index">
              <div class="commentItem">
                <div class="img">
                  <img :src="item.avatarUrl" alt="" />
                </div>
              </div>

              <div class="commentUser">
                <span>{{ item.nickname }}</span>
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
  </div>
</template>
<script>
import {
  getMvUrl,
  getmvDetail,
  getsimiMv,
  getmvDetailInfo,
  getMvComment,
} from "../../api/mv";
export default {
  data() {
    return {
      id: "",
      http: "",
      data: "",
      playCount: "",
      mvs: "",
      comments: "",
      detailInfo: "",
      modeType: false,
    };
  },
  methods: {
    getUrl() {
      let id = this.id;
      console.log(id);
      getMvUrl({ id }).then((data) => {
        this.http = data.data.url;
      });
    },
    getDetailInfo() {
      let id = this.id;
      getmvDetailInfo(id).then((data) => {
        this.detailInfo = data;
        console.log(this.detailInfo);
      });
    },
    // MV数据
    getmvDatailFun() {
      let id = this.id;
      console.log(id);
      getmvDetail(id).then((data) => {
        this.data = data.data;
        console.log(data);

        if (data.data.playCount >= 10000) {
          this.playCount = Math.floor(data.data.playCount / 10000) + "万";
        }
      });
    },
    getsimiMvFun() {
      let id = this.id;
      getsimiMv(id).then((data) => {
        this.mvs = data.mvs;
        console.log(this.mvs);
      });
    },
    loadeddataFun(event) {
      event.target.play();
    },
    goTo(id) {
      getMvUrl({ id }).then((data) => {
        this.http = data.data.url;
      });
      getmvDetailInfo(id).then((data) => {
        this.detailInfo = data;
      });
      getmvDetail(id).then((data) => {
        this.data = data.data;

        if (data.data.playCount >= 10000) {
          this.playCount = Math.floor(data.data.playCount / 10000) + "万";
        }
      });
      getMvComment(id).then((data) => {
        console.log(data);
        this.comments = data;
        // console.log(this.comments.comments[0].user.avatarUrl);
        let res = this.comments.comments.map((item) => {
          return {
            likedCount: item.likedCount,
            content: item.content,
            nickname: item.user.nickname,
            avatarUrl: item.user.avatarUrl,
          };
        });
        this.comments = res;
        console.log(res);
      });
    },
    getMvCommentFun() {
      let id = this.id;
      getMvComment(id).then((data) => {
        this.comments = data;
        let res = this.comments.comments.map((item) => {
          return {
            likedCount: item.likedCount,
            content: item.content,
            nickname: item.user.nickname,
            avatarUrl: item.user.avatarUrl,
          };
        });
        this.comments = res;
        console.log(res);
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  beforeMount() {
    this.getUrl();
    this.getmvDatailFun();
    this.getsimiMvFun();
    this.getMvCommentFun();
    this.getDetailInfo();
  },
};
</script>
<style lang="less">
.mvDetails {
  width: 100%;
  .mV {
    span {
      position: absolute;
      color: white;
      top: 5px;
      left: 15px;
      z-index: 1000;
    }
    video {
      width: 100%;
      display: block;
    }
  }
  .details {
    h3 {
      margin: 10px;
    }

    p:nth-child(2) {
      margin: 10px;
      font-size: 14px;
      color: #8888ff;
    }
    p:nth-child(3) {
      margin: 10px;
      font-size: 14px;
      color: #b2b2b2;
      span {
        margin-right: 10px;
      }
    }
    p:nth-child(4) {
      margin: 10px;
      color: #b2b2b2;
      span {
        margin-right: 10px;
        font-size: 14px;
      }
    }
  }
  .mvComment {
    width: 100%;
    height: 400px;
    background-color: #fff;
    bottom: 0px;
    overflow-y: scroll;
    .title {
      margin: 10px;
    }
    .iconfont {
      padding-left: 10px;
    }
    .commentMain {
      ul {
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
              font-weight: bold;
            }
            span:nth-child(2) {
              float: right;
              margin-right: 5px;
            }
            span:nth-child(3) {
              font-size: 14px;
              padding-top: 3px;
              float: right;
            }
            p {
              position: absolute;
              top: 20px;
              left: 60px;
              font-size: 14px;
              color: #b2b2b2;
            }
          }
          .commentText {
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
  .navs {
    height: 40px;
    display: flex;
    background-color: #808080;
    margin-top: 10px;
    .item {
      flex: 1;
      width: 33.33%;
      text-align: center;
      font-size: 15px;
      margin-top: 9px;
      display: inline-block;
      height: 21px;
      line-height: 21px;
      border-bottom: 1px solid transparent;
      color: #fff;
    }
  }
  .correlation {
    .tj {
      display: flex;
      flex-wrap: wrap;
      height: 240px;
      overflow: hidden;
      li {
        .img {
          position: relative;
          margin-left: 10px;
          img {
            width: 175px;
            border-radius: 5px;
          }
          span {
            color: white;
            position: absolute;
            font-size: 12px;
            top: 0px;
            left: 2px;
          }
        }
        margin: 10px 0px;

        div:nth-child(2) {
          p:nth-child(1) {
            font-size: 14px;
            margin-left: 10px;
          }
          p:nth-child(2) {
            font-size: 12px;
            color: #b2b2b2;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>