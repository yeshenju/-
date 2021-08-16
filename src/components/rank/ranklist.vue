<template>
  <div class="">
    <div class="topheader">
      <div class="img">
        <img :src="lists.coverImgUrl" alt="" />
      </div>
      <div class="title">
        {{ lists.name }}
      </div>
      <div class="button" @click="$router.push('/rank')">
        <span class="iconfont icon-arrow-left-bold"></span>
        排行榜
      </div>
      <div class="collect">
        <span class="iconfont icon-shoucang1" v-if="collectType" @click="shoucang"></span>
        <span
          class="iconfont icon-shoucang"
          v-if="!collectType"
          style="color: yellow"
          @click="shoucang"
        ></span>
        <!-- <span class="iconfont" :class="collectType ? 'icon-shoucang1' : 'icon-shoucang'"></span> -->
        <span>收藏</span>
      </div>
    </div>
    <dl class="musicList">
      <dt @click="playAll">
        <i class="iconfont icon-bofang"></i> 播放全部
        <span>(共{{ lists.tracks.length }}首)</span>
      </dt>
      <dd
        v-for="(item, index) in lists.tracks"
        :key="index"
        @click="setId(item.id)"
      >
        <h1>{{ index + 1 }}</h1>
        <div class="info">
          <h2>{{ item.name }}</h2>
          <h3>
            <span v-for="(key, index) in item.ar.slice(0, 6)" :key="index"
              >{{ key.name }}&nbsp;</span
            >
          </h3>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getPlaylistDetail} from "../../api/rank";
import {getSubscribe,getNoSubscribe} from "../../api/base";

export default {
  data() {
    return {
      collectType: true,
      lists: {
        tracks: [],
      },
    };
  },
  created() {
    getPlaylistDetail({ id: this.$route.query.id }).then((data) => {
      console.log(data);
      this.lists = data.playlist;
    });

  },
  methods: {

    shoucang() {
      this.collectType = !this.collectType;
      if(this.collectType == false){
          let id = this.$route.query.id
          let cookie =  window.localStorage.getItem("cookie")
          console.log(id,cookie);
          getSubscribe({id:id,cookie:cookie}).then((data)=>{
              console.log(data,"收藏成功");
          })
      }else if(this.collectType == true){
           let id = this.$route.query.id
          let cookie =  window.localStorage.getItem("cookie")
          console.log(id,cookie);
          getNoSubscribe({id:id,cookie:cookie}).then((data)=>{
              console.log(data,"取消收藏成功");
          })
      }
    },
    setId(id) {
      this.$emit("get-player-id", id);
    },
    playAll() {
      // 播放全部歌曲
      this.$emit("get-play-all-id", this.$route.query.id); //传递歌单id
      this.$emit("get-player-id", this.lists.tracks[0].id); //播放歌曲id。播放第一首
    },
  },
};
</script>

<style lang="less" scoped>
.topheader {
  position: relative;
  height: 270px;
  .img {
    background-color: aqua;
    width: 100%;
    height: 270px;
    position: relative;
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      width: 100%;
    }
  }
  .title {
    font-size: 18px;
    position: absolute;
    left: 18px;
    bottom: 18px;
    color: #fff;
  }
  .button {
    font-size: 18px;
    position: absolute;
    left: 12px;
    top: 12px;
    color: #fff;
  }
  .collect {
    font-size: 16px;
    position: absolute;
    top: 12px;
    right: 12px;
    color: #fff;
    span:nth-child(1){
        padding-right: 5px;
    }
  }
}
.musicList {
  background-color: #fff;
  width: 100%;
  border-radius: 7px;
  position: relative;
  top: -7px;
  dt {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    color: #454747;
    border-bottom: 1px solid #e3e3e3;
    span {
      font-size: 14px;
      color: #797b7a;
    }
    i {
      width: 44px;
      text-align: center;
      display: inline-block;
    }
  }
  dd {
    border-bottom: 1px solid #e3e3e3;
    height: 53px;
    display: flex;
    h1 {
      flex: 0 0 44px;
      line-height: 53px;
      text-align: center;
      font-size: 16px;
      color: #6d6e6e;
    }
    .info {
      flex: 1;
      h2 {
        font-size: 16px;
        color: #1b1c1c;
        margin-top: 10px;
      }
      h3 {
        font-size: 12px;
        color: #929393;
      }
    }
  }
}
</style>