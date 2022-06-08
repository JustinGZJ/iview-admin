import axios from '@/libs/api.request'

export const set_station_info = msg_id => {
  return axios.request({
    url: `api/Stations/${msg_id}`,
    method: 'put',
    data: {
      msg_id
    }
  })
}
