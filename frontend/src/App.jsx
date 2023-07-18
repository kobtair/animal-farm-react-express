import { useEffect, useState } from 'react'
import './App.css'

function useAnimalSearch(){

  const [animals,setAnimals] = useState([])
  
  useEffect(()=>{
    const lastQuery= localStorage.getItem('lastQuery')
    search(lastQuery)

  },[])

  const search =async (query)=>{
    const response= await fetch(`http://localhost:3000/?q=${query}`)
    const data = await response.json();
    setAnimals(data);
    localStorage.setItem('lastQuery',query)
  }
  return {search, animals}

}

function App() {
  const {search, animals} = useAnimalSearch()

  return (
    <div >
      <h1>Animal Farm</h1>
        <input type="text" placeholder='search animals' onChange={(e=>search(e.target.value))} />
      <ul>
        {animals.map(animal=>(
          <li key={animal.id} > <strong>{animal.name} </strong> {animal.type} ({animal.age} years old) </li>
        ))}
       { animals.length===0 && 'No animals found '}
      </ul>

    </div>
  )
 
}


export default App
