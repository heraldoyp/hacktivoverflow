import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import AllQuestion from '@/components/AllQuestion'
import QuestionDetail from '@/components/QuestionDetail'
import QuestionCategory from '@/components/QuestionCategory'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/home',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: '',
          name: AllQuestion,
          component: AllQuestion
        },
        {
          path: ':category',
          name: QuestionCategory,
          component: QuestionCategory,
          props: true
        },
        {
          path: 'question/:idQuestion',
          name: QuestionDetail,
          component: QuestionDetail,
          props: true
        }
      ]
    }
  ]
})
