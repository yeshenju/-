import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取mv视频
export function getMvList(params) {
    return request({
        url: '/mv/exclusive/rcmd',
        method: "get",
        params
    })
}

// 获取mv视频地址
export function getMvUrl(params) {
    return request({
        url: '/mv/url',
        method: "get",
        params
    })
}

// 获取 mv 数据
export function getmvDetail(params) {
    return request({
        url: '/mv/detail?mvid=' + params,
        method: "get",
    })
}

// 获取 mv 点赞 转发 评论数据
export function getmvDetailInfo(params) {
    return request({
        url: '/mv/detail/info?mvid=' + params,
        method: "get",
    })
}

// 获取推荐mv
export function getpersonalized() {
    return request({
        url: '/personalized/mv',
        method: "get",
    })
}

// 获取相似mv  /simi/mv?mvid=5436712
export function getsimiMv(params) {
    return request({
        url: '/simi/mv?mvid=' + params,
        method: "get",
        params
    })
}

//获取MV评论
export function getMvComment(params) {
    return request({
        url: '/comment/mv?id=' + params,
        method: "get",
    })
}

