import React, { Component } from 'react';
import NavBar from './NavBar'
import { Card, Button } from 'react-bootstrap'

export default class AllContacts extends Component {

    state = {
        contacts: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/contacts`,{
            headers: {
                Authorization: `BEARER ${this.props.token}`
            }
        })
            .then( res => res.json())
            .then( contacts => this.setState({ contacts }))
    }

    handleEdit = (contact) => {
        this.props.history.push({pathname: `/contact/${contact.id}` })
      }

    render() {
        return (
            <div>
                <div>
                    <NavBar/><br/>
                </div>
                {this.state.contacts.map( contact => {
                    return (
                    <div>
                        
                        <Card style={{ width: '18rem', boxShadow:"0px 5px 25px 0px rgba(0,0,0,0.5)", padding:"15px 20px", borderRadius:"5px", float:"left", margin:"30px", border:"1px solid black"}}>

                        <Card.Img style={{width: '290px', height: '240px', borderRadius:"5px"}} variant="top" src={contact.profile_url} />

                        <Card.Body>
                        <Card.Title style={{fontFamily: 'Trebuchet MS'}}>{contact.firstname} {contact.lastname}</Card.Title>
                        <Card.Text>
                            <ul style={{fontFamily: 'Trebuchet MS'}}>
                                <li>Primary Number: <br/>{contact.primary_number}</li>
                                <li>Secondary Number: <br/>{contact.secondary_number}</li>
                                <li>Relationship: <br/>{contact.relationship}</li>
                            </ul>
                        </Card.Text>

                        <Button style={this.props.link} onClick={ () => this.handleEdit(contact)}>Edit Contact</Button>
                        </Card.Body>
                        </Card>
                        
                    </div>
                    )
                })
            }
        </div>
        )
    }
}


// {<div class="card" style={{width: '100%'}}>
// <ul style={{fontFamily: 'Trebuchet MS'}}>
// {<img src="" style={{borderRadius: '5px 5px 0 0'}}></img> */}
// <li>First Name: {contact.firstname}</li>
// <li>Last Name: {contact.lastname}</li>
// <li>Primary Number: {contact.primary_number}</li>
// <li>Secondary Number: {contact.secondary_number}</li>
// <li>Relationship: {contact.relationship}</li>
// <li>Contact Picture: <img style={contactCard} src={contact.profile_url} /></li>
//  </ul> */}