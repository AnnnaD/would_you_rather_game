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
    console.log(this.props.answers)
    return (
      <div className="questions-section">
        <div className="questions_menu">
          <button onClick={this.handleCategoryChange} value='Unanswered' className={this.state.questionsCategory==='Unanswered'? 'active_tab': ''}>Unanswered</button>
          <button onClick={this.handleCategoryChange} value='Answered' className={this.state.questionsCategory==='Answered'? 'active_tab': ''}>Answered</button>
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
            {this.props.questionsIds.map((obj) => (
              <li key={obj.id}>
                <Question id={obj.id} activeCategory={this.state.questionsCategory}/>
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
  const answersIds = Object.keys(answersObj).sort((a,b) => answersObj[b].timestamp - answersObj[a].timestamp)
  const unanswered = Object.values(questions).filter((q)=>!answersIds.includes(q.id))
  return {
    questionsIds: unanswered,
    answers: answersIds,
    users,
    authedUser,
  }
}

export default connect(mapStateToProps)(Home)
