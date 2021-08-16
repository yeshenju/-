<template>
  <div>
    <!-- 播放器 -->
    <div class="player" v-if="showplayer">
      <div class="button" @click="showplayer = false">
        <span class="iconfont icon-arrow_down"></span>
      </div>
      <div class="title">
        <h2>{{ SongDetail.name }}</h2>
        <h3>
          <span v-for="(key, index) in SongDetail.ar" :key="index"
            >{{ key.name }}&nbsp;</span
          >
        </h3>
      </div>
      <div class="content">
        <div
          v-show="togglelyric == true"
          @click="togglelyric = false"
          :class="['img', 'play', { pause: iconplay }]"
        >
          <img :src="SongDetail.al.picUrl" alt="" />
        </div>
        <div
          v-show="togglelyric != true"
          @click="togglelyric = true"
          class="lyrics"
        >
          <ul :style="{ top: lyricTop }">
            <li
              :class="{ con: currentRow == index }"
              v-for="(item, index) in lyric"
              :key="index"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
      <div class="range">
        <div class="icon-list">
          <span
            class="iconfont icon-aixin"
            v-if="iconaixin"
            @click="Click"
          ></span>
          <span
            class="iconfont icon-aixin1"
            v-if="!iconaixin"
            @click="Click"
            style="color: red"
          ></span>
          <span class="iconfont icon-xiazai"></span>
          <span class="iconfont icon-MV"></span>
          <span class="iconfont icon-buoumaotubiao48" @click="goToFun"></span>
          <span class="iconfont icon-gengduo2"></span>
        </div>
        <div class="bar">
          <span class="timeLeft">{{ timeLeft | playerTime }}</span>
          <van-slider
            v-model="value"
            bar-height="4px"
            @input="lyricInput"
            @change="sliderchange"
            active-color="#ee0a24"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span class="timeRight">{{ timeRight | playerTime }}</span>
        </div>
      </div>

      <div class="buttons">
        <div
          v-if="playerType == 1"
          class="iconfont icon-xunhuan1"
          @click="changeMode"
        ></div>
        <div v-else class="iconfont icon-random" @click="changeMode"></div>
        <div @click="startup" class="iconfont icon-047caozuo_shangyishou"></div>
        <div
          :class="[
            'iconfont',
            iconplay ? 'icon-bofang' : 'icon-zanting1',
            'center',
          ]"
          @click.stop="toggleplay"
        ></div>
        <div @click="lowerFun" class="iconfont icon-048caozuo_xiayishou"></div>
        <div
          class="iconfont icon-gengduo-2"
          @click="isMusicPlayList = true"
        ></div>
      </div>
      <!-- 播放器内部音乐播放列表 -->
      <div class="musicPlayList" v-if="isMusicPlayList">
        <div class="dt">
          <h1>
            <i class="iconfont icon-xunhuan1"></i>顺序播放({{
              playerLists.length
            }})
          </h1>
          <span class="iconfont icon-shanchu1"></span>
        </div>
        <dl>
          <dd
            v-for="(item, index) in playerLists"
            :key="index"
            @click="editPlayerId(item.id)"
          >
            <p>
              <i v-if="item.id == playerId" class="iconfont icon-laba"></i
              >{{ item.name }}
            </p>
            <span class="iconfont icon-iconshanchu"></span>
          </dd>
        </dl>
        <div class="butt" @click="isMusicPlayList = false">关闭</div>
      </div>
    </div>

    <!-- 迷你播放器 -->
    <div class="mini-player">
      <div
        :class="['img', 'play', { pause: iconplay }]"
        @click="showplayer = true"
      >
        <img :src="SongDetail.al.picUrl" alt="" />
      </div>
      <div class="text">
        <h2>{{ SongDetail.name }}</h2>
        <h3>
          <span v-for="(key, index) in SongDetail.ar" :key="index"
            >{{ key.name }}&nbsp;</span
          >
        </h3>
      </div>
      <div class="control" @click.stop="toggleplay">
        <span class="iconfont icon-bofang" v-show="iconplay"></span>
        <span class="iconfont icon-zanting1" v-show="!iconplay"></span>
      </div>
      <div class="lists" @click="isMusicPlayList = true">
        <span class="iconfont icon-gengduo-2" style="font-size: 28px; margin-top: 10px;"></span>
      </div>
    </div>

    <!-- 音乐播放列表 -->
    <div class="musicPlayList" v-if="isMusicPlayList">
      <div class="dt">
        <h1>
          <i class="iconfont icon-xunhuan1"></i>顺序播放({{
            playerLists.length
          }})
        </h1>
        <span class="iconfont icon-shanchu1"></span>
      </div>
      <dl>
        <dd
          v-for="(item, index) in playerLists"
          :key="index"
          @click="editPlayerId(item.id)"
        >
          <p>
            <i v-if="item.id == playerId" class="iconfont icon-laba"></i
            >{{ item.name }}
          </p>
          <span class="iconfont icon-iconshanchu"></span>
        </dd>
      </dl>
      <div class="button" @click="isMusicPlayList = false">关闭</div>
    </div>
    <!-- onloadeddataNew	script	当加载媒介数据时运行脚本 -->
    <!-- onendedNew	script	当媒介已抵达结尾时运行脚本 -->
    <audio
      ref="audio"
      controls
      :src="musicData"
      @ended="endedFun"
      @loadeddata="canplayFun"
      style="display: none"
    ></audio>
  </div>
