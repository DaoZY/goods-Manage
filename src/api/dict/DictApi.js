import http from '@/util/http'

class  DictApi {
// MOCK_PREFIX = '/mock/95';
  MOCK_PREFIX = '';

  // 通过字典类型获取列表
  getDictListByTypeCode(params) {
    var url = this.MOCK_PREFIX + '/sedinbj-system/dict/getDictListByTypeCode';
    return http.post(url, params);
  }
}

export default DictApi
