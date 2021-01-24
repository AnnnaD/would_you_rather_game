import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  state = {
    toHome: false
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.setState({
      toHome: this.props.authedUser === null ? true : false
    })
    this.props.dispatch(setAuthedUser(null))
  }

  handleMessage = () => {
    if(this.props.authedUser === null) {
      alert('Please SignIn')
    }
  }


  render() {

    if(this.state.toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <nav className="main_nav">
        <div className="main_menu">
          <ul className="list_items">
            <li>
              <NavLink to='/' exact activeClassName='active' onClick={this.handleMessage}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to='/new' activeClassName='active' onClick={this.handleMessage}>
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active' onClick={this.handleMessage}>
                Leaderboard
              </NavLink>
            </li>
            { this.props.authedUser === null
            ?
            null
            :
            <div className="user-panel">
              <li>Hello {this.props.authedUser}</li>
              <li>
              <NavLink to='/login' activeClassName='active' onClick = {this.handleLogout}>
                Logout
              </NavLink>
              </li>
            </div>
            }
          </ul>
        </div>
      </nav>
    )
  }
}
function mapStateToProps({authedUser}) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(Nav)
