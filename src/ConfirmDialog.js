import './CSS_Files/ConfirmDialog.css' 

const ConfirmDialog = ({HideConfirm, ConfirmedYes}) => {
    return(
        <div className="confirm-overlay">
            <div className="confirm-body">
                <div className="confirm-title">Confirm Submission</div>
                <p className="confirm-description">Are you sure you want to submit?</p>
                <div className="confirm-btn-holder">
                    <button onClick={HideConfirm}>No</button>
                    <button onClick={ConfirmedYes}>Yes</button>
                </div>
            </div>
        </div> 
    )
}

export default ConfirmDialog