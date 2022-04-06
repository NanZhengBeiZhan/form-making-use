import request from '@/utils/axios'
/**
 * 上传base64格式的图片
 */
 export function uploadBase64Img(value) {
  return request({
    url: 'common/upload/base64img',
    method:'post',
    data: {
      base64: value
    }
  })
}