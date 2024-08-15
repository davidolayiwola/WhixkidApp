const CorrectionPanel = ({current_qst_id, current_qstn, optns, selectedOptions, nextQst, 
    boardStatus , alltopics, nextTopicId, topics}) => {

	const ShowNextTopic = () => {
        if(current_qst_id.id === current_qstn.length - 1){
            if(alltopics.id < topics.length - 1){
                 console.log(`curent topic: ${alltopics.id}, topic length: ${topics.length}`)

                return(
                    <button 
                    className='next-btn submit-work'
                    onClick={HandleNextTopic}
                    >Next Topic</button>
                )
            }
        }else{
            return(
                <button 
                    className={'next-btn nxt-qst'}
                    onClick={NextQst}
                >
                    Next
                </button>
            )
        }
    }

    const NextQst = () => {
        if(current_qst_id.id < current_qstn.length - 1){ //Stop at last question
            nextQst({id: current_qst_id.id + 1, value: selectedOptions[current_qst_id.id + 1]})
        }
    }

    const PrevQst = () => {
        if(current_qst_id.id > 0){ //Stop at first question
            nextQst({id: current_qst_id.id - 1, value: selectedOptions[current_qst_id.id - 1]})
        }
    }

    const HandleNextTopic = () => {
        selectedOptions.length = 0
        boardStatus('questioning_mode')//Change mode
        nextTopicId(alltopics.id + 1)

        //Remove color of checked question
        const allQstBox = document.getElementsByClassName('checked-qst');
        for(let i = 0; i < allQstBox.length; i++){
            allQstBox[i].style.backgroundColor = '#eee'
                allQstBox[i].style.color = 'black'
        }
    }

    const HandleChosenOption = (event) => {
    	event.preventDefault()
    }

	//store option alphabet in an array
    const optnLetter = ['A', 'B', 'C', 'D', 'E']

    return (
        <div>
            <p className="current-qst">{current_qst_id.id + 1}. {current_qstn[current_qst_id.id].question}</p>
            <ul>
                {
                    optns.map(
                        (optn, index) => {
                            return (
                                <li key={optnLetter[index]}>
                                    <input
                                        type='radio' 
                                        name={current_qst_id.id}
                                        value={optnLetter[index]}
                                        onChange={event => HandleChosenOption(event)}
                                        checked={optnLetter[index] === current_qst_id.value ? true : false } //Cheched selected option at rendfering
                                    /> {optn}
                                    {
                                        optnLetter[index] === selectedOptions[current_qst_id.id] ? 
                                        optnLetter[index] === alltopics.topic.ans[current_qst_id.id] ? <em> &#x2714;</em> : 
                                        <em> &#x2718;</em> : null
                                    }
                                </li>
                            )
                        }
                    )
                }

                
            </ul>
            {
                selectedOptions[current_qst_id.id] !== alltopics.topic.ans[current_qst_id.id] ?
                <div className="show-ans">The answer is {alltopics.topic.ans[current_qst_id.id]}</div>
                : null
            }
            <div className="pagination-box">
                <button onClick={PrevQst} className='next-btn'>Prev</button>
                <ShowNextTopic />
            </div>

        </div>

    )
}

export default CorrectionPanel