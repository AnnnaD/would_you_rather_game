import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    console.log(this.props.nameOfUser)
    return (
      <div>
        <h4>Leaderboard</h4>
            <div className="leaderboard-section">
            {this.props.nameOfUser.map((user,index)=>{
              const name = this.props.users[user].name
              const avatar = this.props.users[user].avatarURL
              const answeredByUser = this.props.users[user].answers
              const answeredByUserNum = Object.keys(answeredByUser)
              const numberAnswered = answeredByUserNum.length
              const createdByUser = this.props.users[user].questions.length
              return (
                <div key={index} className="leader-card">
                  {name}
                  <img src={avatar} />
                  <p>Answered questions {numberAnswered}</p>
                  <p>Created questions {createdByUser}</p>
                  <p>Score: {numberAnswered + createdByUser}</p>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}
function mapStateToProps ({ questions, authedUser, users }) {
  const nameOfUser = Object.keys(users)

  return {
  users,
  questions,
  authedUser,
  nameOfUser
  }
}
export default connect(mapStateToProps)(Leaderboard)
