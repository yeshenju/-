import request from "./http";

// 通过id 获取歌曲url
// /song/url?id=1854142292
export function getSongUrl(params){
    return request({
        url:'/song/url',
        method:"get",
        params
    })
}
// 通过id 获取歌曲详情
// /song/detail?ids=1854142292
export function getSongDetail(params){
    return request({
        url:'/song/detail',
        method:"get",
        params
    })
}
// 通过id 获取歌曲评论
export function getSongReviews(params){
    return request({
        url:'/comment/music?id='+params,
        method:"get",
        params
    })
}


// 通过id 获取歌词
// http://localhost:3000/lyric?id=33894312
export function getLyric(params){
    return request({
        url:'/lyric',
        method:"get",
        params
    })
}
// 获取用户信息
export function getuserdetail(id) {
    return request({
        url: '/user/detail?uid=' + id,
        method: "get",
    })
}

// 通过id 手机验证码
export function getCaptcha(params){
    return request({
        url:'/captcha/sent',
        method:"get",
        params
    })
}

// 通过id 手机验证码验证
export function getCaptchaVerify(params){
    return request({
        url:'/captcha/verify',
        method:"get",
        params
    })
}
// 账号密码登录
export function getPhone(params) {
    return request({
        url: '/login/cellphone',
        method: "get",
        params
    })
}

// 查看登录状态
export function getLogout() {
    return request({
        url: '/logout',
        method: "get",
    })
}

// 获取用户歌单
export function getuserPlaylist(params) {
    return request({
        url: '/user/playlist',
        method: "get",
        params
    })
}

// 收藏/取消收藏歌单
export function getSubscribe(params) {
    return request({
        url: '/playlist/subscribe?t=1',
        method: "get",
        params
    })
}
// 取消收藏歌单
export function getNoSubscribe(params) {
    return request({
        url: '/playlist/subscribe?t=2',
        method: "get",
        params
    })
}

// 通过关键词搜索该音乐
export function getSearch(params){
    return request({
        url:'/search',
        method:"get",
        params
    })
}

// 热搜列表
export function getSearchHot(params){
    return request({
        url:'/search/hot',
        method:"get",
        params
    })
}
