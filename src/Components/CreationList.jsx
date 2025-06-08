import "./CreationList.css"
import Creation from './Creation.jsx'

const creationsObject = (name, baseCost, preReqs) => { return {name: name, baseCost: baseCost, preReqs: preReqs}}
const creations =  [creationsObject('Light', 1250), // 0
                    creationsObject('Stone', 1250), // 1
                    creationsObject('Soil', 4050, {1: 1}), // 2
                    creationsObject('Air', 8000, {0: 2}), // 3
                    creationsObject('Water', 28250), // 4
                    creationsObject('Plant', 77000), // 5
                    creationsObject('Tree', 122000), // 6
                    creationsObject('Fish', 693800), // 7
                    creationsObject('Animal', 3234000), // 8
                    creationsObject('Human', 7067100), // 9
                    creationsObject('River', 141.37e6), // 10
                    creationsObject('Mountain', 250.18e6), // 11
                    creationsObject('Forest', 1.22e9), // 12
                    creationsObject('Village', 15.89e9), // 13
                    creationsObject('Town', 354.58e9), // 14
                    creationsObject('Ocean', 2e12), // 15
                    creationsObject('Nation', 5.75e12), // 16
                    creationsObject('Continent', 30.73e12), // 17
                    creationsObject('Weather', 51.54e12), // 18
                    creationsObject('Sky', 75.66e12), // 19
                    creationsObject('Night', 151.33e12), // 20
                    creationsObject('Moon', 338.83e12), // 21
                    creationsObject('Planet', 713.83e12), // 22
                    creationsObject('Earthlike Planet', 2.65e15), // 23
                    creationsObject('Sun', 12.5e15), // 24
                    creationsObject('Solar System', 199.03e15), // 25
                    creationsObject('Galaxy', 995.14e15), // 26
                    creationsObject('Universe', 4.98e18) // 27
                   ]

// List of prereqs that will be passed in between lower level classes
// Can probably make a list of which creation needs which creations to craft by making an array of creations
// ie. with a total of 4 creations where each creation needs 1 of each of earlier creations
// ie. {{0, 0, 0, 0}, {1, 0, 0, 0}, {1, 1, 0, 0}, {1, 1, 1, 0}}
// Split into basePrereqs which is constant and totalPrereqs which is variable
// basePrereqs will be the amount for 1 creation
// totalPrereqs will be the amount for total creations needed by each individual creation             
// Can also include basePrereqs into creations list
const totalPrereqs = []
for(let i = 0; i <= 27; i++){ // Temporary Manual population => Will move into components
    totalPrereqs.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
}

const list = []
for(let i =0; i < creations.length; i++){
    list.push(<Creation creationID = {i} creation = {creations[i]} totalPreReqs = {totalPrereqs} />)
}

function CreationList() {
    return(
        <>
            {list}
        </>
    )
}

export default CreationList