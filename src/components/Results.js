import React, { Component } from 'react'
import { connect } from 'react-redux'

class Results extends Component {
  render() {

    const { question, optionOneVotes, optionTwoVotes, userAnswer } = this.props

    const optionOneNumber = optionOneVotes.length/3*100
    const optionOneNumberRounded = optionOneNumber.toFixed(1)
    const optionTwoNumber = optionTwoVotes.length/3*100
    const optionTwoNumberRounded = optionTwoNumber.toFixed(1)

    return (
      <div className="single-question-container">
        <div className={userAnswer==='optionOne' ? 'user-vote' : ''}>
          <div className={`vote-badge ${userAnswer==='optionOne'? 'visible':'hidden'}`}>your vote</div>
          <p>Would you rather {question.optionOne.text}</p>
          <p>{optionOneVotes.length}</p>
          <p>{optionOneNumberRounded}%</p>
        </div>
        <div className={userAnswer==='optionTwo' ? 'user-vote' : ''}>
          <div className={`vote-badge ${userAnswer==='optionTwo'? 'visible':'hidden'}`}>your vote</div>
          <p>Would you rather {question.optionTwo.text}</p>
          <p>{optionTwoVotes.length}</p>
          <p>{optionTwoNumberRounded}%</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser, answer},ownprops) {
  const questionId = ownprops.match.params.id
  const question = questions[questionId]
  const optionOneVotes = question.optionOne.votes
  const optionTwoVotes = question.optionTwo.votes


  return {
    users,
    questions,
    authedUser,
    question,
    optionOneVotes,
    optionTwoVotes,
    userAnswer: optionOneVotes.includes(authedUser) ? 'optionOne' : 'optionTwo',
  }
}

export default connect(mapStateToProps)(Results)
