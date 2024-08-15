import QuestionPanel from './QuestionPanel'
import ScorePanel from './ScorePanel'
import CorrectionPanel from './CorrectionPanel.js'
import './CSS_Files/QuestionDisplayer.css'

const QuestionDisplayer = ({topics, allTopics, current_qst, getNxtQst, getBoardStatus, setBoardStatus, user_answer, getNextTopicId}) => {
    

    //Condition rendering of main content based on mode
    const Board = () => {
        if(getBoardStatus === 'questioning_mode'){
            return(
                <QuestionPanel 
                    current_qst_id={current_qst}
                    current_qstn={allTopics.topic.qstn}
                    optns={allTopics.topic.qstn[current_qst.id].optns}
                    selectedOptions={user_answer}
                    nextQst={getNxtQst}
                    boardStatus={setBoardStatus}
                />
            )
        }else if(getBoardStatus === 'result_mode'){
            return <ScorePanel
                        topic={allTopics.topic} 
                        answers={user_answer}
                        boardStatus={setBoardStatus}
                        nextQst={getNxtQst}
                        nextTopicId={getNextTopicId}
                        alltopics={allTopics}
                    />
        }else{
            return <CorrectionPanel 
                        current_qst_id={current_qst}
                        current_qstn={allTopics.topic.qstn}
                        optns={allTopics.topic.qstn[current_qst.id].optns}
                        selectedOptions={user_answer}
                        nextQst={getNxtQst}
                        boardStatus={setBoardStatus}
                        alltopics={allTopics}
                        nextTopicId={getNextTopicId}
                        topics={topics}
                    />
        }
    }

    return(
        <div className="qst-board">
            <div className="current-topic">{allTopics.topic.topic}</div>
            <Board />
        </div>
    )
}

export default QuestionDisplayer