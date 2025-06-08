import "./CreationList.css"
import Creation from './Creation.jsx'

const creationsObject = (name, baseCost) => { return {name: name, baseCost: baseCost}}

const creations =  [creationsObject('Light', 1250),
                    creationsObject('Stone', 1250),
                    creationsObject('Soil', 4050),
                    creationsObject('Air', 8000)
                   ]


const list = []
for(let i =0; i < creations.length; i++){
    list.push(<Creation creation = {creations[i]} />)
}

function CreationList() {

    return(
        <>
            {list}
        </>
    )
}

export default CreationList