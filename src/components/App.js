import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import SignIn from './SignIn'
import NewQuestion from './NewQuestion'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="container">
        <nav className="main_nav">
          <div className="main_menu">
            <ul className="list_items">
              <li>Home</li>
              <li>New Question</li>
              <li>Leaderboard</li>
              {this.props.loading === true
            ?
            null
            :
            <div className="user_panel">
              <li>Hello {this.props.authedUser}</li>
              <li>Logout</li>
            </div>
          }
            </ul>
          </div>
        </nav>
        {this.props.loading === true
        ?
        <SignIn />
        :
        <Home />
      }
      </div>
    );
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser,
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)
