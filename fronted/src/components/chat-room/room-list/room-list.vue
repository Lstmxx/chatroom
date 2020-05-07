<template>
  <div class="room-list">
    <el-button type="success" @click="createRoomDialog = true" style="margin: 0px;border-radius: 0px">创建房间</el-button>
    <el-button type="primary" @click="joinRoomDialog = true" style="margin: 0px;border-radius: 0px">加入房间</el-button>
    <div class="list scroll-bar">
      <RoomItem
      :class="{ 'selected': selectedRoom && (roomData.id === selectedRoom.id) }"
      v-for="(roomData, index) in roomList"
      :key="index"
      :roomData="roomData"
      @on-select="handleSetSelectedRoom"></RoomItem>
    </div>
    <el-dialog title="创建房间" :visible.sync="createRoomDialog">
      <el-form :model="createRoom" :rules="createRules" ref="createRoomForm">
        <el-form-item label="房间名" prop="hashId">
          <el-input v-model="createRoom.name" autocomplete="off" :maxlength='32' :minlength='32'></el-input>
        </el-form-item>
        <el-form-item label="房间描述" prop="description">
          <el-input v-model="createRoom.description" autocomplete="off" :maxlength='32' :minlength='32'></el-input>
        </el-form-item>
        <el-form-item label="房间头像" prop="avatarImage">
          <el-input v-model="createRoom.avatarImage" autocomplete="off" :maxlength='32' :minlength='32'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRoomDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateRoom">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="加入房间" :visible.sync="joinRoomDialog">
      <el-form :model="joinRoom" :rules="joinRules" ref="joinRoomForm">
        <el-form-item label="房间号" prop="hashId">
          <el-input v-model="joinRoom.hashId" autocomplete="off" :maxlength='32' :minlength='32'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="joinRoomDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleJoinRoom">确 定</el-button>
      </div>
    </el-dialog>
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
      selectedRoom: 'getSelectedRoom',
      userId: 'getUserId'
    })
  },
  data () {
    return {
      searchRoomList: [],
      joinRoomDialog: false,
      createRoomDialog: false,
      joinRules: {
        hashId: [
          { required: true, message: '请输入房间邀请码', trigger: 'blur' },
          { min: 32, max: 32, message: '长度为32位', trigger: 'blur' }
        ]
      },
      createRules: {
        name: [
          { required: true, message: '请输入房间名字', trigger: 'blur' },
          { min: 0, message: '不能为空', trigger: 'blur' }
        ]
      },
      joinRoom: {
        hashId: ''
      },
      createRoom: {
        name: '',
        description: '',
        avatarImage: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleSetSelectedRoom'
    ]),
    handleCreateRoom () {
      this.$refs.createRoomForm.validate(valid => {
        if (valid) {
          this.$Loading.show()
          const config = {
            url: '/room/create',
            data: this.createRoom
          }
          post(config).then((responseData) => {
            console.log(responseData)
            this.createRoom.name = ''
            this.createRoomDialog = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.$emit('create-room-success')
          }).catch((err) => {
            this.createRoomDialog = false
            console.log(err)
          })
        }
      })
    },
    handleJoinRoom () {
      this.$refs.joinRoomForm.validate(valid => {
        if (valid) {
          this.$Loading.show()
          const config = {
            url: '/room/join',
            data: {
              roomIdHash: this.joinRoom.hashId
            }
          }
          post(config).then((responseData) => {
            console.log(responseData)
            this.$Loading.hide()
            this.joinRoomDialog = false
            this.$message({
              message: '加入成功',
              type: 'success'
            })
            this.$emit('create-room-success')
          }).catch((err) => {
            this.$Loading.hide()
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './room-list.less';
</style>
