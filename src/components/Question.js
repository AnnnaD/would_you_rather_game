import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/_DATA.js'
import Poll from './Poll'

class Question extends Component {
  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({
      clicked:true
    })
  }
  render() {
    console.log(this.props)
    const { question, authorAvatar } = this.props
    return (
      <div>
        <div className="single-question-container">
          <h4>{question.author} asks:</h4>
            <div className="question-options">
              <div className="photo-container">
              <img src={authorAvatar} alt="author avatar" />
              </div>
              <div className="content">
                <h5>Would you rather</h5>
                <p>...{question.optionOne.text}...</p>
                <button className="show-pol-btn" onClick={this.handleClick}>show poll</button>
              </div>
            </div>
            {this.state.clicked ? <Poll question={question} avatar={authorAvatar}/> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, {id}) {
  const question = questions[id]
  const optionOneText = question['optionOne'].text
  const optionTwoText = question['optionTwo'].text
  const author = questions[id].author
  // const author = users[question.author].name
  const authorAvatar = users[question.author].avatarURL

  return {
    user:users[authedUser],
    users,
    questions,
    authedUser,
    question: question,
    authorAvatar
  }
}

export default connect(mapStateToProps)(Question)
