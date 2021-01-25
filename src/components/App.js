import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import SignIn from './SignIn'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import Poll from './Poll'
import Results from './Results'
import PageNotFound from './PageNotFound'



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

        <Switch>
          <Route path='/' exact component={ Home } />
          <Route path='/questions/:id' exact component={ Poll } />
          <Route path='/answered/:id' exact component={ Results } />
          <Route path='/new' exact component={ NewQuestion} />
          <Route path='/leaderboard' exact component = { Leaderboard } />
          <Route component={PageNotFound} />
        </Switch>
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
