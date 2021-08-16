<template>
    <div>
        <div class="guidePage">
              <!-- Swiper -->
            <div class="swiper-container guidePage-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="guidePageslide">
                            <img src="../../assets/logo.png" alt="">
                            <h3>渐进式javascript框架</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="guidePageslide">
                            <img src="../../assets/logo.png" alt="">
                            <h3>渐进式javascript框架</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="guidePageslide">
                            <img src="../../assets/logo.png" alt="">
                            <h3>渐进式javascript框架</h3>
                            
                            <van-button type="primary" @click="gogo" size="mini">进入首页</van-button>
                        </div>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination guidePage-pagination"></div>
            </div>
        </div>
    </div>
</template>

<script>
    // https://www.swiper.com.cn/
    // $cnpm install swiper@5.3.6 -S
    import Swiper from "swiper";
    export default {
        mounted(){
            new Swiper('.guidePage-container', {
                pagination: {
                    el: '.guidePage-pagination',
                },
            });
        },
        methods: {
            gogo(){
                this.$router.push("/");
                window.localStorage.setItem("guidePage",true);
            }
        },
    }
</script>

<style lang="less" >

    .swiper-container {
        position: fixed !important; 
        top:0px;
        left:0px;
      width: 100%;
      height: 100%;
    }

    .guidePageslide{
        text-align: center;
        img{
            margin:0 auto;
            width: 120px;
            height: 120px;
            margin-top: 200px;
        }
        h3{
            color:#595959;
        }

    }
</style>