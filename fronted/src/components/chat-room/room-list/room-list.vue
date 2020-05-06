<template>
  <div class="room-list">
    <el-button type="success" @click="handleNewRoom" style="margin: 0px;border-radius: 0px">创建房间</el-button>
    <el-button type="primary" @click="showMessageBox" style="margin: 0px;border-radius: 0px">加入房间</el-button>
    <div class="list scroll-bar">
      <RoomItem
      :class="{ 'selected': selectedRoom && (roomData.id === selectedRoom.id) }"
      v-for="(roomData, index) in roomList"
      :key="index"
      :roomData="roomData"
      @on-select="handleSetSelectedRoom"></RoomItem>
    </div>
  </div>
</template>
<script>
import RoomItem from '../room-item'
import { post } from '@/libs/request'
import { mapGetters, mapActions } from 'vuex'
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
  computed: {
    ...mapGetters({
      selectedRoom: 'getSelectedRoom'
    })
  },
  data () {
    return {
      searchRoomList: []
    }
  },
  methods: {
    ...mapActions([
      'handleSetSelectedRoom'
    ]),
    showMessageBox () {
      this.$confirm('输入房间号', '输入房间号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((err) => {
        console.log(err)
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
