import { useEffect, useState } from 'react'
import './Creation.css'

function Creation({creation}) {
    const[creations, setCreations] = useState({ have: 0,
                                                want: 0})
    // const[creationsHave, setCreationsHave] = useState(0)
    // const[creationsWant, setCreationsWant] = useState(0)
    const[totalCost, setTotalCost] = useState(0)

    function handleChange(event) {
        const value = event.target.value
        setCreations({...creations,
                    [event.target.name]: value}) 
    }
    
    useEffect(() => {         
        function calculateCost() {
            setTotalCost((creations.want - creations.have) * creation.baseCost)
        }
        
        calculateCost()        
        console.log(creations.have, creations.want, totalCost); 
    }, [creations, creation, totalCost]);

    return(
        <form>
               <p>{creation.name}</p>
               <input type="checkbox" />
               <input name='have' placeholder='0' value={creations.have} type='text' onChange={handleChange}/>
               <input name='want' placeholder='0' value={creations.want} type='text' onChange={handleChange}/>
               <p className='totalCost'>Cost: {totalCost}</p>
               <br />  
        </form>
    )
}


export default Creation