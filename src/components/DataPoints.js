import './DataPoints.css';
import React, { useEffect, useState } from 'react'

const DataPoints = ( {order,angleRotatedData,typeOfDataRotation,setOrder,atoms,species, state, selectedPoint,removedData,dataX,dataY,dataZ,allMultiSpec, dataClicked,onRemoveData, onAddData} ) => {
    let rowsForTable = []
    const [finalRows, setFinalRows] = useState(rowsForTable)
    for(let i = 0; i< dataX.length;i++){
        rowsForTable = [...rowsForTable,[[allMultiSpec[i],dataX[i],dataY[i],dataZ[i]],i]]
    }
    const orderChanger = (e) => {
        let value = e.target.value.split(';')
        let values = []
        for(let i = 0; i< value.length; i++){
            values = [...values, parseInt(value[i])]
        }
        if(values.length === 4 && !values.includes(NaN)){
            setOrder(value.join(';'))
        }
    }
    useEffect(() => {
     let sorted = rowsForTable.sort((a, b) => {
        let numbers = order.split(';').map((element) => (parseInt(element)-1))
        if (a[0][numbers[0]] === b[0][numbers[0]]) {
            if (a[0][numbers[1]] === b[0][numbers[1]]) {
                if (a[0][numbers[2]] === b[0][numbers[2]]) {
                    if (a[0][numbers[3]] === b[0][numbers[3]]) {
                        return a[0][numbers[3]] - b[0][numbers[3]];
                    } else {
                        return a[0][numbers[3]] - b[0][numbers[3]];
                    }
                } else {
                    return a[0][numbers[2]] - b[0][numbers[2]];
                }
            } else {
                return a[0][numbers[1]] - b[0][numbers[1]];
            }
        } else {
          return a[0][numbers[0]] - b[0][numbers[0]];
        }
      });
      setFinalRows(sorted)

    }, [order,angleRotatedData,typeOfDataRotation])
     
      const downloadFiles = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
        }
        
        const downloadSpecies = (e) => {
            let txt = '# Thank you for using webystal. Your data is ready to be inserted into the fdf file\n\n'
            txt = txt + `NumberOfSpecies ${species.length}\nNumberOfAtoms ${finalRows.length-removedData.length} \n\n%block ChemicalSpeciesLabel\n`
            for(let i = 0; i<species.length; i++){
                txt = txt+ `${i+1}  ${species[i]}  ${atoms[species[i]-1]} \n`
            }
            txt = txt+ '%endblock ChemicalSpeciesLabel\n\nAtomicCoordinatesFormat Ang\n%block LatticeVectors\n'
            let lattice = [state.constantX[0],state.constantY[0],state.constantZ[0]]
            let multipliers = [state.repetitionX[0],state.repetitionY[0],state.repetitionZ[0]]
            for(let i =0; i< lattice.length;i++){
                let xThisRow = lattice[i][0]*multipliers[i]>=0?(lattice[i][0]*multipliers[i]).toFixed(9):(lattice[i][0]*multipliers[i]).toFixed(8)
                let yThisRow = lattice[i][1]*multipliers[i]>=0?(lattice[i][1]*multipliers[i]).toFixed(9):(lattice[i][1]*multipliers[i]).toFixed(8)
                let zThisRow = lattice[i][2]*multipliers[i]>=0?(lattice[i][2]*multipliers[i]).toFixed(9):(lattice[i][2]*multipliers[i]).toFixed(8)
                let row = ` ${xThisRow}  ${yThisRow}  ${zThisRow}\n`
                txt = txt + row
            }
            txt = txt +`%endblock LatticeVectors\n\n`
            txt = txt+ '%block AtomicCoordinatesAndAtomicSpecies\n'
            for(let i =0; i< finalRows.length;i++){
                let siestaSpecies = species.indexOf(finalRows[i][0][0])+1
                if(removedData.includes(finalRows[i][1])){
                    continue
                } else {
                    let dataXHere = finalRows[i][0][1]>=0?finalRows[i][0][1].toFixed(9):finalRows[i][0][1].toFixed(8)
                    let dataYHere = finalRows[i][0][2]>=0?finalRows[i][0][2].toFixed(9):finalRows[i][0][2].toFixed(8)
                    let dataZHere = finalRows[i][0][3]>=0?finalRows[i][0][3].toFixed(9):finalRows[i][0][3].toFixed(8)
                    let row = `  ${dataXHere}        ${dataYHere}        ${dataZHere}        ${siestaSpecies}\n`
                    txt = txt + row
                }
            }
            txt = txt + '%endblock AtomicCoordinatesAndAtomicSpecies'
            downloadFiles('WebyStyle.dat',txt)
          }

      const downloadXSF = (e) => {
        let txt = ' # crystal structure from Webystal\n CRYSTAL\n # Cell vectors in Angstroem:\n PRIMVEC\n'
        let lattice = [state.constantX[0],state.constantY[0],state.constantZ[0]]
        let multipliers = [state.repetitionX[0],state.repetitionY[0],state.repetitionZ[0]]
        for(let i =0; i< lattice.length;i++){
            let thisX = lattice[i][0]*multipliers[i]>=0?(lattice[i][0]*multipliers[i]).toFixed(9):(lattice[i][0]*multipliers[i]).toFixed(8)
            let thisY = lattice[i][1]*multipliers[i]>=0?(lattice[i][1]*multipliers[i]).toFixed(9):(lattice[i][1]*multipliers[i]).toFixed(8)
            let thisZ = lattice[i][2]*multipliers[i]>=0?(lattice[i][2]*multipliers[i]).toFixed(9):(lattice[i][2]*multipliers[i]).toFixed(8)
            let row = `  ${thisX}  ${thisY}  ${thisZ}\n`
            txt = txt + row
        }
        txt = txt + ' # Atom coordinates in Angstroem:\n PRIMCOORD\n'
        txt = txt +`    ${finalRows.length-removedData.length}    1\n`
        for(let i =0; i< finalRows.length;i++){
            if(removedData.includes(finalRows[i][1])){
                continue
            } else {
                let row = `  ${finalRows[i][0][0]}        ${finalRows[i][0][1].toFixed(8)}        ${finalRows[i][0][2].toFixed(8)}        ${finalRows[i][0][3].toFixed(8)}\n`
                txt = txt + row
            }
        }
        downloadFiles('WebyStyle.XSF',txt)
      }
  return (
    <div className='tableDiv'>
        <div className='aboveTable'>
            <div className='tableTitle'>
                Data Table
            </div>
            <div>
                <label className='sort'>
                Sort:
                </label>
                
                <input type='text' defaultValue={order} className = 'sortInput' onChange = {(e) => orderChanger(e)}></input>
            </div>
        </div>
       <table>
            <thead>
                <tr>
                    <th>Atomic Number</th>
                    <th>X - Coordinate</th>
                    <th>Y - Coordinate</th>
                    <th>Z - Coordinate</th>
                    <th>Delete </th>
                    <th> Add Back</th>
                    {/* <th>Substitute </th> */}
                </tr>
            </thead>
            <tbody>
            {finalRows.map((element,indElem) => (
                <tr key = {indElem}>
                    {element[0].map((val,indVal) => (
                        <td key = {indVal}  className = {selectedPoint === element[1]?'focusedData':removedData.includes(element[1])?'redSelected':''} onClick = {(numberData) => dataClicked(element[1])}>
                            {indVal === 0? val:val.toFixed(10)}
                        </td>
                    ))}
                     <td className = {selectedPoint === element[1]?'focusedData':removedData.includes(element[1])?'redSelected':''}>
                        <button name = {`${element[1]}`} className='remove' onClick={onRemoveData}>Remove</button>  
                    </td>
                    <td className = {selectedPoint === element[1]?'focusedData':removedData.includes(element[1])?'redSelected':''}>
                        <button name = {`${element[1]}`} className='add' onClick={onAddData}>Add</button>  
                    </td>
                    {/* <td className = {selectedPoint === element[1]?'focusedData':removedData.includes(element[1])?'redSelected':''}>
                        <button name = {`${element[1]}`} className='replace' onClick={onRemoveData}>Replace</button>  
                    </td> */}
                </tr>
            ))}
               
            </tbody>
        </table>
        <button className='download' onClick = {downloadXSF} >Download XSF</button>
        <button className='download' onClick = {downloadSpecies} >Download Species</button>
        
    </div>
  )
}

export default DataPoints