<template>

  <div>
    <Row>
      <Col span="3">
      <Menu ref="stationMenu" @on-select="handleStationChanged">
        <MenuGroup title="站位数据" >
          <MenuItem  v-for="station_info in station_infos"  :name="station_info.name" :key="station_info.Id">
            <Icon type="md-document" />
            {{ station_info.name }}
          </MenuItem>
        </MenuGroup>
      </Menu>
      </Col>
      <Col span="21">
        <Card>
          <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
          <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Tables from '_c/tables'
// import { getTableData } from '@/api/data'
import { mapActions, mapState } from 'vuex'
// import { get_all_stations_info } from '@/api/testdata'
export default {
  name: 'testdata_page',
  components: {
    Tables
  },
  data () {
    return {
      activeName: '',
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    ...mapActions([
      'getAllStationInfo',
      'getStationData']),
    handleDelete (params) {
      console.log(params)
    },
    handleStationChanged (e) {

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
      station_info: state => state.testdata.station_info
    }) },
  mounted () {
    this.getAllStationInfo().then(infos => {
      console.log(infos)
      this.columns = []
      let { keys } = this.station_info

      for (const key of keys.split(',')) {
        this.columns.push({ title: key, key: key })
      }
    })
  }
}
</script>

<style>

</style>
