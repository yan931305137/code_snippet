<template>
  <div class="containers">
    <span class="head">个人信息</span>
    <hr class="hr"/>
    <div>
      <el-card shadow="hover" style="width: 1080px">
        <el-form size="small">
          <el-avatar v-if="this.$parent.avatar" :size="90" :src="this.$parent.avatar" class="avatar-img"
                     shape="square"></el-avatar>
          <el-avatar v-else :size="90" class="avatar-img" shape="square" src=""></el-avatar>
          <el-upload
            ref="upload"
            :action="this.URL"
            :auto-upload="false"
            :headers="uploadHeaders"
            :limit="1"
            :multiple="false"
            :show-file-list="true"
            class="avatar-uploader">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button class="upload-btn" size="small" type="success" @click="action">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-form-item class="informationLabel" label="用户名" style="margin-top: -370px">
            <el-input v-model="username" autocomplete="off" class="input-wide" disabled
                      style="margin-left: 45px"></el-input>
          </el-form-item>
          <el-form-item class="informationLabel" label="性别">
            <el-select v-model="gender" class="input-wide" placeholder="请选择您的性别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="informationLabel" label="邮箱">
            <el-input v-model="email" class="input-wide"></el-input>
          </el-form-item>
          <el-form-item class="informationLabel" label="电话">
            <el-input v-model="phone" class="input-wide"></el-input>
          </el-form-item>
          <el-form-item class="informationLabel" label="出生日期">
            <el-input v-model="brithday" class="input-wide" style="margin-left: 30px"></el-input>
          </el-form-item>
          <el-form-item class="informationLabel" label="地址">
            <el-input v-model="address" class="input-wide" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="save-btn" type="primary" @click="save">保 存 修 改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import {BaseURL} from '../utils/request.js'

export default {
  data () {
    return {
      username: '',
      email: '',
      phone: '',
      address: '',
      brithday: '',
      gender: '',
      avatarShow: true,
      URL: BaseURL + '/user/avatar',
      uploadHeaders: {'Authorization': localStorage.getItem('token')},
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        },
        {
          value: '3',
          label: '保密'
        }
      ]
    }
  },
  mounted () {
    this.$parent.getInformation()
    const information = JSON.parse(localStorage.getItem('information'))
    if (information) {
      this.username = information.username
      this.avatar = information.avatar
      this.email = information.email
      this.phone = information.phone
      this.address = information.address
      this.brithday = information.birthday
      this.gender = information.gender
      this.status = information.status
    }
    if (this.gender === 1) {
      this.gender = '男'
    } else if (this.gender === 2) {
      this.gender = '女'
    } else if (this.gender === 3) {
      this.gender = '保密'
    }
  },
  methods: {
    async save () {
      let res = await this.$api.PostInformation(this.username, this.avatar, this.email, this.phone, this.address, this.brithday, this.gender, this.status)
      if (res.data.code !== 0) {
        Message.error(res.data.msg)
      } else {
        localStorage.removeItem('information')
        await this.$parent.getInformation()
        Message.success(res.data.msg)
        location.reload()
      }
    },
    action () {
      this.$refs.upload.submit()
      location.reload()
    }
  }
}
</script>

<style scoped>
.avatar-img {
  margin: 20px -11px -1px 43px;
}

.el-upload__tip {
  margin-left: -15px;
}

.avatar-uploader {
  height: 300px;
  margin: 0 0 0 50px;
  width: 120px;
}

.upload-btn {
  margin: 5px 0 0 -12px;
}

.input-wide {
  margin-left: 60px;
  width: 400px;
}

.informationLabel {
  margin-left: 220px;
}

.save-btn {
  margin-left: 380px;
  width: 200px;
  height: 40px;
}
</style>
