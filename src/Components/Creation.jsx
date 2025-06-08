import { useEffect, useState } from 'react'
import './Creation.css'

function Creation({creationID, creation, totalPreReqs}) {
    const[creations, setCreations] = useState(() => {
        const localCreations = localStorage.getItem(creation.name);
        return localCreations ? JSON.parse(localCreations) : {have: 0, want: 0, buy: false};
    })
    const totalCost = ((creations.want - creations.have) + calculatePreReqs()) * creation.baseCost

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

        if(event.target.name == 'buy')  // Checkbox needs special treatment
            setCreations({...creations,
                          [event.target.name]: !creations[event.target.name]})
        else                            // Other inputs(mainly text)
            setCreations({...creations,
                        [event.target.name]: value}) 

        // console.log(creation.name, creations.buy);
    }
    
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
               <p className='totalCost'>Cost: {totalCost}</p>
               <br />  
        </form>
    )
}


export default Creation