import Message from './Message'

const Events = ({currentEvent})=>{
    return(
        <div className = 'Event'>
                {currentEvent.map((msg)=>{
                    return(
                        //if we include more stuff can refactor by adding more props
                        <Message msgText = {msg}/>
                    )
                })

                }
        </div>
    )
}

export default Events