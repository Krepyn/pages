import { useEffect, useState } from 'react'
import { scientificNotation, floor } from '../Utils/Helpers';
import { useCreationsContext } from '../Contexts/CreationsContext';
import './Creation.css'

function Creation({creationID, creation}) {
    const[creations, setCreations] = useState(() => {
        const localCreations = localStorage.getItem(creation.name);
        return localCreations ? JSON.parse(localCreations) : {have: 0, want: 0, buy: false};
    })
    const {totalPreReqs, setTotalPreReqs} = useCreationsContext();
    const needAmount = creations.want - creations.have + calculatePreReqs() // total needed amount of this creation want + all prereqs from other creations
    const craftAmount = needAmount * creations.buy // If not buying this creation type no cost, since it will be crafted
    const nextAtAmount = needAmount * !creations.buy // If not buying this creation will need to be crafted
    const preReqs = creation.preReqs
    const totalCost = craftAmount * creation.baseCost

    //console.log('Creation: ' + creation.name + ', Needed Amount: ' + needAmount + ', Craft Amount: ' + craftAmount );
    //console.log(creation.name + ": " + totalPreReqs)

    // PreReqs of this creation's type by other creations
    function calculatePreReqs() {
        var tempPreReqs = 0
        for(let i = 0; i <= 27; i++){
            tempPreReqs = tempPreReqs + totalPreReqs[i][creationID]; 
        }
        return tempPreReqs
    }    

    function handleChange(event) {
        const value = event.target.value
        //var tempCreations = creations

        if(event.target.name == 'buy') { // Checkbox needs special treatment
            setCreations({...creations,
                        [event.target.name]: !creations[event.target.name]})
            //tempCreations = {...creations, [event.target.name]: !creations[event.target.name]}
        } else { // Other inputs(mainly text)
            setCreations({...creations,
                        [event.target.name]: value}) 
            //tempCreations = {...creations, [event.target.name]: value}
        }                         

        // setPreReqs(tempCreations)
        // console.log(creation.name, creations.buy);
    }

    // Runs if totalPreReqs changes
    useEffect(() =>{         
        function setPreReqs() {
            // Passing on preReqs
            if(preReqs){
                const reqsKeys = Object.keys(preReqs);
                const tempPreReqs = totalPreReqs[creationID];
                for(let i = 0; i <= reqsKeys.length; i++){
                    tempPreReqs[parseInt(reqsKeys[i])] = preReqs[reqsKeys[i]] * (needAmount - craftAmount);
                }
                setTotalPreReqs({...totalPreReqs, [creationID]: tempPreReqs})            
                // console.log('Creation:' + creation.name)
                // console.log('reqsKeys:' + reqsKeys[0])
                // console.log('preReqs Amount:' + preReqs[reqsKeys[0]])
                // console.log('Craft Amount:' + craftAmount)
                // console.log(totalPreReqs[creationID]);
            }
        }
        setPreReqs()
    }, [totalPreReqs, setTotalPreReqs, preReqs, creationID, needAmount, craftAmount]);

    useEffect(() => {             
        function saveData() {
            localStorage.setItem(creation.name, JSON.stringify(creations))
        }    
        saveData()

    }, [creations, creation]);
    

    return(
        <form>
               <p>{creation.name}</p>
               <input name='buy' type="checkbox" defaultChecked={creations.buy} value={creations.buy} onChange={handleChange}/>
               <input name='have' placeholder='0' value={creations.have} type='text' onChange={handleChange}/>
               <input name='want' placeholder='0' value={creations.want} type='text' onChange={handleChange}/>
               <p className='totalCost'>Cost: {scientificNotation(floor(totalCost))}</p>
               <p className='totalCost'>nextAt: {scientificNotation(floor(nextAtAmount))}</p>
               <br />  
        </form>
    )
}


export default Creation