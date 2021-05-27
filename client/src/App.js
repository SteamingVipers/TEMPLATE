import React from 'react'
import HomeLoginBtn from './components/loginFeatures/homeLoginBtn' //tyler
import HomeLogoutBtn from './components/loginFeatures/homeLogoutBtn' //tyler
import TopBar from './components/topBar/topbar' //tyler
import MessageHolder from './components/messageHolder/messageHolder'//tyler
import AdminPage from './components/adminSpecificPage/adminSpecificPage' //tyler
import PostMade from './components/postMade/postMade'
import RecentEvents from './components/recent/RecentEvents'
import axios from 'axios'

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      loggedInUserGoogleData: null,
      loggedInUserRole: null,
      currentTab: 'openevent',
      userId: 2,
      cohortId: 1,
      currentEvent : {
          ongoing : false,
          timeRemaining : 0,
          eventId : null
      },
      socket: socket
      //img
    }
  
  // bindings for functions
    this.changeTab = this.changeTab.bind(this)
    this.logInWithGoogleAuthentication = this.logInWithGoogleAuthentication.bind(this)
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/event')
      .then((response) => {
        this.setState({currentEvent : response.data.currentEvent})
        console.log(this.state.currentEvent)
      })

      this.state.socket.on('endEvent', () => {
        let eventUpdate = this.state.currentEvent;
        eventUpdate.ongoing = false;
        this.setState({currentEvent : eventUpdate})
        console.log(this.state.currentEvent)
      })

      this.state.socket.on('countDown', (event) => {
        let eventUpdate = this.state.currentEvent;
        eventUpdate = event;
        this.setState({currentEvent : eventUpdate})
        console.log(this.state.currentEvent)
      })
  }

    // functions
  changeTab(str){
    this.setState({currentTab: str}
    )
   
  }

  logInWithGoogleAuthentication(data1,data2){
    this.setState({
      loggedInUserGoogleData: data1,
      loggedInUserRole: data2
    })
    console.log(this.state.loggedInUserGoogleData);
  }


  // end of functions 
  render(){
    
    return (
      <div className='App'>
        {this.state.loggedInUserGoogleData === null && <HomeLoginBtn 
        logInWithGoogleAuthentication = {this.logInWithGoogleAuthentication}
        />}
        {this.state.loggedInUserGoogleData !== null&& <HomeLogoutBtn 
        logInWithGoogleAuthentication = {this.logInWithGoogleAuthentication}
        />}
        <TopBar
        loggedInUserGoogleData = {this.state.loggedInUserGoogleData}
        loggedInUserRole = {this.state.loggedInUserRole}
        changeTab = {this.changeTab}
        currentEvent = {this.state.currentEvent}
        socket = {this.state.socket}
        />
        {this.state.currentTab === "openevent" &&<MessageHolder 
        loggedInUserGoogleData = {this.state.loggedInUserGoogleData}
        loggedInUserRole = {this.state.loggedInUserRole}
        socket = {this.state.socket}
        currentEvent = {this.state.currentEvent}
        />}
        {this.state.currentTab === "mypost" && <PostMade
        id = {this.state.userId}
        />}
        {this.state.currentTab === 'recentEvents' && <RecentEvents
        cohortId = {this.state.cohortId}
      />}
        {this.state.currentTab === 'admin' && <AdminPage
        loggedInUserGoogleData={this.state.loggedInUserGoogleData}
        socket = {this.state.socket}
        currentEvent = {this.state.currentEvent}
        />}
      </div>
    );
  }
}

export default App;
