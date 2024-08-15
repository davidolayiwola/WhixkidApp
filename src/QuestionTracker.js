import './CSS_Files/QuestionTracker.css'

const QuestionTracker = ({allTopics, getNxtQst, user_answer}) => {

	//Change question
	const ChangeQst = (event) => {
	    let id = parseInt(event.target.id.split('-')[0])

	    getNxtQst({id: id, value: user_answer[id]}) //Extract digits from id

	    window.scrollTo(0, 0)
	}


	return(
		<div className="qst-tracker">
            {
                allTopics.qstn.map(
                    (nxt_qst) => {
                        return(
                            <button  
                                key={nxt_qst.id + 1}
                                id={nxt_qst.id + "-id"}
                                className='checked-qst'
                                onClick={(event) => ChangeQst(event)}
                            >
                                {nxt_qst.id + 1}
                            </button>
                        )
                    }
                )
            }
        </div>
	)
}

export default QuestionTracker