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
            <Button @click="handleQueryClicked">查询</Button>
        </header>
        <content>
        <Card>
          <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
          <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        </Card>
        </content>
      </layout>
  </layout>
</template>

<script>
import Tables from '_c/tables'
// import { getTableData } from '@/api/data'
import { mapActions, mapMutations, mapState } from 'vuex'
// import { get_all_stations_info } from '@/api/testdata'
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
      pageNum: 1,
      pageSize: 20
    }
  },
  methods: {

    ...mapMutations([
      'setStationInfo']
    ),
    ...mapActions([
      'getAllStationInfo',
      'getStationData']),
    handleDelete (params) {
      console.log(params)
    },
    handleStationChanged (e) {
      console.log(e)
      this.tableData = []
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
      this.tableData = []
      let { id } = this.current_station_info
      this.getStationData({ stationId: id, From: this.dtFrom, To: this.dtTo, PageNumber: 1, PageSize: 20 }).then(data => {
        console.log(data)
        this.tableData = data
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  computed: {
    // map时候要使用命名空间
    ...mapState({
      station_infos: state => state.testdata.station_infos,
      station_data: state => state.testdata.station_data,
      current_station_info: state => state.testdata.current_station_info
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
  /*position: relative;*/
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.dev-run-preview .dev-run-preview-edit{ display: none }
</style>
