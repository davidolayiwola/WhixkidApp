import { useState } from "react"
import ConfirmDialog from "./ConfirmDialog"
import './CSS_Files/QuestionPanel.css'

const QuestionPanel = ({ current_qst_id, current_qstn, optns, selectedOptions, nextQst, boardStatus }) => {
    const [showConfirm, toggleConfirmDisplay] = useState(false)
    
    const HideConfirm = () => {
        toggleConfirmDisplay(false)
    }
    const ConfirmedYes = () => {
        toggleConfirmDisplay(false)
        boardStatus('result_mode')
    }

    /*
        Conditional rendering of submit button at last question for each topic
    */
    const ShowSubmit = () => {
        if(current_qst_id.id === current_qstn.length - 1){
            return(
                <button 
                className='next-btn submit-work'
                onClick={HandleSubmit}
                >Submit</button>
            )
        }else{
            return(
                <button 
                    className={'next-btn'}
                    onClick={NextQst}
                >
                    Next
                </button>
            )
        }
    }

    //Go to next question
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

    //Dispaly comfirm dialog box to ensure user intentional submission
    const HandleSubmit = () => {
       toggleConfirmDisplay(true) //show-react-confirm
       
    }

    //Controlled component upadating user selected options 
    const HandleChosenOption = event => {
        event.preventDefault()
        selectedOptions[current_qst_id.id] = event.target.value 
        nextQst({id: current_qst_id.id, value: event.target.value})

        //document.getElementById('uuu').innerHTML = 'Well done it is ' + selectedOptions[current_qst_id.id]

        const current_question = document.getElementById(current_qst_id.id + '-id');
        current_question.style.backgroundColor = '#579dcf'
        current_question.style.color = 'white'
    }

    //store option alphabet in an array
    const optnLetter = ['A', 'B', 'C', 'D', 'E']

    return (
        <div className='qst-panel'>
            <div className='qst-frame'>
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
                                    </li>
                                )
                            }
                        )
                    }

                    
                </ul>
            </div>
            <div className="pagination-box">
                <button onClick={PrevQst} className='next-btn'>Prev</button>
                <ShowSubmit />
            </div>
            {
                showConfirm &&
                <ConfirmDialog 
                HideConfirm={HideConfirm}
                ConfirmedYes={ConfirmedYes}
            />
            }

        </div>

    )

}

export default QuestionPanel