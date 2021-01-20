import { RECEIVE_USERS } from '../actions/users'
import { SAVE_USER_ANSWER } from '../actions/users'
import { ADD_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
    return {
      ...state,
      ...action.users
    }
    case SAVE_USER_ANSWER :
    const { authedUser, qid, answer } = action.answer
    return     {
          ...state,
          [authedUser]: {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]: answer
            }
          }
        }
    case ADD_USER_QUESTION :
    return   {
      ...state,
      [action.question.author]: {
        ...state[action.question.author],
        questions: state[action.question.author].questions.concat([action.question.id])
      }
  }
    default :
    return state
  }
}
