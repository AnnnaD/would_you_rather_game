import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import SignIn from './SignIn'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import Poll from './Poll'
import Results from './Results'



class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="container">
      <Router>
      <Nav />
      {this.props.loading === true
      ?
      <SignIn />
      :
      <div>
        <Route path='/' exact component={ Home } />
        <Route path='/questions/:id' component={ Poll } />
        <Route path='/answered/:id' component={ Results } />
        <Route path='/new' component={ NewQuestion} />
        <Route path='/leaderboard' component = { Leaderboard } />
      </div>
    }
      </Router>

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
