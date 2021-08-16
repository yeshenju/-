<template>
  <div>
    <div class="search">
      <div
        class="button iconfont icon-arrow-left-bold"
        @click="$router.push('/recommend')"
      ></div>
      <div class="search-input">
        <input
          id="inputcover"
          v-model="keyword"
          @input="getSearchFun(keyword),(isSearch = true)"
          placeholder="搜索歌曲、歌手、专辑"
        />
        <div class="cent">
          <span class="iconfont icon-search"></span>
        </div>
      </div>
    </div>

    <div class="m-default">
      <h3 class="titl">热门搜索</h3>
      <ul class="pile">
        <li class="plnd" v-for="(item, index) in Hot" :key="index" >  
          <p>
            <span>{{ item.first }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="search-content" v-if="isSearch">
      <ul>
        <li v-for="(item, index) in searchLists" :key="index" @click="setId(item.id)">
          <span>{{item.name}}</span>
          <span>{{item.artists[0].name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSearchHot, getSearch } from "../../api/base.js";

export default {
  data() {
    return {
      searchLists:[],
      Hotlist: [],
      Hot: [],
      isSearch: false,
      keyword: "",
      id: null,
      
    };
  },
  methods: {
    getSearchFun(keywords) {
      getSearch({ keywords }).then((data) => {
        if (data.code == 200) {
          this.searchLists = data.result.songs;
        }
      });
    },
    setId(id) {
      this.$emit("get-player-id", id);
    },
  },
  created() {
    this.getSearchFun();
    getSearchHot().then((data) => {
      this.Hotlist = data.result;
      this.Hot = this.Hotlist.hots;
    });
  },
  setId(id) {
      this.$emit("get-player-id", id);
    },
};
</script>

<style lang="less" scoped>
.search {
  height: 50px;
  position: relative;
  border-bottom: 1px solid #eee;
  display: flex;
  .button {
    margin: 10px 0px 0px 10px;
    font-size: 26px;
    color: #b2b2b2;
  }
  .search-input {
    width: 355px;
    height: 30px;
    color: #333;
    font-size: 14px;
    margin-top: 10px;
    .cent {
      position: absolute;
      top: 15px;
      left: 55px;
      label {
        pointer-events: none;
      }
    }
    #inputcover {
      height: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #ebecec;
      border-radius: 30px;
      width: 315px;
      display: block;
      margin-left: 10px;
      border: solid 1px #ebecec;
    }
  }
}

.m-default {
  height: 157px;
  .titl {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    margin-top: 12px;
    margin-left: 10px;
  }
  .pile {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 10px;
    .plnd {
      p {
        display: inline-block;
        border: 1px solid #333;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 30px;
        margin: 5px 5px;
        span {
          margin: 0px 10px;
        }
      }
    }
  }
}
.search-content {
  position: absolute;
  top: 52px;
  width: 100%;
}

.search-content ul li {
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}

.search-content ul li span {
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-content ul li span:nth-child(2) {
  font-size: 6px;
  color: rgba(150, 150, 150, 1);
}
</style>