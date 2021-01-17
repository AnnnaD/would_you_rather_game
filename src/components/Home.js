import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="questions-section">
        <div className="questions_menu">
          <button>Unanswered</button>
          <button>Answered</button>
        </div>
        <ul>
          {this.props.answers.map((id) => (
            <li key={id}>
              <div>Answers id: {id}</div>
            </li>
          ))}
        </ul>
        <ul>
          {this.props.questionsIds.map((id) => (
            <li key={id}>
              <div>Question id: {id}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}) {
  const answersObj = users[authedUser].answers
  return {
    questionsIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answers: Object.keys(answersObj).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    users,
  }
}

export default connect(mapStateToProps)(Home)
