import React from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios'

class AdminSpeceficPage extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            loggedInUserRole: this.props.loggedInUserRole,
            loggedInUserGoogleData:this.props.loggedInUserGoogleData,
            socket : this.props.socket
        }

        this.startEvent = this.startEvent.bind(this)
    }
    
    addUser(event){ //function that handles sending emails to users
        event.preventDefault();
        let input = document.querySelector('#addUserFormInput');
        emailjs.send("service_c02xz3j","template_j3hykjj",{to_name:input.value},"user_l5iqJQOFtkuJlrm5bzM8J");
        input.value = "";
    } //Kolby

    startEvent(event){
        event.preventDefault();
        if(!this.props.currentEvent.ongoing){
            let time = 600;
            this.props.currentEvent.ongoing = true;
            this.state.socket.emit('startEvent', time)
        }
    }

    render(){
        return(
        <div className='adminSpecificPage-container'>
            <form id='addUserForm' onSubmit={this.addUser}>
                <span>Add New User: </span>
                <input id='addUserFormInput' type="text" placeholder='Enter Email...'></input>
                <br></br>
                <span>Decide their role: </span>
                <input id='addRoleFormInput' type="text" placeholder='Enter Role...'></input>
                <input type="submit"></input>
            </form>
            <form id='startEventForm' onSubmit={this.startEvent}>
                <span>Start Event:  </span>
                <input type="submit"></input>
            </form>
        </div>
        )
    }
}
export default AdminSpeceficPage
