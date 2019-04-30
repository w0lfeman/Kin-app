import React, { Component } from 'react';
import Login from './Login';
import NewContact from './NewContact';
import NewUser from './NewUser';
import UpdateContact from './UpdateContact';
import EditUser from './EditUser';
import AllContacts from './AllContacts';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import { Grid } from "semantic-ui-react"
import { withRouter } from 'react-router'

export default withRouter(class App extends Component {

    state = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token')
    }

    setUserInState = (token, user) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({ token, user })
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push({pathname: '/login'}
        )
    }

    render() {

        const link = {
            fontSize:"15px",
            borderRadius: '5px',
            padding: '5px',
            margin: '0 15px 15px',
            background: 'lightgray',
            color: 'black',
            fontFamily: 'Trebuchet MS',
            border:"1px solid black"
          }

          const inputStyle = {
            border: "1px solid",
            float:"center",
            padding:"4px", 
            borderRadius:"4px",
            backgroundColor:"#f8f8f8",
            fontFamily: 'Trebuchet MS',
            fontSize:"16px",
            width: "350px",
            height: "25px",
            margin: "4px",
            marginBottom: '5px'
          }

        const { firstname } = this.state.user
        return (
           
        <div>
        <div style={{float:'right', fontFamily: 'Trebuchet MS'}}>
            Welome, {firstname}! 
            <button style={link} onClick={this.handleLogout}>Logout</button>
        </div> 
        
        <Switch>
        <Route exact path="/Home" 
        render={ props => <AllContacts link={link} {...props} token={this.state.token}/>}/>

        <Route exact path="/Login" 
        render={ props => <Login inputStyle={inputStyle} link={link} {...props} onLogin={this.setUserInState}/>}/> 

        <Route exact path="/NewContact" 
        render={ props => <NewContact link={link} inputStyle={inputStyle} {...props} token={this.state.token}/>}/>

        <Route exact path="/NewUser" 
        render={ props => <NewUser link={link} inputStyle={inputStyle} {...props} onSignUp={this.setUserInState}/>}/>

        <Route exact path="/Contact/:id" 
        render={ props => <UpdateContact link={link} inputStyle={inputStyle} {...props} token={this.state.token}/>}/>

        <Route exact path="/EditUser/" 
        component={ props => <EditUser user={this.state.user} link={link} inputStyle={inputStyle} {...props} token={this.state.token} userStorage={this.setUserInState}/>}/>
        </Switch>
        </div>

        )
    }
})