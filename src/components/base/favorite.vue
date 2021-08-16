<template>
  <div class="favorite">
    <div class="button1">
      <span
        style="font-size: 16px"
        class="iconfont icon-arrow-left-bold"
        @click="$router.push('/userInfo')"
        >返回</span
      >
    </div>
    <div class="favoritelist">
      <div class="content">
        <ul>
          <li v-for="(item, index) in playList" :key="index">
            <router-link
              :to="'/userfavoritelist?id=' + item.id"
              tag="div"
              class="con"
            >
              <div class="img">
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <div>
                <p>{{ item.name }}</p>
                <p><i class="iconfont icon-icon-"></i>{{ item.playCount }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> 
<script>
import { getuserPlaylist } from "../../api/base";
export default {
  data() {
    return {
      playList: "",
    };
  },
  methods: {
    getuserPlaylistFun() {
      let id = window.localStorage.id;
      getuserPlaylist({ uid: id }).then((data) => {
        console.log(data);
        this.playList = data.playlist;
        console.log(this.playList);
      });
    },
  },
  created() {
    this.getuserPlaylistFun();
  },
};
</script>
<style lang="less">
.favorite {
  .button1 {
    padding-left: 15px;
    background-color: #e8eae9;
    height: 40px;
    line-height: 40px;
  }
  .favoritelist {
    .content {
      ul {
        li {
          margin: 20px 0;
          .con {
            img {
              width: 80px;
              border-radius: 5px;
            }
            display: flex;
            div:nth-child(1) {
              margin: 0px 10px;
            }
            div:nth-child(2) {
              p:nth-child(1) {
                width: 275px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              p:nth-child(2) {
                margin-top: 40px;
              }
            }
          }
        }
      }
    }
  }
}
</style>