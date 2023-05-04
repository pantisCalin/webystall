import './App.css';
import Structure from './components/Structure';
import Rotations from './components/Rotations';
import { useState, useEffect } from 'react';
import UploadFiles from './components/UploadFiles';
import SpeciesControl from './components/SpeciesControl';
import DataPoints from './components/DataPoints';

function App() {
  useEffect(() => {
    console.log('Webystal. Created by Pantis Calin')
  }, [])
  
  const atoms = "H,He,Li,Be,B,C,N,O,F,Ne,Na,Mg,Al,Si,P,S,Cl,Ar,K,Ca,Sc,Ti,V,Cr,Mn,Fe,Co,Ni,Cu,Zn,Ga,Ge,As,Se,Br,Kr,Rb,Sr,Y,Zr,Nb,Mo,Tc,Ru,Rh,Pd,Ag,Cd,In,Sn,Sb,Te,I,Xe,Cs,Ba,La,Ce,Pr,Nd,Pm,Sm,Eu,Gd,Tb,Dy,Ho,Er,Tm,Yb,Lu,Hf,Ta,W,Re,Os,Ir,Pt,Au,Hg,Tl,Pb,Bi,Po,At,Rn,Fr,Ra,Ac,Th,Pa,U,Np,Pu,Am,Cm,Bk,Cf,Es,Fm,Md,No,Lr,Rf,Db,Sg,Bh,Hs,Mt,Ds,Rg,Cn,Uut,Fl,Uup,Lv,Uus,Uuo".split(',')
  const [toShowPannel, setToShowPannel] = useState('Elements')
  const [order,setOrder] = useState('1;2;3;4')

  // State constants
  const [state,setState] = useState({
    showAxis:true,
    maxBound:2.4,
    translateX:[0],
    translateY:[0],
    translateZ:[0],
    repetitionX:[1],
    constantX:[[3,0,0]],
    repetitionY:[1],
    constantY:[[0,3,0]],
    repetitionZ:[1],
    constantZ:[[0,0,3]],
  })

  // Chaging states that are single valued
  const onChangeState = (e) => {
    let name = e.target.name
    let value = e.target.value
    setState({
      ...state,
      [name]:value,
    })
  }

  // Chaging states that are arrayed valued
  const onChangeStateArray = (e) => {
    let name = e.target.name
    let value = parseFloat(e.target.value) || 0
    let theIndex = parseInt(e.target.title.split(' ')[1])
    setState({
      ...state,
      [name]: [
        ...state[name].slice(0,theIndex),
        value,
        ...state[name].slice(theIndex+1)
      ]
    })
  }

   // Chaging states that are double order arrayed valued
   const onChangeStateArrayDouble = (e) => {
    let name = e.target.name
    let value = parseFloat(e.target.value) || 0
    let theIndex = parseInt(e.target.title.split(' ')[1])
    let theIndexAtom = parseInt(e.target.title.split(' ')[3])-1
    setState({
      ...state,
      [name]: [
        ...state[name].slice(0,theIndex),
        [
          ...state[name][theIndex].slice(0,theIndexAtom),
            value,
          ...state[name][theIndex].slice(theIndexAtom+1)
        ],
        ...state[name].slice(theIndex+1)
      ]
    })
  }

  // List of Constants
  const [angles, setAngles] = useState([0,0])
  const [visualDistance, setVisualDistance] = useState(10)
  const [stretches, setStretches] = useState([0,0,0])
  const [clickStatus, setClickStatus] = useState(false)
  const [positionMouse, setPositionMouse] = useState([0,0])
  const [dataToPlotX, setDataToPlotX] = useState([1,2,3])
  const [dataToPlotY, setDataToPlotY] = useState([1,2,3])
  const [dataToPlotZ, setDataToPlotZ] = useState([1,2,3])
  const [speciesAtoms, setSpeciesAtoms] = useState([1,1,1])
  const [species, setSpecies] = useState([1])
  const [selectedPoint, setSelectedPoint] = useState(100)
  const [removedData, setRemovedData] = useState([])
  const [typeOfDataRotation, setTypeOfDataRotation] = useState('none')
  const [angleRotatedData, setAngleRotatedData] = useState(180)

  // Matrix multiplication
  const matrixMultiplication = (mat1,mat2) => {
    let resultantMatrix = []
    for(let i =0; i<mat2[0].length;i++){
      let oneRow = []
        for(let j =0; j<mat1.length;j++){
        let oneTerm = 0
        for(let k =0; k<mat1.length;k++){
          oneTerm += parseFloat((mat1[j][k]*mat2[k][i]).toFixed(10))
        }
        oneRow.push(oneTerm)
      }
      resultantMatrix.push(oneRow)
    }
    return(resultantMatrix)
  }
  // Uploading files
  const onUploadedFile = (e) => {
    let setX = []
    let setY = []
    let setZ = []
    let setSpec = []
    let allLatConst = []
    let speciesInCome = []

    let length = e.target.files.length
    for(let fil = 0; fil<length; fil++){
      var theFile = e.target.files[fil]
      let reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const bigXSF = text.includes('INFO')
        let splittedText = text.split(/PRIMVEC\n|PRIMCOORD\n|CONVVEC\n|ATOMS\n|FRAMES\n/) 
        let primVec = (splittedText[1].split('\n')).slice(0,3)
        let primCoord 
        if(bigXSF) {
          primCoord = splittedText[6].split('\n')
        } else {
          primCoord = splittedText[2].split('\n')
        }
        let primitiveVectors = []
        primVec.forEach(element => {
          let row = element.split(' ').filter((fileElem) =>( fileElem.length>0))
          primitiveVectors = [...primitiveVectors,row.map((element) => (parseFloat(element)))]
        });

        allLatConst = [...allLatConst,primitiveVectors]
        let indexToStart = bigXSF? 0:1
        let datX = []
        let datY = []
        let datZ = []
        let species = []
        for(let i = indexToStart; i<primCoord.length;i++){
          let row = primCoord[i].split(' ').filter((fileElem) =>( fileElem.length>0))
          if(row.length>0){
            species = [...species,parseInt(row[0])]
            datX = [...datX,parseFloat(row[1])]
            datY = [...datY,parseFloat(row[2])]
            datZ = [...datZ,parseFloat(row[3])]
          } 
        }

        setX = [...setX,...datX]
        setY = [...setY,...datY]
        setZ = [...setZ,...datZ]
        setSpec = [...setSpec,...species]

        let allSeciesInOneFor = []
        for(let i = 0; i< species.length; i++){
          let thSpec = species[i]
          if(!allSeciesInOneFor.includes(thSpec)){
            allSeciesInOneFor = [...allSeciesInOneFor,thSpec]
          }
        }
        speciesInCome = [...speciesInCome,allSeciesInOneFor]

   
        if(fil === length-1){
          setDataToPlotX(setX)
          setDataToPlotY(setY)
          setDataToPlotZ(setZ)
          setSpeciesAtoms(setSpec)
          let arrInBetween = []
          for(let i = 0; i<speciesInCome.length; i++){
            for(let j = 0; j<speciesInCome[i].length; j++){
              arrInBetween = [...arrInBetween,[speciesInCome[i][j],i]]
            }
          }
          speciesInCome = [...arrInBetween.sort((a,b) => a[0]-b[0])]
          let allSecies = []
          for(let i = 0; i< setSpec.length; i++){
            let thSpec = setSpec[i]
            if(!allSecies.includes(thSpec)){
              allSecies = [...allSecies,thSpec]
            }
          }
          let xConstXPush = []
          let yConstXPush = []
          let zConstXPush = []
          for(let j = 0; j<speciesInCome.length; j++){
            let speciesSet = speciesInCome[j][0]
            let theIndex  = speciesInCome[j][1]
            for(let i = 0; i<allSecies.length;i++){
              let lookSpecies  = allSecies[i]
              if(speciesSet === lookSpecies){

                xConstXPush = [...xConstXPush,allLatConst[theIndex][0]]
                yConstXPush = [...yConstXPush,allLatConst[theIndex][1]]
                zConstXPush = [...zConstXPush,allLatConst[theIndex][2]]
                break
              }
            }
          }
       
          setState({
            ...state,
            'translateX':Array(allSecies.length).fill(0),
            'translateY':Array(allSecies.length).fill(0),
            'translateZ':Array(allSecies.length).fill(0),
            "repetitionX":Array(allSecies.length).fill(1),
            "repetitionY":Array(allSecies.length).fill(1),
            "repetitionZ":Array(allSecies.length).fill(1),
            "constantX":xConstXPush,
            "constantY":yConstXPush,
            "constantZ":zConstXPush,
          })
          setSpecies(allSecies.sort((a,b) => a-b))
        }
      }
      reader.readAsText(theFile);
    }
  }
  const clickPressed = (e) => {
    setClickStatus(true)
    setPositionMouse([e.clientX,e.clientY])
  }
  const changeOnListener = (e) => {
    if(clickStatus){
      let xInReturn = positionMouse[0]
      let yInReturn = positionMouse[1]
      let angleX = angles[0]
      let angleY = angles[1]
      if(e.clientX>xInReturn){
        angleX += Math.abs(e.clientX-xInReturn)
      } else {
        angleX -= Math.abs(e.clientX-xInReturn)
      }
      if(e.clientY>yInReturn){
        angleY += Math.abs(e.clientY-yInReturn)
      } else {
        angleY -= Math.abs(e.clientY-yInReturn)
      }

      xInReturn = e.clientX
      yInReturn = e.clientY
      setPositionMouse([xInReturn,yInReturn])
      setAngles([angleX,angleY])
    }
  }
  const onRotationChange = (e) => {
    let axisRotated = e.target.name
    let result = e.target.value || 0
    let index = 0
    switch(axisRotated){
      case 'y':
        index = 1;
        break;
      default:
        index = 0;
    }
    setAngles([
      ...angles.slice(0,index),
      parseFloat(result),
      ...angles.slice(index+1)
    ])
  }
  const zoomInOut = (e) => {
    let sign = e.deltaY/530
    setVisualDistance(visualDistance*(sign+1))
  }
  
  const [dataMultiX, setDataMultiX] = useState([])
  const [dataMultiY, setDataMultiY] = useState([])
  const [dataMultiZ, setDataMultiZ] = useState([])
  const [allMultiSpec, setAllMultiSpec] = useState(speciesAtoms)
  
  useEffect(() => {
    let arrayX = [...dataToPlotX]
    let arrayY = [...dataToPlotY]
    let arrayZ = [...dataToPlotZ]
    let speciesMulti = [...speciesAtoms]

    let xForPush = []
    let yForPush = []
    let zForPush = []
    let specForPush = []
    for(let i =0; i< arrayX.length;i++){
      let atomIndex = species.indexOf(speciesAtoms[i])
      if(state.repetitionX[atomIndex] !== 0){
        for(let j =0; j<state.repetitionX[atomIndex]; j++){
          xForPush = [...xForPush, arrayX[i]/1+state.constantX[atomIndex][0]*(j)]
          yForPush = [...yForPush, arrayY[i]/1+state.constantX[atomIndex][1]*(j)]
          zForPush = [...zForPush, arrayZ[i]/1+state.constantX[atomIndex][2]*(j)]
          specForPush = [...specForPush,speciesMulti[i]]
        }
       
      }
    }
    arrayX = [...xForPush]
    arrayY = [...yForPush]
    arrayZ = [...zForPush]
    speciesMulti = [...specForPush]
     xForPush = []
     yForPush = []
     zForPush = []
     specForPush = []
    for(let i =0; i< arrayY.length;i++){
      let atomIndex = species.indexOf(speciesMulti[i])
      if(state.repetitionY[atomIndex] !== 0){
        for(let j =0; j<state.repetitionY[atomIndex]; j++){
          xForPush = [...xForPush, arrayX[i]/1+state.constantY[atomIndex][0]*(j)]
          yForPush = [...yForPush, arrayY[i]/1+state.constantY[atomIndex][1]*(j)]
          zForPush = [...zForPush, arrayZ[i]/1+state.constantY[atomIndex][2]*(j)]
          specForPush = [...specForPush,speciesMulti[i]]
        }
       
      }
    }
    arrayX = [...xForPush]
    arrayY = [...yForPush]
    arrayZ = [...zForPush]
    speciesMulti = [...specForPush]
    xForPush = []
    yForPush = []
    zForPush = []
    specForPush = []
   for(let i =0; i< arrayZ.length;i++){
     let atomIndex = species.indexOf(speciesMulti[i])
     if(state.repetitionZ[atomIndex] !== 0){
       for(let j =0; j<state.repetitionZ[atomIndex]; j++){
         xForPush = [...xForPush, arrayX[i]/1+state.constantZ[atomIndex][0]*(j)]
         yForPush = [...yForPush, arrayY[i]/1+state.constantZ[atomIndex][1]*(j)]
         zForPush = [...zForPush, arrayZ[i]/1+state.constantZ[atomIndex][2]*(j)]
         specForPush = [...specForPush,speciesMulti[i]]
       }
      
     }
   }
   arrayX = [...xForPush]
   arrayY = [...yForPush]
   arrayZ = [...zForPush]
   speciesMulti = [...specForPush]

    setDataMultiX(arrayX)
    setDataMultiY(arrayY)
    setDataMultiZ(arrayZ)
    setAllMultiSpec(speciesMulti)

  }, [state.constantX, state.repetitionX,state.constantZ, state.repetitionZ,state.constantY, state.repetitionY,species])

  const [dataX, setDataX] = useState([])
  const [dataY, setDataY] = useState([])
  const [dataZ, setDataZ] = useState([])
  useEffect(() => {
    let datXHere = []
    let datYHere = []
    let datZHere = []
    for(let i = 0; i< dataMultiX.length; i++){
      let trIndex = species.indexOf(allMultiSpec[i])

      datXHere = [...datXHere,dataMultiX[i]/1+state.translateX[trIndex]/1]
      datYHere = [...datYHere,dataMultiY[i]/1+state.translateY[trIndex]/1]
      datZHere = [...datZHere,dataMultiZ[i]/1+state.translateZ[trIndex]/1]
    }  
  
       let xRotated = []
       let yRotated = []
       let zRotated = []
       switch (typeOfDataRotation) {
         case 'x':
          let xMatrixRot = [[1,0,0], [0,Math.cos(angleRotatedData*Math.PI/180),-Math.sin(angleRotatedData*Math.PI/180)],[0,Math.sin(angleRotatedData*Math.PI/180),Math.cos(angleRotatedData*Math.PI/180)]]
          for(let i = 0; i<datXHere.length;i++ ){
            let vec = [[datXHere[i]],[datYHere[i]],[datZHere[i]]]
            let newCoord = matrixMultiplication(xMatrixRot,vec)[0]
            xRotated.push(newCoord[0])
            yRotated.push(newCoord[1])
            zRotated.push(newCoord[2])
          }
           break;
         case 'y':
          let yMatrixRot = [ [Math.cos(angleRotatedData*Math.PI/180),0,Math.sin(angleRotatedData*Math.PI/180)],[0,1,0],[-Math.sin(angleRotatedData*Math.PI/180),0,Math.cos(angleRotatedData*Math.PI/180)]]
          for(let i = 0; i<datXHere.length;i++ ){
            let vec = [[datXHere[i]],[datYHere[i]],[datZHere[i]]]
            let newCoord = matrixMultiplication(yMatrixRot,vec)[0]
            xRotated.push(newCoord[0])
            yRotated.push(newCoord[1])
            zRotated.push(newCoord[2])
          }
            break;
         case 'z':
          let zMatrixRot = [[Math.cos(angleRotatedData*Math.PI/180),-Math.sin(angleRotatedData*Math.PI/180),0],[Math.sin(angleRotatedData*Math.PI/180),Math.cos(angleRotatedData*Math.PI/180),0],[0,0,1]]
          for(let i = 0; i<datXHere.length;i++ ){
            let vec = [[datXHere[i]],[datYHere[i]],[datZHere[i]]]
            let newCoord = matrixMultiplication(zMatrixRot,vec)[0]
            xRotated.push(newCoord[0])
            yRotated.push(newCoord[1])
            zRotated.push(newCoord[2])
          }
           break;
         default:
          xRotated = datXHere
          yRotated = datYHere
          zRotated = datZHere
           break;
       }
    let xStretch = stretches[0] || 0
    let yStretch = stretches[1] || 0
    let zStretch = stretches[2] || 0

    let xStretched = []
    let yStretched = []
    let zStretched = []
    let cellX = state.constantX[0][0]*state.repetitionX[0]
    let cellY = state.constantY[0][1]*state.repetitionY[0]
    let cellZ = state.constantZ[0][2]*state.repetitionZ[0]
    for (let l = 0; l<xRotated.length;l++){
      xStretched.push(xRotated[l]+((xRotated[l]/cellX))*xStretch)
      yStretched.push(yRotated[l]+((yRotated[l]/cellY))*yStretch)
      zStretched.push(zRotated[l]+((zRotated[l]/cellZ))*zStretch)
    }
    setDataX(xStretched)
    setDataY(yStretched)
    setDataZ(zStretched)
  }, [state.translateX,state.translateY,state.translateZ,dataMultiX,species,typeOfDataRotation,angleRotatedData,stretches])
 const onRemoveData = (e) => {
   let index = parseInt(e.target.name)
   if(!removedData.includes(index)){
    setRemovedData([...removedData,index])

   }
 }
 const onAddData = (e) => {
  let index = parseInt(e.target.name)
  if(removedData.includes(index)){
    let positionRemoved = removedData.indexOf(index)
   setRemovedData([...removedData.slice(0,positionRemoved),...removedData.slice(positionRemoved+1)])
  }
}
const onChangeDataRotationType = (e) => {
  setTypeOfDataRotation(e.target.value)
}
const onChangeDataRotationAngle = (e) => {
  let angleRot = parseFloat(e.target.value) || 180
  setAngleRotatedData(angleRot)
}
const onChangeStretches = (e) => {
  let index = 0
  let axisType = e.target.title.split('')[0]
  switch(axisType){
    case "y":
      index = 1;
      break
    case "z":
      index = 2;
      break;
    default:
      index = 0;
      break;
  }
  setStretches([
    ...stretches.slice(0,index),
    parseFloat(e.target.value),
    ...stretches.slice(index+1)
  ])
}
  return (
    <div className="App">
      <div className='canvas'>
        <Structure
          stretches = {stretches}
          angles ={angles}
          changeOnListener = {(e) => changeOnListener(e)}
          releaseClick = {() => setClickStatus(false)}
          performClick = {(e) => clickPressed(e)}
          zoomInOut = {(e) => zoomInOut(e)}
          visualDistance = {visualDistance}
          dataToPlotX = {dataToPlotX}
          dataToPlotY = {dataToPlotY}
          dataToPlotZ = {dataToPlotZ}
          speciesAtoms = {speciesAtoms}
          state = {state}
          species = {species.sort((a,b) => a-b)}
          dataX = {dataX}
          dataY = {dataY}
          dataZ = {dataZ}
          allMultiSpec = {allMultiSpec}
          selectedPoint = {selectedPoint}
          removedData = {removedData}
          angleRotatedData = {angleRotatedData}
          typeOfDataRotation = {typeOfDataRotation}
          matrixMultiplication = {(mat1,mat2) => matrixMultiplication(mat1,mat2)}
        />
      </div>
    
      <div className='ControlPannel'>
        <UploadFiles
          onUploadedFile = {(e) => onUploadedFile(e)}
        />
         <Rotations 
          stretches={stretches}
          onChangeStretches = {(e) => onChangeStretches(e)}
          angles = {angles}
          onRotationChange = {(e) => onRotationChange(e)}
          onChangeState = {(e) => onChangeState(e)}
          state = {state}
          onChangeDataRotationType = {(e) => onChangeDataRotationType(e)}
          onChangeDataRotationAngle = {(e) => onChangeDataRotationAngle(e)}
          angleRotatedData = {angleRotatedData}
        />
          <div className='dataAndElements'>
            <button onClick = {() => setToShowPannel("Elements")} className='download'>Elements</button>
            <button onClick = {() => setToShowPannel("Data")} className='download'>Data </button>
          </div>

       {toShowPannel === "Elements"? <SpeciesControl
          onChangeState = {(e) => onChangeState(e)}
          onChangeStateArray = {(e) => onChangeStateArray(e)}
          onChangeStateArrayDouble = {(e) => onChangeStateArrayDouble(e)}
          state = {state}
          species = {species}
          atoms = {atoms}
        />:
        <DataPoints
        dataX = {dataX}
        dataY = {dataY}
        dataZ = {dataZ}
        allMultiSpec = {allMultiSpec}
        dataClicked = {(numberData) => setSelectedPoint(numberData)}
        onRemoveData = {(e) => onRemoveData(e)}
        onAddData = {(e) => onAddData(e)}
        removedData = {removedData}
        selectedPoint = {selectedPoint}
        state = {state}
        species = {species}
        atoms = {atoms}
        order = {order}
        setOrder = {(e) => setOrder(e)}
        angleRotatedData = {angleRotatedData}
        typeOfDataRotation = {typeOfDataRotation}
        />}
        
      </div>
     
    </div>
  );
}

export default App;
