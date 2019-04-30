import React, { Component } from 'react';
import NavBar from './NavBar'


export default class NewContact extends Component {

    state = {
        contact: {}
    }

    handleChange = (e) => {
        this.setState({
           contact: { ...this.state.contact, [e.target.name]:e.target.value }
        })
    }

    createContact = (e) => {
        e.preventDefault()
        let body = new FormData(e.target)
        fetch("http://localhost:3000/contacts",{
            method: 'POST',
            headers: {
                Authorization: `BEARER ${this.props.token}`
            },
            body: body
        })
            .then( res => res.json())
            .then( ({ id }) => this.props.history.push(`/home`))
    }

    
    render() {
        const {firstname, lastname, primary_number, secondary_number, profile_pic, relationship} = this.state.contact
        return (
            <div>
                <div>
                    <NavBar/><br/>
                </div>
                <center>
                <div>
                    <form style={{fontFamily: 'Trebuchet MS', fontSize:"20px"}} onChange={this.handleChange} onSubmit={this.createContact}>

                        First name:<br/><input style={this.props.inputStyle} type="text" name="firstname" value={firstname}/><br/> 

                        Last name:<br/><input style={this.props.inputStyle} type="text" name="lastname" value={lastname}/><br/>

                        Primary Phone Number:<br/><input style={this.props.inputStyle} type="text" name="primary_number" value={primary_number}/><br/>

                        Secondary Phone Number (optional):<br/><input style={this.props.inputStyle} type="text" name="secondary_number" value={secondary_number}/><br/>  

                        Upload Image File:<br/><label style={this.props.inputStyle} for="profile_pic">Upload Image</label><input value={profile_pic} style={{ visibility: 'hidden'}} type="file" id="profile_pic" name="profile_pic">
                        </input><br/> 

                        Relationship to You:<br/>
                        <select style={this.props.inputStyle} name='relationship' value={relationship} onChange={this.handleChange} >
                            <option value="None">None</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Friend">Friend</option>
                            <option value="Mom">Mom</option>
                            <option value="Dad">Dad</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Cousin">Cousin</option>
                            <option value="Grand Parent">Grand Parent</option>
                            <option value="Co-Worker">Co-Worker</option>
                            <option value="Uncle">Uncle</option>
                            <option value="Aunt">Aunt</option>
                        </select><br/><br/>

                        <button style={this.props.link}>Submit</button>
                    </form>
                </div>
                </center>
            </div>
        );
    }
}