import {
  get_all_stations_info,
  // get_station_info,
  // set_station_info,
  // get_station_data,
  get_station_data_by_timespan
  // upload_test_data
} from '@/api/testdata'
// import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    station_infos: [],
    station_data: [],
    station_info: {},
    stationName: ''
  },
  mutations: {
    setStationsInfo (state, infos) {
      state.station_infos = infos
    },
    setStationData (state, datas) {
      state.station_data = datas
    },
    setStationInfo (state, info) {
      state.station_info = info
    }
  },
  getters: {},
  actions: {
    getAllStationInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          get_all_stations_info().then(res => {
            const data = res.data
            commit('setStationsInfo', data)
            commit('setStationInfo', data[0])
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getStationData ({ state, commit }, { begin, end }) {
      return new Promise((resolve, reject) => {
        try {
          const { station_info } = state
          const { Id } = station_info
          get_station_data_by_timespan({ Id, begin, end })
            .then(res => {
              const data = res.data
              commit('setStationData', data)
              resolve(data)
            }).catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
/*
 station infos
 [
 {
   "id": "07a3bb90-f872-421a-b405-2809def331a2",
   "name": "接插件装配",
   "keys": "扭矩,角度,数量,浮高,MetaData",
   "metaData": ""
 },
   {
     "id": "0a25b201-8268-4dbe-817e-db04d53c5b92",
     "name": "激光焊接",
     "keys": "MetaData",
     "metaData": ""
   },
   {
     "id": "0f67bb5c-e148-4bde-9f09-5b0c19b470fe",
     "name": "转子装滚动轴承",
     "keys": "装滚动轴承尺寸,压入力,压入位置,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "16f7e371-f9d4-4fda-9c39-56cc7a3e4c81",
     "name": "负载及反电动势测试",
     "keys": "峰值电流,峰值扭矩,最高转速,感应电动势峰值,MetaData",
     "metaData": ""
   },
   {
     "id": "1d12a041-fcae-4cd8-8767-7e1b1ff357f0",
     "name": "导通性测试",
     "keys": "检测结果,MetaData",
     "metaData": ""
   },
   {
     "id": "1fbbc1a3-6469-4595-a923-d4d466b85a8b",
     "name": "电机零点标定",
     "keys": "检测结果,MetaData",
     "metaData": ""
   },
   {
     "id": "21d0aa67-7ba1-4b5d-9a65-8bc4af87fff2",
     "name": "定子绕线",
     "keys": "绕线张力,MetaData",
     "metaData": ""
   },
   {
     "id": "2a2f4ec9-890e-4d32-8c8e-8593e54dac8f",
     "name": "磁环装配",
     "keys": "磁环装配尺寸,压入力,压力机终止位置,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "3ac3b4c5-3fcf-445b-bcfd-61f3a7213749",
     "name": "装磁石",
     "keys": "有无漏装,MetaData",
     "metaData": ""
   },
   {
     "id": "4a8f1c9c-f4a2-4d12-97db-e72343bde872",
     "name": "转子充磁",
     "keys": "充磁电压,充磁电流,磁通量,表磁规格,外观,MetaData",
     "metaData": ""
   },
   {
     "id": "4c864ff3-3e40-4cd0-904e-7ebf0a3a8f79",
     "name": "PCB板焊锡",
     "keys": "焊锡温度,焊锡时间,送锡量,MetaData",
     "metaData": ""
   },
   {
     "id": "4ce72d54-03c8-4f9c-a565-95b94b9d195d",
     "name": "PCB板装配",
     "keys": "打螺丝位置,锁付状态,扭矩,角度,数量,浮高,MetaData",
     "metaData": ""
   },
   {
     "id": "610ad52e-6c88-4ddc-a08d-268d568d1c6a",
     "name": "转子入轴",
     "keys": "中间铁芯压装压入力,中间铁芯压压入终止位置,两端铁芯压装压入力,两端铁芯压入终止位置,压入尺寸,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "684fa94a-704f-41bd-a52f-47a1f4188829",
     "name": "转子装外衬套",
     "keys": "冲凸点压入力,冲凸点终止位置,收口压入力,收口终止位置,转子外径,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "766afbf5-af83-438f-811f-d2bed694eb0c",
     "name": "定子入机壳",
     "keys": "压入力,压入位置,定子内径,角度,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "7d96480f-4bdd-407e-a2a6-5c15a0d00a57",
     "name": "扭矩测试",
     "keys": "摩擦扭矩,齿槽扭矩,绝缘电阻,漏电流,MetaData",
     "metaData": ""
   },
   {
     "id": "86441abc-6c8f-4b28-81f0-57938383c394",
     "name": "清扫AOI检测",
     "keys": "检测结果,MetaData",
     "metaData": ""
   },
   {
     "id": "9708a44f-445a-4908-8dc5-d86f84957de2",
     "name": "转子入中盖",
     "keys": "压装尺寸,压入力,压入位置,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "9a101836-9fea-425b-b00e-356feeb84d8d",
     "name": "定子拼圆",
     "keys": "MetaData",
     "metaData": ""
   },
   {
     "id": "a237da47-3447-4caf-9dd4-03761b094353",
     "name": "程序烧写及测试",
     "keys": "软件版本号,硬件版本号,软件编码,条码,MetaData",
     "metaData": ""
   },
   {
     "id": "a75ae7d5-bd9d-44b5-a97d-4f7c2288609d",
     "name": "电机合装",
     "keys": "打螺丝位置,锁付状态,扭矩,角度,数量,浮高,MetaData",
     "metaData": ""
   },
   {
     "id": "b4809293-d9b6-4175-8b3e-9413c74b8b1a",
     "name": "总成性能测试",
     "keys": "扭矩,电流,温度,MetaData",
     "metaData": ""
   },
   {
     "id": "c8329964-27f8-4f37-8cbe-242be1346af0",
     "name": "后盖装配",
     "keys": "打螺丝位置,锁付状态,扭矩,角度,数量,浮高,MetaData",
     "metaData": ""
   },
   {
     "id": "d9202a09-0f24-410b-b6de-30811f77f000",
     "name": "定子性能测试",
     "keys": "相间电阻,绝缘电阻,漏电流,电感,匝间波形积差,电阻偏差值,焊接电阻,MetaData",
     "metaData": ""
   },
   {
     "id": "dfde6b76-4277-47bb-9541-056af0596dcd",
     "name": "激光打标",
     "keys": "打标内容,MetaData",
     "metaData": ""
   },
   {
     "id": "dff54b33-3987-4b6a-94e4-201db21c9d1d",
     "name": "中盖点胶",
     "keys": "点胶量,MetaData",
     "metaData": ""
   },
   {
     "id": "e7fead3b-c604-4020-899e-f77ca65dfa43",
     "name": "中盖铆压轴承",
     "keys": "压入力,压入位置,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "ec262c10-fa53-41b4-8a22-a8d1700baf0e",
     "name": "联轴器装配",
     "keys": "圆跳动,装配尺寸,压入力,压入位置,分段控制最大压入力,MetaData",
     "metaData": ""
   },
   {
     "id": "f472655f-7b4f-433e-9a60-ece567b76b02",
     "name": "噪音及振动测试",
     "keys": "噪声值,振动值,MetaData",
     "metaData": ""
   },
   {
     "id": "f98b601a-4390-4c74-b51c-398d66a89fc8",
     "name": "汇流桥装配",
     "keys": "角度,压入力,压入位置,分段控制最大压入力,MetaData",
     "metaData": ""
   }
 ]
*/
