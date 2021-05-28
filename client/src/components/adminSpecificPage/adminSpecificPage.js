import React from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios'

class AdminSpeceficPage extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            loggedInUserRole: this.props.loggedInUserRole,
            loggedInUserGoogleData:this.props.loggedInUserGoogleData,
            socket : this.props.socket,
            eventTime : 90
        }

        this.startEvent = this.startEvent.bind(this)
        this.addTenMinutes = this.addTenMinutes.bind(this)
        this.endEvent = this.endEvent.bind(this)
        this.changeDuration = this.changeDuration.bind(this)
    }
    
    addUser(event){ //function that handles sending emails to users
        event.preventDefault();
        let input1 = document.querySelector('#addUserFormInput');
        let input2 = document.querySelector('#addRoleFormInput');
        let email = input1.value;
        let role = input2.value;
        input1.value = "";
        input2.value = "";
        window.alert(`${email} has been sent a confirmation link.`)
        axios.get(`http://localhost:8000/api/users/${email}/${role}`)
        emailjs.send("service_c02xz3j","template_j3hykjj",{to_name:email},"user_l5iqJQOFtkuJlrm5bzM8J")
    } //Kolby

    startEvent(event){
        event.preventDefault();
        if(!this.props.currentEvent.ongoing){
            let time = this.state.eventTime;
            this.props.currentEvent.ongoing = true;
            this.state.socket.emit('startEvent', time)
        }
    }

    changeDuration(){
        let input = parseInt(document.querySelector('#durationInput'))
        let newDuration = parseInt(document.querySelector('#durationInput').value)
        if(!isNaN(newDuration)){
            this.setState({eventTime:newDuration})
        }else{
            input.value = 'Please Enter a Number'
        }

    }

    addTenMinutes(){
        this.state.socket.emit('addTenToEvent')
    }

    endEvent(){
        this.state.socket.emit('forceEndEvent')
    }

    render(){
        return(
        <div className='adminSpecificPage-container'>
            <form id='addUserForm' onSubmit={this.addUser}>
                <span id='addUserTitle'>Add New User: </span>
                <input id='addUserFormInput' type="text" placeholder='Enter Email...'></input>
                <span id='addUserRoleTitle'>Decide their role: </span>
                <input id='addRoleFormInput' type="text" placeholder='Admin, Staff, or Student'></input>
                <input className='adminPageButton' type="submit"></input>
            </form>
            <div id='startEventForm'>
                {!this.props.currentEvent.ongoing && <span> Duration: {this.state.eventTime} minute(s)  </span>}
                {!this.props.currentEvent.ongoing && <button className='adminPageButton' onClick={this.startEvent}>Click To Start Event</button>}
                {!this.props.currentEvent.ongoing && <br/>}
                {!this.props.currentEvent.ongoing && <span>Change Duration:</span>}
                {!this.props.currentEvent.ongoing && <input id='durationInput' placeholder='Enter a Duration in Minutes'></input>}
                {!this.props.currentEvent.ongoing && <button className='adminPageButton' onClick={this.changeDuration}>Confirm</button>}
                {this.props.currentEvent.ongoing && <span> Event Ongoing </span>}
                {this.props.currentEvent.ongoing && <br/>}
                {this.props.currentEvent.ongoing && <button className='adminPageButton' id='addTenMinutes' onClick={this.addTenMinutes}>Add 10 Minutes to Current Event</button>}
                {this.props.currentEvent.ongoing && <button className='adminPageButton' id='endEvent' onClick={this.endEvent}>End Current Event</button>}
            </div>
        </div>
        )
    }
}
export default AdminSpeceficPage
