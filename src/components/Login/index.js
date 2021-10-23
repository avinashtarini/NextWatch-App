import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {LoginButton} from './styledComponent'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    tickStatus: false,
    errorMsg: '',
    errorStatus: false,
  }

  onSuccessRender = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 7,
    })

    history.replace('/')
  }

  getUserDetailsList = async () => {
    const {username, password} = this.state
    console.log(username)
    console.log(password)
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiRequest = await fetch('https://apis.ccbp.in/login', options)
    const jsonData = await apiRequest.json()
    console.log(apiRequest)
    console.log(jsonData)
    if (apiRequest.ok === true) {
      this.onSuccessRender(jsonData.jwt_token)
    } else {
      this.setState({
        errorStatus: true,
        errorMsg: jsonData.error_msg,
      })
    }
  }

  onSubmitUserDetails = event => {
    event.preventDefault()
    this.getUserDetailsList()
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getTickStatus = () => {
    this.setState(prevState => ({
      tickStatus: !prevState.tickStatus,
    }))
  }

  render() {
    const {tickStatus, errorMsg, errorStatus} = this.state
    const inputTypeSet = tickStatus ? 'text' : 'password'
    const loginToken = Cookies.get('jwt_token')
    if (loginToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="background-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.onSubmitUserDetails} className="form-element">
            <div className="username-container">
              <label htmlFor="login" className="label-style">
                USERNAME
              </label>

              <input
                type="text"
                id="login"
                className="input-style"
                onChange={this.getUsername}
              />
            </div>
            <div className="username-container">
              <label htmlFor="code" className="label-style">
                PASSWORD
              </label>

              <input
                className="input-style"
                type={inputTypeSet}
                id="code"
                onChange={this.getPassword}
              />
            </div>
            <div className="show-password">
              <input
                type="checkbox"
                className="checkbox"
                id="check"
                onClick={this.getTickStatus}
              />
              <label className="label-check" htmlFor="check">
                Show Password
              </label>
            </div>
            <LoginButton className="login-btn-status" type="submit">
              Login
            </LoginButton>
            {errorStatus && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
