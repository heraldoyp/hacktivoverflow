<template>
  <div>
    <br><br>
    <h1 class="text-center">Login</h1>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <div class="col-sm-8 offset-sm-2">
          <form @submit.prevent>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" class="form-control" aria-describedby="emailHelp" v-model="user.username" placeholder="Enter Username">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary" @click="submitUser">Submit</button> or
            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#modalRegister">Register</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="text" class="form-control" aria-describedby="emailHelp" v-model="user.username" placeholder="Enter Username">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" v-model="user.email" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="user.password" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary" @click="registerUser">Submit</button>
            </form>
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    submitUser () {
      let data = {
        username: this.user.username,
        password: this.user.password
      }
      this.$http.post('/signin', data)
        .then(response => {
          // console.log(response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('UserId', response.data.data._id)
          localStorage.setItem('username', response.data.data.username)
          localStorage.setItem('email', response.data.data.email)
          console.log(localStorage)
          swal('Login Success', '', 'success')
          this.$router.push('/home')
        })
        .catch(error => {
          console.log(error)
          swal('Login Failed', 'Invalid username/password', 'error')
        })
    },
    registerUser () {
      let data = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email
      }
      this.$http.post('/', data)
        .then(response => {
          console.log(response)
          if (response.data.message === 'dataOne') {
            swal('Register Failed', 'Username is already been used', 'error')
          } else {
            swal('Register Success', '', 'success')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
