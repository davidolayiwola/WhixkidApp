import './CSS_Files/ScorePanel.css'

const ScorePanel = ({ topic, answers, boardStatus, nextQst, nextTopicId , alltopics}) => {
    var result = 0

    //Compute results
    for(let i = 0; i < topic.ans.length; i++){
        if(topic.ans[i] === answers[i]){
            result++;
        }
    }

    const ShowCorrection = () => {
        boardStatus('correction_mode')
        nextQst({id: 0, value: answers[0]})
       
    }

    const NextTopic = () => {
         answers.length = 0
        boardStatus('questioning_mode')//Change mode
        nextTopicId(alltopics.id + 1)

        //Remove color of checked question
        const allQstBox = document.getElementsByClassName('checked-qst');
        for(let i = 0; i < allQstBox.length; i++){
            allQstBox[i].style.backgroundColor = '#eee'
                allQstBox[i].style.color = 'black'
        }
    }

    //Shade correct and wrong answers 
    const allQstBox = document.getElementsByClassName('checked-qst');
    for(let i = 0; i < allQstBox.length; i++){
            if(topic.ans[i] === answers[i]){
                allQstBox[i].style.backgroundColor = '#579dcf'
                allQstBox[i].style.color = 'white'
            }else{
                allQstBox[i].style.backgroundColor = 'coral'
                allQstBox[i].style.color = 'white'
            }
    }

    //Move to next topic if all answers are correct
    if(topic.ans.length === result){
        return(
            <div className='score-panel'>
                <p>Your score is {result}/{topic.ans.length}</p><br/>
                <p>Click the button below to go to next topic</p><br/>
                <button onClick={NextTopic}>Next Topic</button>
            </div>
        )
    }else{//Display correction if some answers are incorrect
        return(
            <div className='score-panel'>
                <p>Your score is {result}/{topic.ans.length}</p><br/>
                <p>Click the button below to view correction</p><br/>
                <button onClick={ShowCorrection}>View Correction</button>
            </div>
        )
    }
}

export default ScorePanel