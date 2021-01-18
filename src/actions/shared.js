import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { handleSaveAnswer } from '../actions/questions'
import { handleSaveUserAnswer } from '../actions/users'
import { saveQuestionAnswer } from '../utils/_DATA.js'
// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
    .then(({ users, questions })=>{
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      // dispatch(setAuthedUser(AUTHED_ID))
    })
  }
}


export function handleAnswer(answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestionAnswer(answer).then(()=>{
      dispatch(handleSaveAnswer(answer))
      dispatch(handleSaveUserAnswer(answer))
    }).catch((error) => {
      console.log("Promise rejected")
    })
  }
}
