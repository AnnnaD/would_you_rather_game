import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { formatQuestion } from '../utils/_DATA.js'
import Poll from './Poll'
import Results from './Results'


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

    console.log(this.props.question.id)
    const { question, authorAvatar, activeCategory, isvalid } = this.props

    const { id } = this.props.question

    return (
      <div>
      {isvalid
      ?
      <div className="single-question-container">
        <h4>{question.author} asks:</h4>
          <div className="question-options">
            <div className="photo-container">
            <img src={authorAvatar} alt="author avatar" />
            </div>
            <div className="content">
              <h5>Would you rather</h5>
              <p>...{question.optionOne.text}...</p>
              {activeCategory==="Unanswered"
              ?
              <Link to={`/questions/${id}`} className="show-pol-btn">show poll</Link>
              :
              <Link to={`/answered/${id}`} className="show-pol-btn">show poll</Link>
            }
            </div>
          </div>
          {this.state.clicked && activeCategory==="Unanswered" ? <Poll /> : null}
          {this.state.clicked && activeCategory==="Answered" ? <Results /> : null}
      </div>
      :
      <p>not found</p>
    }

      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, {id}) {
  const question = questions[id]
  if(question === undefined) {
    return {
      isvalid: false,
    }
  }else {
  const optionOneText = question['optionOne'].text
  const optionTwoText = question['optionTwo'].text
  const author = questions[id].author
  // const author = users[question.author].name
  const authorAvatar = users[question.author].avatarURL

  return {
    users,
    questions,
    authedUser,
    question: question ? question : null,
    authorAvatar,
    isvalid: true,
  }
}
}

export default withRouter(connect(mapStateToProps)(Question))
