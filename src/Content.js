import SideBar from './SideBar.js'
//import { Topics  } from "./QuestionBank.js"
import { useState, useEffect } from 'react'
import QuestionDisplayer from './QuestionDisplayer.js'
import TimePanel from './TimePanel.js'
import QuestionTracker from './QuestionTracker.js'
import './CSS_Files/Content.css'

const userAnswer = [] //Store user selected options

const Content = () => {
    const [Topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState(undefined)

    /*Keep track of changes in topic to rerender main content componen*/
    const [topic_id, setQst_dtails] = useState(0)

    /*Keep tract of changes in question to rerender question panel component*/
    const [current_qst, setCurrent_qst] = useState({id: 0, value: ''})

    /*
        keep track of user event to switch in between mode(questioning, show_score and correction)

    */
    const [boardStatus, setBoardstatus] = useState('questioning_mode')

    //Fetch Question from server
    useEffect(
        () => {
            const getQuestions = async () => {
                try{
                    const response = await fetch('db.json')
                    if(!response.ok) throw Error("Could not load questions")

                    const topicDetail = await response.json()
                    console.log(topicDetail)

                    setTopics(topicDetail)
                }catch(err){
                    //console.log(err.message)
                    setFetchError(err.message)
                }
                finally{
                    setIsLoading(false)
                }
            }

            setTimeout(
                () => {
                    (async () => await getQuestions())()
                }, 2000
            )
        }
        ,[]
    )

    /*Manage changes in topic*/
    const ChangeTopicId = (id) => {
        setQst_dtails(id)
        setCurrent_qst({id: 0, value: ''}) 
    }

    /*Manage changes in question*/
    const ChangeQstId = (obj) => {
        setCurrent_qst({id: obj.id, value: obj.value})
    }

    /*Manage switch in mode of user event */
    const ChangeBoardContent = (status) => {
        setBoardstatus(status)
    }

    return(
        <div className='section'>
            {isLoading && <p style={{fontSize: '1.5rem',padding: '2rem',textAlign: 'center'}}
                >Loading Questions...</p>
            }
            {fetchError && <p style={{fontSize: '1.2rem',padding: '2rem',textAlign: 'center',color: 'red'}}>
            {`Error Occurred: ${fetchError}`}</p>}
            {!fetchError && !isLoading &&
                <>
                    <div className='large-devices'>
                        <div className='medium-devices'>
                            <SideBar 
                                getNextId={ChangeTopicId} 
                                topics={Topics}
                                setBoardStatus={ChangeBoardContent}
                                user_answer={userAnswer}
                            />
                            <QuestionDisplayer 
                                topics={Topics}
                                allTopics={{topic: Topics[topic_id], id: topic_id}}
                                getNextTopicId={ChangeTopicId}
                                current_qst={current_qst}
                                getBoardStatus={boardStatus}
                                getNxtQst={ChangeQstId}
                                setBoardStatus={ChangeBoardContent}
                                user_answer={userAnswer}
                            />
                        </div>
                        <TimePanel />
                    </div>
                    <QuestionTracker 
                        allTopics={Topics[topic_id]}
                        getNxtQst={ChangeQstId} 
                        user_answer={userAnswer}
                    />
                </>
            }
        </div>
    )
} 

export default Content