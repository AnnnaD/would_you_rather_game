import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    console.log(this.props)
    const { userSummary } = this.props
    return (
      <div>
        <h4>Leaderboard</h4>
        {userSummary
          .map((user)=>{
            return (
              <div key={user.id} className="leader-card">
                {user.name}
                <img src={user.avatar} />
                <p>Answered questions {user.answeredByUser}</p>
                <p>Created questions {user.createdByUser}</p>
                <p>Score:{user.score}</p>
              </div>
              )
            })}
      </div>
    )
  }
}
function mapStateToProps ({ questions, authedUser, users }) {
  const userSummary = Object.values(users).map((user)=>({
    id: user.id,
    name: user.name,
    avatar: user.avatarURL,
    answeredByUser: Object.keys(user.answers).length,
    createdByUser: user.questions.length,
    score: user.questions.length + Object.keys(user.answers).length
  })).sort((uSa,uSb) => uSb.score - uSa.score)

  return {
    users,
    questions,
    authedUser,
    userSummary,
  }
}
export default connect(mapStateToProps)(Leaderboard)
