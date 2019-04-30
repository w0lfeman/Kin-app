import React, { Component } from 'react';
import NavBar from './NavBar'


export default class NewUser extends Component {

    state = {
       user: []
    }

    createUser = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/users/',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then( res => res.json())
        .then( user => {
            this.props.onSignUp(user.token, user)
        })
        .then( () => this.props.history.push('/login'))
    }

    handleNewUserChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        const { firstname, lastname, username, password, phone_number, pincode } = this.state.user
        return (
            <div>
                <div>
                    <NavBar/><br/>
                </div>
                <center>
                    <div>
                    <form style={{fontFamily: 'Trebuchet MS', fontSize:"20px"}} onChange={this.handleNewUserChange} onSubmit={this.createUser}>

                    First name:<br/>
                    <input style={this.props.inputStyle} type="text" name="firstname" value={firstname}/><br/>

                    Last name:<br/>
                    <input  style={this.props.inputStyle} type="text" name="lastname" value={lastname}/><br/>

                    User Name:(8 characters Minimum)<br/>
                    <input style={this.props.inputStyle} type="text" name="username" value={username}/><br/>

                    Password:(Case Sensitive)<br/>
                    <input  style={this.props.inputStyle} type="text" name="password" value={password}/><br/>

                    Phone Number:<br/>
                    <input  style={this.props.inputStyle} type="text" name="phone_number" value={phone_number}/><br/>

                    Custom Pin Code:<br/><input  style={this.props.inputStyle} type="text" name="pincode" value={pincode}/><br/><br/>

                    <button style={this.props.link}>Submit</button>
                    <button to='/login' style={this.props.link}>Back to Login</button>
                    </form>
                    </div>
                </center>
            </div>
        );
    }
}