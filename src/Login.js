import React, { Component } from 'react';
import { Header } from "semantic-ui-react"
import Logo from "./kin-logo.svg"
import background from "./blue-background.jpg"

const logoStyle = {
    paddingRight:"150px"
}

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        phoneNumber: '',
        pinCode: ''
    }

    handleLoginChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    login = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/auth',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                // phoneNumber: this.state.phoneNumber,
                // pinCode: this.state.pinCode
            })
        })
        .then(res => res.json())
        .then( ( user ) => {
            this.props.onLogin(user.token, user)
            this.props.history.push(`/home`)
        } )
    }

    handleNewUser = () => {
        this.props.history.push({pathname: '/newUser' })
      }


render() {

    return (
<div style={{backgroundImage: "url(" + background + ")", backgroundSize:"cover"}}>
    <center>
        <img style={logoStyle} src={Logo} width="200" height="200"/>
    </center>
    <div >
        <h1 as='h1' style={{textAlign: 'center', fontFamily: 'Trebuchet MS', fontSize:"45px"}}>Kin Contacts</h1>
        <h1 as="h2" style={{textAlign: 'center', fontFamily: 'Trebuchet MS', fontSize:"25px"}}>"Your people, always available"</h1><br/>
    </div>
   <div>
    <center>
        <form style={{fontFamily: 'Trebuchet MS', fontSize:"20px"}} onSubmit={(e) => this.login(e)}>
            <div class="container">

                <label  for="username"><b>Username:</b></label>

                <input style={this.props.inputStyle} onChange={(e) => this.handleLoginChange(e)} type="text" placeholder="Enter Username" name="username" required/><br/>

                <label for="password"><b>Password:</b></label>

                <input style={this.props.inputStyle} onChange={(e) => this.handleLoginChange(e)} type="password" placeholder="Enter Password" name="password" required/><br/>

                <button style={this.props.link} type="submit">Login</button>
            </div>
            <div>
                <button style={this.props.link} onClick={this.handleNewUser}>Create New Account</button>
            </div>
        </form>
    </center>
   </div>

   <div>
       <center>
           <p style={{fontFamily: 'Trebuchet MS', fontSize:"35px"}}>OR</p>
       </center>
   </div>
   <div>
    <center>
        <form style={{fontFamily: 'Trebuchet MS', fontSize:"20px"}} onSubmit={() => this.login()}>
            <div class="container">

                <label for="phoneNumber"><b>Phone Number:</b></label>

                <input style={this.props.inputStyle}  onChange={(e) => this.handleLoginChange(e)} type="text" placeholder="Your Phone Number" name="phoneNumber" required/><br/>

                <label for="pinCode"><b>Pin Number:</b></label>

                <input style={this.props.inputStyle}  onChange={(e) => this.handleLoginChange(e)} type="pinNum" placeholder="Your Pin Number" name="pinCode" required/><br/>

                <button style={this.props.link} type="submit">Login</button>
            </div>
        </form>
            <div>
                <br/><button style={this.props.link} onClick={this.handleNewUser}>Create New Account</button>
            </div>
    </center>
   </div>
</div>
        )
    }
}
 