</template>

<script>
import { getSongUrl, getSongDetail, getLyric } from "../../api/base.js";
import { getPlaylistDetail } from "../../api/rank";
export default {
  props: ["playerId", "listId"],
  data() {
    return {
      showplayer: false, //隐藏播放器
      iconplay: true, //暂停
      iconaixin: true,
      SongDetail: {
        //播放音乐对象
        al: {
          picUrl: null,
        },
      },
      musicData: null,
      value: 0,
      timeLeft: 0,
      timeRight: 0,
      clearset: null, //定时器
      playerLists: [], //播放列表
      isMusicPlayList: false,
      playerType: 1, //播放类型 1列表播放 2 随机播放
      togglelyric: true,
      lyric: [], //歌词
      lyricTop: "210px",
      currentRow: 0, //歌词高亮
    };
  },
  methods: {
    goToFun() {
      let id= this.playerId
        this.$router.push({ path: `/songReviews/${id}` });
        this.showplayer = false
    },
    // 播放歌曲地址
    getSongUrlFun() {
      getSongUrl({ id: this.playerId }).then((data) => {
        this.musicData = data.data[0].url;
      });
    },
    // 歌曲信息
    getSongDetailFun() {
      getSongDetail({ ids: this.playerId }).then((data) => {
        this.SongDetail = data.songs[0];

        // 判断播放列表是否有相同数据
        let index = this.playerLists.findIndex(
          (item) => item.id == data.songs[0].id
        );
        if (index == "-1") {
          //数据找不到，数据添加播放列表里面
          this.playerLists.push(this.SongDetail);
        }
      });
    },
    // 调用接口获取歌词
    getLyricFun() {
      getLyric({ id: this.playerId }).then((data) => {
        this.formatLyric(data.lrc.lyric);
      });
    },
    // 处理歌词结构
    formatLyric(text) {
      this.lyric = [];
      let arr = text.split("\n"); //把原歌曲字符串转歌词
      let row = arr.length; //获取数组长度
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //获取数据"[00:00.000] 作词 : 陈镇川"
        let temp_arr = temp_row.split("]"); //分成两个数组
        let lyrictext = temp_arr.pop(); //删除数组最后一个，返回数据

        temp_arr.forEach((element) => {
          let obj = {};
          // "[00:21.45" =>00:21.45
          let time_arr = element.substr(1, element.length - 1).split(":");
          let s = time_arr[0] * 60 + Math.ceil(time_arr[1]); //得到当前秒数
          obj.text = lyrictext;
          obj.time = s;
          if (lyrictext.length > 0) {
            this.lyric.push(obj); //每一行处理好数据放入数组中
          }
        });
      }
    },
    toggleplay() {
      if (this.iconplay) {
        this.$refs.audio.play(); //播放

        clearInterval(this.clearset);
        this.clearset = setInterval(() => {
          let currentTime = this.$refs.audio.currentTime; //实时变化时间
          let duration = this.$refs.audio.duration; //歌总时间
          this.timeLeft = currentTime; //秒
          // 计算滚动条效果
          this.value = (currentTime / duration) * 100;
          if (this.value == 100) {
            clearInterval(this.clearset);
            this.$refs.audio.pause();
            this.iconplay = true;
          }
        }, 999);
      } else {
        this.$refs.audio.pause(); //暂停
        clearInterval(this.clearset);
      }
      this.iconplay = !this.iconplay; //切换按钮
    },
    Click() {
      this.iconaixin = !this.iconaixin;
    },
    // 音乐播放结束后
    endedFun() {
      this.iconplay = true;
      clearInterval(this.clearset); //结束播放
      if (this.playerType == 1) {
        //列表播放
        this.lowerFun(); //下一首歌
      } else {
        //随机播放
        let index = parseInt(Math.random() * this.playerLists.length);
        this.$emit("get-player-id", this.playerLists[index].id); //修改父组件值
      }
    },
    // 音乐播放器数据加载完，直接获取歌曲时间
    canplayFun() {
      this.toggleplay(); //播放
      let duration = this.$refs.audio.duration; //歌总时间
      this.timeRight = duration;
    },
    // 获取滚动条变化
    sliderchange() {
      let duration = (this.$refs.audio.duration * this.value) / 100;
      this.timeLeft = duration; //修改页面数据
      this.$refs.audio.currentTime = duration; //修改播放器时间
    },
    // 实时动态显示歌词变化
    lyricInput() {
      let duration = parseInt((this.$refs.audio.duration * this.value) / 100);
      for (let i = 0; i < this.lyric.length; i++) {
        if (duration == this.lyric[i].time) {
          this.lyricTop = 210 - i * 36 + "px";
          this.currentRow = i; //歌词高亮
          break;
        }
      }
    },
    editPlayerId(id) {
      this.$emit("get-player-id", id);
    },
    // 下一首歌
    lowerFun() {
      let { id } = this.SongDetail; //获取id
      // 获取再播放列表中下标
      let index = this.playerLists.findIndex((item) => item.id == id);
      // 1.让自加一下标，判断是否为最后一首歌，最后一首歌，显示第一首歌播放
      index = index + 1 > this.playerLists.length - 1 ? 0 : index + 1;
      // this.SongDetail = this.playerLists[index];
      this.$emit("get-player-id", this.playerLists[index].id); //修改父组件值
    },
    // 上一首歌
    startup() {
      let { id } = this.SongDetail; //获取id
      // 获取再播放列表中下标
      let index = this.playerLists.findIndex((item) => item.id == id);
      // 让自减一，判断是否为第一首歌，上一首歌为歌曲最后一首歌。
      index = index - 1 < 0 ? this.playerLists.length - 1 : index - 1;
      this.$emit("get-player-id", this.playerLists[index].id); //修改父组件值
    },
    // 修改播放类型
    changeMode() {
      this.playerType = this.playerType == 1 ? 2 : 1;
    },
  },
  watch: {
    playerId() {
      this.getSongUrlFun();
      this.getSongDetailFun();
      this.getLyricFun();
    },
    listId() {
      getPlaylistDetail({ id: this.listId }).then((data) => {
        this.playerLists = data.playlist.tracks; //获取歌单数据
      });
    },
    timeLeft() {
      for (let i = 0; i < this.lyric.length; i++) {
        if (parseInt(this.timeLeft) == this.lyric[i].time) {
          this.lyricTop = 210 - i * 36 + "px";
          this.currentRow = i; //歌词高亮
          break;
        }
      }
    },
  },
  filters: {
    playerTime(data) {
      let m = parseInt(data / 60); // 分钟
      let s = parseInt(data % 60); // 秒
      if (m == 0 && s == 0) {
        return "0:00";
      } else {
        return m + ":" + (s < 10 ? "0" + s : s);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.musicPlayList {
  background-color: #fff;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 850;
  width: 100%;
  height: 310px;
  border-radius: 5px 5px 0 0;

  .dt {
    margin-top: 12px;
    height: 28px;
    line-height: 28px;
    position: relative;
    h1 {
      font-size: 16px;
      text-indent: 18px;
      i {
        font-size: 18px;
        margin-right: 8px;
      }
    }
    span.iconfont {
      display: inline-block;
      position: absolute;
      top: 2px;
      right: 25px;
      font-size: 18px;
    }
  }
  dl {
    height: 222px;
    overflow-y: scroll;
    dd {
      text-indent: 18px;
      font-size: 14px;
      height: 37px;
      line-height: 37px;
      position: relative;
      p {
        i {
          margin-right: 8px;
          color: red;
        }
        width: 80%;
        height: 37px;
        overflow: hidden;
      }
      span.iconfont {
        display: inline-block;
        position: absolute;
        top: 2px;
        right: 25px;
        font-size: 18px;
        color: red;
      }
    }
  }
  .button {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 16px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
  }
}

.player {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #817c7a;
  z-index: 900;
  .button {
    position: absolute;
    width: 20px;
    font-weight: bold;
    top: 14px;
    left: 14px;
    .iconfont {
      font-size: 20px;
      color: #fff;
    }
  }
  .title {
    text-align: center;
    color: #fff;
    h2 {
      font-size: 16px;
      margin-top: 10px;
    }
    h3 {
      font-size: 12px;
    }
  }
  .content {
    margin-top: 10px;
    height: 435px;
    width: 100%;
    position: relative;
    .img {
      width: 275px;
      height: 275px;
      border: 12px solid #96908d;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      border-radius: 50%;
      img {
        width: 100%;
        border-radius: 50%;
      }
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
    }
    .lyrics {
      width: 100%;
      height: 390px;
      position: relative;
      overflow: hidden;
      margin-top: 30px;
      ul {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 210px;
        left: 0px;
        li {
          height: 36px;
          line-height: 36px;
          color: #cbcccc;
          font-size: 16px;
          &.con {
            color: #fff;
          }
        }
      }
    }
  }
  .range {
    position: absolute;
    bottom: 155px;
    text-align: center;
    height: 20px;
    width: 100%;
    .icon-list {
      margin-bottom: 30px;
      .iconfont {
        width: 100%;
        height: auto;
        color: white;
        font-size: 24px;
        padding: 0px 16px;
      }
    }
    .bar {
      width: 246px;
      margin: 0 auto;
      color: #fff;
      position: relative;
      font-size: 12px;
      .timeLeft {
        position: absolute;
        left: -36px;
        top: -4px;
      }
      .timeRight {
        position: absolute;
        right: -36px;
        top: -4px;
      }
    }
  }
  .buttons {
    display: flex;
    position: absolute;
    bottom: 40px;
    width: 100%;
    .iconfont {
      flex: 1;
      width: 20%;
      text-align: center;
      font-size: 24px;
      line-height: 38px;
      color: #fff;
      &.center {
        font-size: 38px;
      }
    }
  }
  .musicPlayList {
    .butt {
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
    }
  }
}

.mini-player {
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 48px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 0px 4px 0px #bfbfbf;
  display: flex;
  z-index: 800;
  .img {
    flex: 0 0 55px;
    text-align: center;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin: 6px auto;
    }
    &.play {
      animation: rotate 20s linear infinite;
    }
    &.pause {
      animation-play-state: paused;
    }
  }
  .text {
    flex: 1;
    h2 {
      font-size: 16px;
      color: #1b1c1c;
      margin-top: 5px;
    }
    h3 {
      font-size: 12px;
      color: #929393;
    }
  }
  .control {
    flex: 0 0 36px;
    .iconfont {
      font-size: 29px;
      color: #474848;
      margin-top: 10px;
      display: inline-block;
    }
  }
  .lists {
    flex: 0 0 36px;
    .iconfont {
      font-size: 36px;
      color: #474848;
      margin-top: 5px;
      display: inline-block;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.custom-button {
  width: 6px;
  height: 6px;
  border: 5px solid #fff;
  background-color: #ee0a24;
  border-radius: 50%;
}
</style>