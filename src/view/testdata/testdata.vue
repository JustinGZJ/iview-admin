<template>

  <layout :style="{height: '90vh'}">
      <sider span="auto" :style="{position: 'relative', height: '100%', left: 0, overflow: 'auto'}">
      <Menu @on-select="handleStationChanged" title="站位数据">

          <MenuItem  v-for="station_info in station_infos"  :name="station_info.name" :key="station_info.Id">
            <Icon type="md-document" />
            {{ station_info.name }}
          </MenuItem>
      </Menu>
      </sider>
      <layout :style="{marginLeft: '10px'}">
        <header  >
          起始时间:
            <DatePicker type="datetime" :value="dtFrom"  @on-change="dtFrom=$event" format="yyyy-MM-dd HH:mm" placeholder="请选择起始时间" style="width: 200px"></DatePicker>
          结束时间
            <DatePicker type="datetime" :value="dtTo"   @on-change="dtTo=$event" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
            <Button style="margin: 0 10px;" type="primary" @click="handleQueryClicked">查询</Button>
            <Button style="margin: 0 10px;"  icon="ios-download-outline"  @click="exportExcel">导出文件</Button>
        </header>
        <content>
        <Card>
          <tables ref="tables" v-model="tableData" :columns="columns"/>
          <page show-total :total="pageParams.totalCount" :page-size="pageSize"  @on-change="handlePageChanged"></page>

        </Card>
        </content>
      </layout>
  </layout>
</template>

<script>
import Tables from '_c/tables'
import { exportExcel } from '@/api/testdata'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'testdata_page',
  components: {
    Tables
  },
  data () {
    return {
      activeName: '',
      columns: [],
      tableData: [],
      dtFrom: new Date(new Date().setDate(new Date().getDate() - 1)),
      dtTo: new Date(),
      pageSize: 20
    }
  },
  methods: {

    ...mapMutations([
      'setStationInfo',
      'setPageParams']
    ),
    ...mapActions([
      'getAllStationInfo',
      'getStationData']),
    handleDelete (params) {
      console.log(params)
    },
    handlePageChanged (page) {
      console.log(`page` + page)
      this.queryData(page)
    },
    handleStationChanged (e) {
      console.log(e)
      this.tableData = []
      this.setPageParams({ totalCount: 0 })
      const station_info = this.station_infos.find(x => x.name === e)
      this.columns = [{ title: '二维码', key: 'Code' }, { title: '时间', key: 'DateTime' }]
      this.setStationInfo(station_info)
      let { keys } = station_info
      for (const key of keys.split(',')) {
        this.columns.push({ title: key, key: key })
      }
    },
    handleQueryClicked () {
      console.log('查询已点击')
      this.queryData(1)
    },
    queryData (PageNumber) {
      this.tableData = []
      let { id } = this.current_station_info
      this.getStationData({
        stationId: id,
        From: this.dtFrom,
        To: this.dtTo,
        PageNumber: PageNumber,
        PageSize: this.pageSize }).then(data => {
        console.log(data)
        this.tableData = data
      })
    },
    exportExcel () {
      let { id } = this.current_station_info
      exportExcel({
        stationId: id,
        From: this.dtFrom,
        To: this.dtTo })
        .then(res => {
          console.log(res)
          // 地址转换
          let url = window.URL.createObjectURL(res.data)
          // 文件名
          let fileName = `${this.dtFrom}-${this.dtTo}.csv`
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', fileName)
          document.body.append(a)
          a.click()
          document.body.removeChild(a)
        }).catch(err => {
          this.$Message.error(err)
        })
    }
  },
  computed: {
    // map时候要使用命名空间
    ...mapState({
      station_infos: state => state.testdata.station_infos,
      station_data: state => state.testdata.station_data,
      current_station_info: state => state.testdata.current_station_info,
      pageParams: state => state.testdata.pageParams
    }) },
  mounted () {
    this.getAllStationInfo().then(infos => {
    //  console.log(infos)
    })
  }
}
</script>

<style>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.dev-run-preview .dev-run-preview-edit{ display: none }
</style>
