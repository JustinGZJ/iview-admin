import axios from '@/libs/api.request'
// 获取所有站位的信息
export const get_all_stations_info = () => {
  return axios.request({
    url: `Stations`,
    method: 'GET'
  })
}
// 获取单站的信息
export const get_station_info = ({ id }) => {
  return axios.request({
    url: `Stations/${id}`,
    method: 'GET'
  })
}
// 设置单站的信息
export const set_station_info = ({ id, name, keys, metaData }) => {
  return axios.request({
    url: `Stations/${id}`,
    method: 'PUT',
    data: {
      name,
      keys,
      metaData
    }
  })
}

// 获取时间段内当前站的所有数据
export const get_station_data = ({ stationId, From, To, PageNumber, PageSize }) => {
  return axios.request({
    url: `stations/${stationId}/TestData/dynamic`,
    params: {
      From, To, PageNumber, PageSize
    },
    method: 'GET'
  })
}
// 上传测试数据
export const upload_test_data = ({ data }) => {
  let { stationId } = data
  return axios.request({
    url: `stations/${stationId}/TestData`,
    method: 'POST',
    data
  })
}

export const exportExcel = ({ stationId, From, To }) => {
  return axios.request({
    url: `stations/${stationId}/TestData/csv`,
    method: 'GET',
    params: {
      From, To
    },
    responseType: 'blob' // 下载文件
  })
}
