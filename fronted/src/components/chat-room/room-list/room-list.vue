<template>
  <div class="room-list">
    <el-button type="success" @click="handleNewRoom" style="margin: 0px;border-radius: 0px">创建房间</el-button>
    <el-button type="primary" @click="showMessageBox" style="margin: 0px;border-radius: 0px">加入房间</el-button>
    <div class="list">
      <RoomItem v-for="(roomData, index) in roomList" :key="index" :roomData="roomData"></RoomItem>
    </div>
  </div>
</template>
<script>
import RoomItem from '../room-item'
import { post } from '@/libs/request'
export default {
  name: 'RoomList',
  props: {
    roomList: {
      default: () => [],
      type: Array
    }
  },
  components: {
    RoomItem
  },
  data () {
    return {
      searchRoomList: []
    }
  },
  methods: {
    showMessageBox () {
      this.$confirm('输入房间号', '输入房间号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    },
    handleNewRoom () {
      const config = {
        url: '/room/create'
      }
      post(config).then((responseData) => {
        console.log(responseData)
        this.$emit('create-room-success')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './room-list.less';
</style>
