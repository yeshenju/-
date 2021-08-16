<template>
  <div id="app">
      <div class="main">

          <!-- 顶部组件 -->
          <header-nav v-if="$route.meta.headerNav"></header-nav>  

          <!-- 路由视图 -->
          <router-view 
            @get-player-id="getPlayerId"
            @get-play-all-id="getPlayAllId"
            ></router-view>

          <!-- 播放音乐 -->
          <player @get-player-id="getPlayerId" v-show="playerId" :player-id="playerId" :list-id="listId"></player>
        

      </div>
  </div>
</template>

<script>
import headerNav from "./components/base/headerNav.vue"
import player from "./components/base/player.vue"
  export default {
      data() {
        return {
          playerId:null,
          listId:null
        }
      },
      components:{
        headerNav,
        player
      },
      created(){
        console.log(this)
      },
      methods:{
        getPlayerId(id){
          console.log("歌曲id：",id);
          this.playerId = id;
        },
        getPlayAllId(id){
          this.listId = id;
        }
      }
  }
</script>

<style lang="less">
@import "./assets/css/base.css";

</style>