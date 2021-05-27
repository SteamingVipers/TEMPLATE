import React from 'react'
import axios from 'axios'
import Events from './Events'
class RecentEvents extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arrOfMessages: [],
           
        }    
       
    }     
   
    render(){
       
        if(this.state.arrOfMessages.length === 0 && this.props.cohortID !== null){
            //different route for query into cohort
            axios.get(`http://localhost:8000/api/cohort/${this.props.cohortID}`)
                .then(res =>{
                    const arrOfMessages = res.data;
                    this.setState({arrOfMessages:arrOfMessages})
                })
        }
        const eventList = {}
        //need actual prop of text & event number from msg query
        this.state.arrOfMessages.forEach((elem)=>{
            if(!eventList[elem.event]){
              eventList[elem.event]= [];
              eventList[elem.event].push(elem.msg) 
            }else{
              eventList[elem.event].push(elem.msg) 
            }
          }
          )
          //turn obj into array of arrays 
          let arrOfArr=[]
          {for(let key in eventList){
            arrOfArr.push(eventList[key])
            //array of array of messages
        }}
            
            
        return(
           <div className = 'cohort'>
               {
                   arrOfArr.map(elem=>{
                       return(
                           //this is passing an arr Of messages from Event
                           <Events currentEvent = {elem} />
                       )
                   })
                }   
           </div>
            
        )
    }
}
export default RecentEvents