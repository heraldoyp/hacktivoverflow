<template>
  <div>
    <h5>All Question</h5>
    <div v-for="question in questions" :key="question._id">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-2 text-center">
              {{question.vote}}
              <br>
              Vote
              <button class="btn btn-primary text-center" @click="upVote(question._id)">Vote</button>
              <button class="btn btn-primary text-center" @click="downVote(question._id)">Unvote</button>
            </div>
            <div class="col-sm-8">
              <h5 class="card-title"><router-link :to="'/home/question/'+ question._id">{{question.title}}</router-link></h5>
              <p class="card-text">{{question.q}}</p>
              <button>{{question.category}}</button>
              <p>by: {{question.UserId.username}}</p>
              <div class="text-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllQuestion',
  data () {
    return {
      questions: []
    }
  },
  created () {
    this.$http.get('/question')
      .then(response => {
        console.log(response.data.data)
        this.questions = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    upVote (questionId) {
      let token = localStorage.getItem('token')

      this.$http.get('/question/' + questionId + '/upvote', {headers: {token: token}})
        .then(response => {
          console.log(response)
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
        })
    },
    downVote (questionId) {
      let token = localStorage.getItem('token')

      this.$http.get('/question/' + questionId + '/downvote', {headers: {token: token}})
        .then(response => {
          console.log(response)
          window.location.href = window.location.href
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
