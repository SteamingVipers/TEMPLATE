import React from 'react'

class Topbar extends React.Component{
    constructor(props){
        super(props)   

        this.state = {
            socket : this.props.socket
        }
    }
    render(){
        let userImg;
        if(this.props.loggedInUserGoogleData){
            userImg = this.props.loggedInUserGoogleData.imageUrl
        }
        return(
            <div className='topBarContainer'>
                <div id='buttonContainer'>
                <button className='topBarButton' id='userProfileButton' onClick={()=>{this.props.changeTab('userProfile')}}><img id='userImage' height='40px' src={userImg}></img></button>
                    <button className='topBarButton' id='recentEvents' onClick={()=>{this.props.changeTab('recentEvents')}}>Recent Events</button>
                    <button className='topBarButton' id='cohortData' onClick={()=>{this.props.changeTab('cohortData')}}>Cohort Data</button>
                    {this.props.loggedInUserRole === 'Admin'&&<button className='topBarButton' id='adminButton'onClick={()=>{this.props.changeTab('admin')}}>Admin</button>}
                    {this.props.currentEvent.ongoing === true && <button className='topBarButton' id='shoutoutsButton' onClick={()=>{this.props.changeTab('openevent')}}>Open Shoutout - {this.props.currentEvent.timeRemaining}</button> }
                    
                </div>
            </div>
        )
    }
}
export default Topbar