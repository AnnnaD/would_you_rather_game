import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared.js'

class Poll extends Component {
  state = {
    optionOne:this.props.question.optionOne.text,
    optionTwo:this.props.question.optionTwo.text,
    selectedOpt:'',
    selectedOptName:''
  }



  handleSubmit = (event) => {
    const answer_data = {
      authedUser:this.props.authedUser,
      qid:this.props.question.id,
      answer:this.state.selectedOpt
    }
    event.preventDefault();
    // console.log(answer_data)
    this.props.dispatch(handleAnswer(answer_data))
  }

  handleChange= (event) => {
    this.setState({
      selectedOpt:event.target.name,
      selectedOptName:event.target.value
    })
  }

  render() {
    const { question, avatar, answer } = this.props
    console.log(this.props.answersIds)
    return (
      <div className="single-question-container">
      <div className="single-question-container">
        <h4>{question.author} asks:</h4>
          <div className="question-options">
            <div className="photo-container">
            <img src={avatar} alt="author avatar" />
            </div>
            <div className="content">
              <h5>Would you rather</h5>
              <input type="radio" name="optionOne" value={this.state.optionOne} onChange={this.handleChange} checked={this.state.selectedOptName===this.state.optionOne}/>{question.optionOne.text}
              <input type="radio" name="optionTwo" value={this.state.optionTwo} onChange={this.handleChange} checked={this.state.selectedOptName===this.state.optionTwo}/>{question.optionTwo.text}
              <button className="show-pol-btn" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser,answer}, {question}) {
  const answers=users[authedUser].answers

  return {
    users,
    question,
    authedUser,
    answersIds:Object.keys(answers).sort((a,b)=>questions[b].timestamp-questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(Poll)
