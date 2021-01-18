import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
  state = {
    value: 'Select User'
  }
  handleChange=(event)=>{
    this.setState({
      value:event.target.value
    })
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    if(this.state.value==='Select User'){
      alert('Please select a user')
    } else {
      console.log(`selected user is ${this.state.value}`)
      this.props.dispatch(setAuthedUser(this.state.value))
    }
  }
  render() {
    console.log(this.props)
    console.log(this.state.value)
    return (
      <div>
        <p>Please sign in to continoue</p>
        <h4>Sign in</h4>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value={this.state.value}>{this.state.value}</option>
            {this.props.usersIds.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    usersIds: Object.keys(users),
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(SignIn)
