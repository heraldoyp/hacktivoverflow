<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Hacktive Overflow</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"><router-link :to="'/login'">Login</router-link><span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#"><router-link :to="'/home'">Home</router-link><span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <div v-if="isLogin === true">
            <button class="btn btn-outline-danger my-2 my-sm-0" type="button" @click="logOut">Logout</button>
          </div>
        </form>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'app',
  data () {
    return {
      isLogin: ''
    }
  },
  created () {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') !== null) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    logOut () {
      let UserId = localStorage.getItem('UserId')
      this.$http.get('/logout/' + UserId)
        .then(response => {
          console.log(response)
          localStorage.removeItem('token')
          localStorage.removeItem('UserId')
          localStorage.removeItem('username')
          this.isLogin = false
          swal('Logout Success', 'Thanks for using this website, CU8R', 'success')
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
