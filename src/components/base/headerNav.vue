<template>
    <div>
        <div class="header">
           <div class="left iconfont icon-gengduo1" @click="$router.push('/userInfo')"></div>
           <div class="center">
             MUSIC-VUE
           </div>
           <div class="right iconfont icon-search" @click="$router.push('/search')"></div>
        </div>

        <div class="navs">
            <router-link to="/recommend" class="item"><span>推荐</span></router-link>
            <router-link to="/rank" class="item"><span>排行</span></router-link>
            <router-link to="/singer" class="item"><span>歌手</span></router-link>
            <router-link to="/newmv" class="item"><span>MV</span></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>

.header{
  height: 40px;
  display: flex;
  background-color: #D4473C;
  color:#fff;
  text-align: center;
  .left,.right{
    flex:0 0 40px;
    line-height: 40px;
  }
  .center{
    flex:1;
    line-height: 40px;
  }
}

.navs{
  height: 40px;
  display: flex;
  background-color: #D4473C;
  .item{
    flex:1;
    width: 33.33%;
    text-align: center;
    font-size: 15px;
    span{
      margin-top: 9px;
      display: inline-block;
      height: 21px;
      line-height: 21px;
      border-bottom: 1px solid transparent;
      color:#fff;
    }
    &.router-link-active span{
      font-weight: bold;
      border-color: #fff;
    }
  }
}

</style>