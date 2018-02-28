<template>
  <div>
    <div class="text-right" v-if="isLogin === true">
      <button type="button" class="btn btn-primary text-right" data-toggle="modal" data-target="#exampleModal">
        Ask Question
      </button>
    </div>
    <router-view></router-view>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <label for="exampleInputEmail1">Title</label>
                <input type="text" class="form-control" v-model="question.title" aria-describedby="emailHelp" placeholder="Enter Title">
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Choose Language</label>
                <select class="form-control" v-model="question.category">
                  <option value="javascript">Javascript</option>
                  <option value="java">Java</option>
                  <option value="phyton">Phyton</option>
                  <option value="c++">C++</option>
                  <option value="ruby">Ruby</option>
                </select>
              </div>              
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Question</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="question.q" placeholder="Your Question Here"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" @click="askQuestion">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'hello',
  data () {
    return {
      isLogin: '',
      question: {
        title: '',
        q: '',
        category: '',
        UserId: localStorage.getItem('UserId')
      }
    }
  },
  created () {
    if (localStorage.getItem('token') === null) {
      this.isLogin = false
    } else {
      this.isLogin = true
    }
  },
  methods: {
    askQuestion () {
      let token = localStorage.getItem('token')
      let data = {
        title: this.question.title,
        q: this.question.q,
        category: this.question.category,
        UserId: this.question.UserId
      }
      this.$http.post('question', data, {headers: {token: token}})
        .then(response => {
          console.log(response)
          swal('Question Created', '', 'success')
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
