import './Rotations.css';

const Rotations = ( {onChangeStretches, stretches, angleRotatedData,onChangeDataRotationAngle,onChangeDataRotationType,state, onRotationChange, angles, onChangeState} ) => {
  return (
    <div className='rotOth'>
      <div className='rotations'>
            <label className='rotLab'>System Rotation</label>
            <div className='inputs'>
                <div className='oneInput'>
                  Z-Rotation
                  <input step = '1' type = 'number' value={angles[0]} name = 'x' onChange = {onRotationChange}/>
                </div>
                <div className='oneInput'>
                  Y-Rotation
                  <input step = '1' type = 'number' value={angles[1]} name = 'y' onChange = {onRotationChange}/>
                </div>
            </div>
          </div> 
          
          <div className='rotations'>
            <label className='rotLab'>Bounds</label>
            <div className='inputs'>
                <div className='oneInput'>
                  Maximum Bound
                  <input step = '0.1' name = 'maxBound' onChange = {onChangeState} type = 'number' defaultValue={state.maxBound}/>
                </div>
            </div>
       </div>
       <div className='rotations'>
            <label className='rotLab'>Data Rotation</label>
            <div className='butandangle'>
            <div className='DFR'>
                <div className='oneInput'>
                  <button className='download noMarginTop' value = 'x' onClick = {onChangeDataRotationType}>Rotate X</button>
                </div>
                <div className='oneInput'>
                  <button className='download noMarginTop' value = 'y' onClick = {onChangeDataRotationType}>Rotate Y</button>
                </div>
                <div className='oneInput'>
                  <button className='download noMarginTop' value = 'z' onClick = {onChangeDataRotationType}>Rotate Z</button>
                </div>
                <div className='oneInput'>
                  <button className='download noMarginTop' value = 'none' onClick = {onChangeDataRotationType}>None</button>
                </div>
            </div>
            <div>
              <label>Angle: </label>
              <input step = '5' name = 'maxBound' onChange = {onChangeDataRotationAngle} type = 'number' defaultValue={angleRotatedData}/>
              <sup> o</sup>
            </div>
            </div>
           
          </div> 
          <div className='rotations'>
            <label className='rotLab'>Data Stretch</label>
            <div className='butandangle'>
            <div className='DFR'>
               <input type="number" step = "0.2" title = {`xStretch`} onChange={onChangeStretches} value = {stretches[0]}></input>
               <input type="number" step = "0.2" title = {`yStretch`} onChange={onChangeStretches} value = {stretches[1]}></input>
               <input type="number" step = "0.2" title = {`zStretch`} onChange={onChangeStretches} value = {stretches[2]}></input>
            </div>
            </div>
           
          </div> 
       
    </div>
   
  )
}

export default Rotations