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
// 获取当前站的所有数据
export const get_station_data = ({ stationId }) => {
  return axios.request({
    url: `stations/${stationId}/TestData`,
    method: 'GET'
  })
}

// 获取时间段内当前站的所有数据
export const get_station_data_by_timespan = ({ stationId, begin, end }) => {
  return axios.request({
    url: `stations/${stationId}/TestData/${begin}/${end}`,
    method: 'GET'
  })
}
// 上传测试数据
export const upload_test_data = ({ data }) => {
  let stationId = data.stationId
  return axios.request({
    url: `stations/${stationId}/TestData`,
    method: 'POST',
    data
  })
}

// {
//   "id": "232fdb5e-ae6f-1738-7b04-e85cfdd53765",
//   "dateTime": "1969-06-05T03:15:46.870Z",
//   "code": "nostrud laboris esse",
//   "metaData": "proident culpa sint reprehenderit sed",
//   "stationId": "6551b011-1c32-ff87-0383-a5a21ea9fd34",
//   "testItems": [
//   {
//     "name": "culpa dolore aute eu",
//     "value": "et amet ipsum"
//   },
//   {
//     "name": "consectetur in nulla",
//     "value": "elit ut incididunt"
//   }
// ]
// }
