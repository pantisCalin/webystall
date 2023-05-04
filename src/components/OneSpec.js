import './OneSpec.css';

const OneSpec = ( {atoms,state, theSpecimen, onChangeStateArrayDouble, onChangeStateArray,counterAtom} ) => {
    const Atoms = "Hydrogen,Helium,Lithium,Beryllium,Boron,Carbon,Nitrogen,Oxygen,Fluorine,Neon,Sodium,Magnesium,Aluminum,Silicon,Phosphorus,Sulfur,Chlorine,Argon,Potassium,Calcium,Scandium,Titanium,Vanadium,Chromium,Manganese,Iron,Cobalt,Nickel,Copper,Zinc,Gallium,Germanium,Arsenic,Selenium,Bromine,Krypton,Rubidium,Strontium,Yttrium,Zirconium,Niobium,Molybdenum,Technetium,Ruthenium,Rhodium,Palladium,Silver,Cadmium,Indium,Tin,Antimony,Tellurium,Iodine,Xenon,Caesium,Barium,Lanthanum,Cerium,Praseodymium,Neodymium,Promethium,Samarium,Europium,Gadolinium,Terbium,Dysprosium,Holmium,Erbium,Thulium,Ytterbium,Lutetium,Hafnium,Tantalum,Tungsten,Rhenium,Osmium,Iridium,Platinum,Gold,Mercury,Thallium,Lead,Bismuth,Polonium,Astatine,Radon,Francium,Radium,Actinium,Thorium,Protactinium,Uranium,Neptunium,Plutonium,Americium,Curium,Berkelium,Californium,Einsteinium,Fermium,Mendelevium,Nobelium,Lawrencium,Rutherfordium,Dubnium,Seaborgium,Bohrium,Hassium,Meitnerium,Darmstadtium,Roentgenium,Copernicium,Ununtrium,Flerovium,Ununpentium,Livermorium,Ununseptium,Ununoctium".split(',')
    return (

    <div className='oneSpec'>
        <div className="specName">
            <div>
              {Atoms[theSpecimen-1]} - [{atoms[theSpecimen-1]}]
            </div>
            <div>
              Z = {theSpecimen}
            </div>
        </div>
        <div className='properties'>
            <div className = "property">
                <div className='propName'>
                    Translations
                </div>
                <div className='subProperty'>
                    <div className='subName'>
                    Translate X
                    </div>
                    <input step = '0.1' name = 'translateX' title = {`Atom ${counterAtom}`} onChange = {onChangeStateArray} type = 'number' value={state.translateX[counterAtom]}/>
                </div>
                <div className='subProperty'>
                    <div className='subName'>
                    Translate Y
                    </div>
                    <input step = '0.1' name = 'translateY' title = {`Atom ${counterAtom}`} onChange = {onChangeStateArray} type = 'number' value={state.translateY[counterAtom]}/>
                </div>
                <div className='subProperty'>
                    <div className='subName'>
                    Translate Z
                    </div>
                    <input step = '0.1' name = 'translateZ' title = {`Atom ${counterAtom}`} onChange = {onChangeStateArray} type = 'number' value={state.translateZ[counterAtom]}/>
                </div>
            </div>
            <div className = "property">
                <div className='propName'>
                    Multiplication
                </div>
                <div className='subProperty'>
                    <div className='subName'>
                       Repet X
                    </div>
                    <input step = '1' name = 'repetitionX' title = {`Atom ${counterAtom}`} onChange = {onChangeStateArray} type = 'number' value={state.repetitionX[counterAtom]}/>
                    <p>a<sub>1</sub>:</p>
                        <div className='subName'>
                            X:&nbsp;
                        <input step = '0.1' name = 'constantX' title = {`Atom ${counterAtom} on 1 st latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantX[counterAtom][0]}/>
                        </div>
                        <div className='subName'>
                            Y:&nbsp;
                        <input step = '0.1' name = 'constantX' title = {`Atom ${counterAtom} on 2 nd latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantX[counterAtom][1]}/>
                        </div>
                        <div className='subName'>
                            Z:&nbsp;
                        <input step = '0.1' name = 'constantX' title = {`Atom ${counterAtom} on 3 rd latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantX[counterAtom][2]}/>
                        </div>
                </div>
                <div className='subProperty'>
                    <div className='subName'>
                       Repet Y
                    </div>
                    <input step = '1' name = 'repetitionY' title = {`Atom ${counterAtom}`} onChange = {onChangeStateArray} type = 'number' value={state.repetitionY[counterAtom]}/>
                    <p>a<sub>2</sub>:</p>
                        <div className='subName'>
                            X:&nbsp;
                             <input step = '0.1' name = 'constantY' title = {`Atom ${counterAtom} on 1 st latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantY[counterAtom][0]}/>
                        </div>
                        <div className='subName'>
                            Y:&nbsp;
                             <input step = '0.1' name = 'constantY' title = {`Atom ${counterAtom} on 2 nd latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantY[counterAtom][1]}/>
                        </div>
                        <div className='subName'>
                            Z:&nbsp;
                             <input step = '0.1' name = 'constantY' title = {`Atom ${counterAtom} on 3 rd latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantY[counterAtom][2]}/>
                        </div>
                </div>
                <div className='subProperty'>
                    <div className='subName'>
                       Repet Z
                    </div>
                    <input step = '1' name = 'repetitionZ' title = {`Atom ${counterAtom}`} onChange = {onChangeStateArray} type = 'number' value={state.repetitionZ[counterAtom]}/>
                    <p>a<sub>3</sub>:</p>
                        <div className='subName'>
                            X:&nbsp;
                            <input step = '0.1' name = 'constantZ' title = {`Atom ${counterAtom} on 1 st latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantZ[counterAtom][0]}/>
                        </div>
                        <div className='subName'>
                            Y:&nbsp;
                            <input step = '0.1' name = 'constantZ' title = {`Atom ${counterAtom} on 2 nd latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantZ[counterAtom][1]}/>
                        </div>
                        <div className='subName'>
                            Z:&nbsp;
                            <input step = '0.1' name = 'constantZ' title = {`Atom ${counterAtom} on 3 rd latice vector`} onChange = {onChangeStateArrayDouble} type = 'number' value={state.constantZ[counterAtom][2]}/>
                        </div>
                </div>
            </div>
            <div className = "property">
                <div className='propName'>
                    SuperCell
                </div>
                <div className='subProperty'>
                <p>a<sub>1</sub>:</p>
                <div className='superCellData'>
                <div className='subName'>
                            X:&nbsp;
                            {(state.constantX[counterAtom][0]*state.repetitionX[counterAtom]).toFixed(10)}                        </div>
                        <div className='subName'>
                            Y:&nbsp;
                            {(state.constantX[counterAtom][1]*state.repetitionX[counterAtom]).toFixed(10)}
                        </div>
                        <div className='subName'>
                            Z:&nbsp;
                            {(state.constantX[counterAtom][2]*state.repetitionX[counterAtom]).toFixed(10)}
                        </div>
                </div>
                       
                </div>
                <div className='subProperty'>
                       <p>a<sub>2</sub>:</p>
                       <div className='superCellData'>
                       <div className='subName'>
                            X:&nbsp;
                            {(state.constantY[counterAtom][0]*state.repetitionY[counterAtom]).toFixed(10)}                        
                        </div>
                        <div className='subName'>
                            Y:&nbsp;
                            {(state.constantY[counterAtom][1]*state.repetitionY[counterAtom]).toFixed(10)}
                        </div>
                        <div className='subName'>
                            Z:&nbsp;
                            {(state.constantY[counterAtom][2]*state.repetitionY[counterAtom]).toFixed(10)}
                        </div>
                        </div>
                </div>
                <div className='subProperty'>
                <p>a<sub>3</sub>:</p>
                <div className='superCellData'>
                <div className='subName'>
                            X:&nbsp;
                            {(state.constantZ[counterAtom][0]*state.repetitionZ[counterAtom]).toFixed(10)}                        
                </div>
                        <div className='subName'>
                            Y:&nbsp;
                            {(state.constantZ[counterAtom][1]*state.repetitionZ[counterAtom]).toFixed(10)}
                        </div>
                        <div className='subName'>
                            Z:&nbsp;
                            {(state.constantZ[counterAtom][2]*state.repetitionZ[counterAtom]).toFixed(10)}
                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OneSpec