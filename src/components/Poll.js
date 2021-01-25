import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../actions/shared.js'
import Results from './Results'

class Poll extends Component {
  state = {
    optionOne:this.props.question.optionOne.text,
    optionTwo:this.props.question.optionTwo.text,
    selectedOpt:'',
    selectedOptName:'',
    clicked:false,
    toResult: false,
    invalid: false
  }

  handleSubmit = (event) => {
    const answer_data = {
      authedUser:this.props.authedUser,
      qid:this.props.question.id,
      answer:this.state.selectedOpt
    }
    event.preventDefault();
    this.props.dispatch(handleAnswer(answer_data))
    this.setState({
      toResult: this.props.qid ? false : true,
    })
  }

  handleChange= (event) => {
    this.setState({
      selectedOpt:event.target.name,
      selectedOptName:event.target.value
    })
  }

  handleClick=()=>{
    this.setState({
      clicked:true,
    })
  }

  isDisabled = () => {
    const { selectedOpt } = this.state
    return selectedOpt === ''
  }

  render() {
console.log(this.props.isvalid)
    const {question, users, isvalid}=this.props

    const { id } = question
    const { toResult } =this.state
    const avatar = users[question.author].avatarURL

if(toResult===true){
  return <Redirect to={`/answered/${id}`} />
}

    return (
      <div>
      {
        (isvalid===true)
      ?   <div className="single-question-container">
          <h4>{question.author} asks:</h4>
            <div className="question-options">
              <div className="photo-container">
                <img src={avatar} />
              </div>
              <form className="content" onSubmit={this.handleSubmit}>
                <h5>Would you rather</h5>
                <input type="radio" name="optionOne" value={this.state.optionOne} onChange={this.handleChange} checked={this.state.selectedOptName===this.state.optionOne}/>{question.optionOne.text}
                <input type="radio" name="optionTwo" value={this.state.optionTwo} onChange={this.handleChange} checked={this.state.selectedOptName===this.state.optionTwo}/>{question.optionTwo.text}
                <button disabled={this.isDisabled()}>submit</button>
              </form>
              </div>
            </div>
    :<div>not found</div>

        }
          </div>
    )

  }
}

function mapStateToProps({questions, users, authedUser, answer}, ownprops) {
  const questionId = ownprops.match.params.id
  const question = questions[questionId]

  if(question === undefined) {
    return {
      isvalid: false,
      question:'',
      user:''
    }
  } else {
  const user = users[authedUser]

  return {
    users,
    questions,
    authedUser,
    question,
    user,
    answer,
    isvalid:true,
  }
}
}

export default connect(mapStateToProps)(Poll)
