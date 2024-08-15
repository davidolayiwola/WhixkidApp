import { useState } from 'react'
import './CSS_Files/SideBar.css'

const SideBar = ({ getNextId, topics, setBoardStatus, user_answer }) => {

    //Update hamburger status switch between hamburger and cancel button
    const [hamburgerstatus, setHamburgerstatus] = useState(true)
    const [hideOrShowTopics, setHideOrShowTopics] = useState({display: 'none'})

    //Manage toggle between hamburger and cancel button
    const HandleTopicToggle = () => {
        hamburgerstatus ? ChangeToClose() : ChangeToHamburger()
    }

    //Change button from hamburger to close
    const ChangeToClose = () =>{
        setHamburgerstatus(false)
        setHideOrShowTopics({display: 'flex'})
    }

    //Change button close to hamburger
    const ChangeToHamburger = () => {
        setHamburgerstatus(true)
        setHideOrShowTopics({display: 'none'})

       
    }

    //Change to a new topic
    const ChangeTopic = (event) => {
        user_answer.length = 0
        getNextId(parseInt(event.target.id) - 1)
        ChangeToHamburger()
        setBoardStatus('questioning_mode')//Change mode

        //Remove color of checked question
        const allQstBox = document.getElementsByClassName('checked-qst');
        for(let i = 0; i < allQstBox.length; i++){
            allQstBox[i].style.backgroundColor = '#eee'
                allQstBox[i].style.color = 'black'
        }

    }

    return(
        <div className='topic-container'>
            <div className='topic-header'>
                <span>Topics</span>
                {hamburgerstatus && <div 
                    className='hamburger-box' 
                    onClick={HandleTopicToggle} 
                >
                    =
                </div>}
                {!hamburgerstatus && <div 
                    className='hamburger-box' 
                    onClick={HandleTopicToggle}
                >
                    x
                </div>}
            </div>
            <div className='topics-container' id='topics-container' style={hideOrShowTopics}>
            
                {topics.map(
                    (eachtopic) => {
                        return(
                            <button 
                                className='btn-topic' 
                                key={eachtopic.id}
                                id={eachtopic.id}
                                onClick={(event) => ChangeTopic(event)}
                            >
                                {eachtopic.topic}
                            </button>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default SideBar