import { useState } from 'react'
import './CSS_Files/TimePanel.css'

const TimePanel = () => {
	const [time, setTime] = useState(false)

	return(
		<div className='time-panel'>
			<div className='time-yourself'>
				<button>Time Yourself</button>
			</div>
			{time &&
				<>
					<div className='select-box'>
		 				<select>
		 					<option>30 mins</option>
		 					<option>60 hr</option>
		 					<option>90 mins</option>
		 					<option>120 mins</option>
		 					<option>Others</option>
		 				</select>
		 			</div>
		 			<div className='display-time-left'>Time: </div>
				</>
	 		} 
		</div>
	)
}
export default TimePanel