import React, { Component } from 'react';
import NavBar from './NavBar'

export default class UpdateContact extends Component {

    state = {
        contact: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/contacts/${this.props.match.params.id}`,{
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        })
        .then( res => res.json())
        .then ( contact => this.setState({ contact }))
    }

    handleEditSubmit = (e) => {
        e.preventDefault()
     
        fetch(`http://localhost:3000/contacts/${this.props.match.params.id}`, {
        headers:  {
            'Content-Type':'application/json',
            Authorization: `Bearer ${this.props.token}`
        },
        method: 'PATCH',
        body: JSON.stringify(this.state.contact)
        })
        .then( () => this.props.history.push('/home'))
      }


      deleteContact = (e) => {
          e.preventDefault()
          fetch(`http://localhost:3000/contacts/${this.props.match.params.id}`,{
              method: 'DELETE',
              headers: {
                  'Content-Type':'application/json',
                  Authorization: `Bearer ${this.props.token}`
              }
          })
          .then( () => this.props.history.push('/home'))
      }

        handleChange = (e) => {
            this.setState({
                contact: {...this.state.contact,
                [e.target.name]:e.target.value}
            })
        }

    render() {
        const { firstname, lastname, primary_number, secondary_number, relationship, profile_pic} = this.state.contact
        return (
            <div>
               <div>
                    <NavBar/><br/>
                </div>
                <div>
                    <center>
                    <form style={{fontFamily: 'Trebuchet MS', fontSize:"20px"}} onChange={this.handleChange} onSubmit={(e) => this.handleEditSubmit(e)}>

                        First name:<br/><input style={this.props.inputStyle} type="text" name="firstname" value={firstname}/><br/> 

                        Last name:<br/><input style={this.props.inputStyle} type="text" name="lastname" value={lastname}/><br/>

                        Primary Phone Number:<br/><input style={this.props.inputStyle} type="text" name="primary_number" value={primary_number}/><br/>

                        Secondary Phone Number (optional):<br/><input style={this.props.inputStyle} type="text" name="secondary_number" value={secondary_number}/><br/> 

                        Upload Image File:<br/><button value={profile_pic} style={this.props.link} type="file" name="profile_pic">Upload Image</button><br/> 

                        Relationship to You:<br/>
                        <select style={this.props.inputStyle} value={relationship} onChange={this.handleChange}>
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

                        <button style={this.props.link}>Submit Changes</button>
                        
                    </form>
                    <button style={this.props.link} onClick={this.deleteContact}>Delete Contact</button>
                    </center>
                </div>
            </div>
        );
    }
}