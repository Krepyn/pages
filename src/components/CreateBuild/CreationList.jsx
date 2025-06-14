import Creation from './Creation.jsx'
import { useState } from "react"
import { creationsContext } from "../../contexts/CreationsContext.jsx"


const creationsObject = (name, baseCost, preReqs) => { return {name: name, baseCost: baseCost, preReqs: preReqs}}

// Commented numbers are creationIDs
const creations =  [creationsObject('Light', 1250), // 0
                    creationsObject('Stone', 1250), // 1
                    creationsObject('Soil', 4050, {1: 1}), // 2
                    creationsObject('Air', 8000, {0: 2}), // 3
                    creationsObject('Water', 28250, {3: 3}), // 4
                    creationsObject('Plant', 77000, {2: 2, 4: 2}), // 5
                    creationsObject('Tree', 122000, {2: 5, 4: 3}), // 6
                    creationsObject('Fish', 693800, {4: 10, 5: 5}), // 7
                    creationsObject('Animal', 3234000, {4: 15, 5: 9, 7: 3}), // 8
                    creationsObject('Human', 7067100, {4: 100, 5: 25, 7: 25, 8: 15}), // 9
                    creationsObject('River', 141.37e6, {4: 5000}), // 10
                    creationsObject('Mountain', 250.18e6, {1: 2e5}), // 11
                    creationsObject('Forest', 1.22e9, {6: 10000}), // 12
                    creationsObject('Village', 15.89e9, {1: 5000, 5: 5000, 9: 200, 10: 1, 12: 1}), // 13
                    creationsObject('Town', 354.58e9, {1: 2.5e5, 5: 10000, 9: 5000, 10: 1}), // 14
                    creationsObject('Ocean', 2e12, {4: 3e7, 5: 5e6, 7: 1e6, 10: 500}), // 15
                    creationsObject('Nation', 5.75e12, {5: 1e6, 8: 1e5, 10: 100, 11: 3, 12: 10, 14: 15}), // 16
                    creationsObject('Continent', 30.73e12, {15: 1, 16: 5}), // 17
                    creationsObject('Weather', 51.54e12, {3: 1e9, 4: 1e8, 15: 5, 17: 1}), // 18
                    creationsObject('Sky', 75.66e12, {0: 1e8, 3: 3e9, 18: 1}), // 19
                    creationsObject('Night', 151.33e12, {19: 2}), // 20
                    creationsObject('Moon', 338.83e12, {1: 1.5e11, 20: 1}), // 21
                    creationsObject('Planet', 713.83e12, {1: 3e11, 21: 1}), // 22
                    creationsObject('Earthlike Planet', 2.65e15, {2: 1e10, 3: 1e11, 4: 2.5e10, 5: 5e9, 22: 1}), // 23
                    creationsObject('Sun', 12.5e15, {0: 1e13}), // 24
                    creationsObject('Solar System', 199.03e15, {22: 100, 23: 1, 24: 10}), // 25
                    creationsObject('Galaxy', 995.14e15, {25: 5}), // 26
                    creationsObject('Universe', 4.98e18, {26: 5}) // 27
                   ]

const list = []
for(let i =0; i < creations.length; i++){
    list.push(<Creation creationID = {i} creation = {creations[i]}/>)
}

export function CreationList() {
    // An array of prerequisites for each creation that is to be filled by Creation Components
    // Default value is 28x28 array filled with zeroes
    // Each creation has an array for itself, and inside that array each creation sets the amount it needs as prerequisites by indexing over creationID of other creations
    const [totalPreReqs, setTotalPreReqs] = useState(()=> {
        const x = []
        for(let i = 0; i <= 27; i++){ // Fill totalprereqs with 0
            x.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        return x
    })

    return(
        <>
            <creationsContext.Provider value={{totalPreReqs, setTotalPreReqs}}>
                {list}
            </creationsContext.Provider>
        </>
    )
}

export default CreationList