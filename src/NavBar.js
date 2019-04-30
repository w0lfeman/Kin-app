import React, { Component } from 'react';
import Logo from "./kin-logo.svg"
import { NavLink } from "react-router-dom"
import background from "./blue-background.jpg"

const link = {
    width:"px",
    fontSize:"17px",
    borderRadius: '4px',
    padding: '5px',
    margin: '0 4px 4px',
    background: 'lightgray',
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Trebuchet MS',
    border:"1px solid black"
  }    

  const border = {
      bordertop: 'solid',
      borderColor: 'black',
      padding: '20px'
      }

  

export default class NavBar extends Component {

    
    render() {
        
        return (
        <div style={{backgroundImage: "url(" + background + ")", backgroundSize:"cover"}}>
            <div>
                <center>
                    <img src={Logo} width="200" height="200" />
                </center>
            </div>

            <div style={border}>
            <center>
                <NavLink to='/home' style={link}>All Contacts</NavLink>

                <NavLink to='/newContact' style={link}>Create New Contact</NavLink>

                <NavLink to='/editUser/' style={link}>Edit User Profile</NavLink>
            </center>
            </div>
        </div>
        );
    }
}


