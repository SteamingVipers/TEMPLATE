import React from 'react'
import emailjs from 'emailjs-com';
class AdminSpeceficPage extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            loggedInUserRole: this.props.loggedInUserRole,
            loggedInUserGoogleData:this.props.loggedInUserGoogleData,
        }
    }
    
    addUser(event){
        event.preventDefault();
        let input1 = document.querySelector('#addUserFormInput');
        let input2 = document.querySelector('#addRoleFormInput');
        emailjs.send("service_c02xz3j","template_j3hykjj",{to_name:input1.value,role:input2.value},"user_l5iqJQOFtkuJlrm5bzM8J");
        input1.value = "";
        input2.value = "";
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
        </div>
        )
    }
}
export default AdminSpeceficPage
