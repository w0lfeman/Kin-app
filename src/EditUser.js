import React, { Component } from 'react';
import NavBar from './NavBar'


export default class EditUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: props.user
        }
    }

    handleEditSubmit = (e) => {
        e.preventDefault()
        this.props.userStorage(this.props.token, this.state.user)
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `BEARER ${this.props.token}`
        },
        method: 'PATCH',
        body: JSON.stringify(this.state.user)
      })
        .then( ({ id }) => this.props.history.push(`/home`))
      }

      handleChange = (e) => {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
      }

    render() {
        const { firstname, lastname, phone_number, pincode, password} = this.state.user
        return (
            <div>
                <div>
                    <NavBar contact={this.state.user}/><br/>
                </div>
                <div>
                    <center>
                    <form style={{fontFamily: 'Trebuchet MS', fontSize:"20px"}} onChange={this.handleChange} onSubmit={this.handleEditSubmit}>

                    First name:<br/><input style={this.props.inputStyle} type="text" name="firstname" value={firstname}/><br/> 

                    Last name:<br/><input style={this.props.inputStyle} type="text" name="lastname" value={lastname}/><br/>

                    Phone Number:<br/><input style={this.props.inputStyle} type="text" name="phone_number" value={phone_number}/><br/>

                    Password:<br/><input style={this.props.inputStyle} type="text" name="password" value={password}/><br/>

                    Custom Pin Code:<br/><input style={this.props.inputStyle} type="text" name="pincode" value={pincode}/><br/><br/>

                    <button style={this.props.link}>Submit Changes</button>
                    </form>
                    </center>
                </div>
            </div>
        );
    }
}