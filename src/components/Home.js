import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


class Home extends Component {

  state = {
    questionsCategory: 'Unanswered'
  }

  handleCategoryChange = (event) => {
    this.setState({
      questionsCategory: event.target.value
    })
  }
  render() {
    // console.log(this.props)
    return (
      <div className="questions-section">
        <div className="questions_menu">
          <button onClick={this.handleCategoryChange} value='Unanswered' className={this.state.questionsCategory==='Unanswered'? 'active': ''}>Unanswered</button>
          <button onClick={this.handleCategoryChange} value='Answered' className={this.state.questionsCategory==='Answered'? 'active': ''}>Answered</button>
        </div>
        {this.state.questionsCategory === 'Answered'
      ?
        <div>
          <ul>
            {this.props.answers.map((id) => (
              <li key={id}>
                <Question id={id} activeCategory={this.state.questionsCategory}/>
              </li>
            ))}
          </ul>
        </div>
        :
        <div>
          <ul>
            {this.props.questionsIds.map((id) => (
              <li key={id}>
                <Question id={id} activeCategory={this.state.questionsCategory}/>
              </li>
            ))}
          </ul>
        </div>
      }
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
