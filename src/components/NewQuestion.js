import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'


class NewQuestion extends Component {
  state = {
    question: {
      optionOne:'',
      optionTwo:''
    }
  }

  handleChange = (event) => {

    const { name, value } = event.target

    this.setState(currState => ({
      ...currState,
      question: {
        ...currState.question,
        [name]:value,
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const question_data = {
      author: this.props.authedUser,
      optionOneText: this.state.question.optionOne,
      optionTwoText: this.state.question.optionTwo
    }

    this.props.dispatch(handleAddQuestion(question_data))

    this.setState(currState => ({
      ...currState,
      question: {
        ...currState.question,
        optionOne:'',
        optionTwo:''
      }
    }))
  }

  render() {
    // console.log(this.props)
    const { optionOne, optionTwo } = this.state.question
    const questionOneLeft = 50 - optionOne.length
    const questionTwoLeft = 50 - optionTwo.length

{/* todo: Redirect to / if submited*/}

    return (
      <div>
        <h4>New Question</h4>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="optionOne" name="optionOne" value={optionOne} maxLength={50} onChange={this.handleChange}/>
          {questionOneLeft <= 40 && (
            <div>{questionOneLeft}</div>
          )}
          <input type="text" placeholder="optionTwo" name="optionTwo" value={optionTwo} maxLength={50} onChange={this.handleChange}/>
          {questionTwoLeft <= 40 && (
            <div>{questionTwoLeft}</div>
          )}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser,answer}) {

  return {
    users,
    authedUser,
  }
}
export default connect(mapStateToProps)(NewQuestion)
