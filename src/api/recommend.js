import request from "./http";
// http://192.168.100.59:3000/banner?type=3

// 获取轮播图数据
export function getBanner(){
    return request({
        url:'/banner?type=3',
        method:"get"
    })
}

// 获取推荐歌单接口

export function getPersonalized(){
    return request({
        url:'/personalized?limit=9',
        method:"get"
    })
}

//获取最新歌曲
export function getNewsong() {
    return request({
        url: '/personalized/newsong',
        method: "get"
    })
}

