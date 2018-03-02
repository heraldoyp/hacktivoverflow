<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-2 text-center">
            {{question.vote}}
            <br>
            Vote
            <button class="btn btn-primary text-center" @click="upVoteQ(question._id)">Vote</button>
            <button class="btn btn-primary text-center" @click="downVoteQ(question._id)">Unvote</button>
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
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Your Answer</label>
              <textarea class="form-control" v-model="answer.a" rows="3"></textarea>
            </div>
            <div class="text-right">
              <button type="button" class="btn btn-primary" @click="answerThis(answer._id)">Answer</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-for="answer in answers" :key="answer._id">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-2 text-center">
              {{answer.vote}}
              <br>
              Vote
              <button class="btn btn-primary text-center" @click="upVoteA(answer._id)">Vote</button>
              <button class="btn btn-primary text-center" @click="downVoteA(answer._id)">Unvote</button>
            </div>
            <div class="col-sm-8">
              <p class="card-text">{{answer.a}}</p>
              <p>by: {{answer.UserId.username}}</p>
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
  name: 'QuestionDetail',
  props: ['idQuestion'],
  data () {
    return {
      question: [],
      answers: [],
      answer: {
        a: '',
        UserId: ''
      }
    }
  },
  created () {
    this.$http.get('/question/' + this.idQuestion)
      .then(response => {
        console.log(response.data.data)
        this.question = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

    this.$http.get('/answer/' + this.idQuestion)
      .then(response => {
        console.log(response)
        this.answers = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    answerThis (questionId) {
      console.log(questionId)
      console.log(localStorage.getItem('UserId'))
      let token = localStorage.getItem('token')
      let data = {
        a: this.answer.a,
        UserId: localStorage.getItem('UserId')
      }
      console.log(data)
      this.$http.post('/question/' + questionId + '/answer', data, {headers: {token: token}})
        .then(response => {
          console.log(response)
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
        })
    },
    upVoteQ (questionId) {
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
    downVoteQ (questionId) {
      let token = localStorage.getItem('token')

      this.$http.get('/question/' + questionId + '/downvote', {headers: {token: token}})
        .then(response => {
          console.log(response)
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
        })
    },
    upVoteA (answerId) {
      console.log(answerId)
      let token = localStorage.getItem('token')
      this.$http.get('/answer/' + answerId + '/upvote', {headers: {token: token}})
        .then(response => {
          console.log(response)
          window.location.href = window.location.href
        })
        .catch(error => {
          console.log(error)
        })
    },
    downVoteA (answerId) {
      console.log(answerId)
      let token = localStorage.getItem('token')
      this.$http.get('/answer/' + answerId + '/downvote', {headers: {token: token}})
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
