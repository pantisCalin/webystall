import OneSpec from "./OneSpec"

const SpeciesControl = ( {atoms,onChangeState,onChangeStateArrayDouble, state, species,onChangeStateArray} ) => {
  return (
    <div className="Species">
        {species.map((element,index) => (
            <div key={index}>
                <OneSpec 
                    state = {state}
                    theSpecimen = {element}
                    onChangeState = {onChangeState}
                    onChangeStateArray = {onChangeStateArray}
                    counterAtom = {index}
                    onChangeStateArrayDouble = {onChangeStateArrayDouble}
                    atoms = {atoms}
                />
            </div>
        ))}
    </div>
  )
}

export default SpeciesControl