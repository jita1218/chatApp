import React from 'react'
import "./genBox.css";

const GenBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='genbox'>
      <div className='form-control'>
	  <label className={`box ${selectedGender === "male" ? "selected" : ""}`}>
					<span style={{font:"menu", fontSize:'1rem'}} >Male</span>
					<input
						type='checkbox'
						className='checkbox'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>

            <div className='form-control'>
			<label className={`box ${selectedGender === "female" ? "selected" : ""}`}>
					<span style={{font:"menu", fontSize:'1rem'}} >Female</span>
					<input
						type='checkbox'
						className='checkbox'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
    </div>
  )
}

export default GenBox
