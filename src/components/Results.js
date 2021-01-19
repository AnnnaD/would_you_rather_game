import React, { Component } from 'react'
import { connect } from 'react-redux'

class Results extends Component {


  render() {
    const optionOneNumber = this.props.optionOneVotes.length/3*100
    const optionOneNumberRounded = optionOneNumber.toFixed(1)
    const optionTwoNumber = this.props.optionTwoVotes.length/3*100
    const optionTwoNumberRounded = optionTwoNumber.toFixed(1)


    console.log(this.props.userAnswer)
    const { question, optionOneVotes, optionTwoVotes, authorFullName, avatar, userAnswer } = this.props
    return (
      <div className="single-question-container">
        <p>Added by: {authorFullName}</p>
        <div>
          <img src={avatar} />
        </div>
        <div className="content">
          <div className={userAnswer === "optionOne" ? "user-vote" : ""}>
            <div className={`vote-badge ${userAnswer==="optionOne" ? "visible" : "hidden"}`}>your vote</div>
            <p>Would you rather {question.optionOne.text}</p>
            <p>{optionOneNumberRounded}</p>
            <p>{optionOneVotes.length} of 3</p>
          </div>
          <div className={userAnswer === "optionTwo" ? "user-vote" : ""}>
            <div className={`vote-badge ${userAnswer==="optionTwo" ? "visible" : "hidden"}`}>your vote</div>
            <p>Would you rather {question.optionTwo.text}</p>
            <p>{optionTwoNumberRounded}</p>
            <p>{optionTwoVotes.length} of 3</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, {question}) {
  const questionAuthor = questions[question.id].author
  const authorFullName = users[questionAuthor].name
  const answers = users[authedUser].answers
  const optionOneVotes = questions[question.id].optionOne.votes
  const optionTwoVotes = questions[question.id].optionTwo.votes

  return {
    users,
    question,
    authedUser,
    optionOneVotes,
    optionTwoVotes,
    authorFullName
  }
}

export default connect(mapStateToProps)(Results)
