const urlTypeMap = id => {
  const defaultMap = {
    course: [
      {
        type: 'courseDetails',
        label: '课程详情页',
        url: getShareEncodeUrl(`/course-details/${id}`)
      }
    ],
    seriesCourse: [
      {
        type: 'seriesCours',
        label: '系列课介绍页',
        url: getShareEncodeUrl(`/series-course/${id}`)
      }
    ],
    seriesLive: [
      {
        type: 'seriesLive',
        label: '系列直播介绍页',
        url: getShareEncodeUrl(`/series-live/${id}`)
      }
    ],
    live: [
      {
        type: 'liveIntroduce',
        label: '直播介绍页',
        url: getShareEncodeUrl(`/live-introduce/${id}`)
      }
    ]
  }

  return defaultMap
}

// 获取编码后的url
function getShareEncodeUrl(path) {
  return process.env.VUE_APP_H5_URL + path
}

export const getShareLinkMap = id => urlTypeMap(id)

export const getShareLinkDatas = (id, type) => getShareLinkMap(id)[type]
