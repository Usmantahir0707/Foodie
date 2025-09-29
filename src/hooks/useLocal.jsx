import { useEffect, useState } from "react"


export default function useLocal(key, initialData) {
  const [data, setData] = useState(initialData);

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem(key)) 
    if(storedData){
      setData(storedData)
    }else{
      localStorage.setItem(key, JSON.stringify(initialData))
    }
  },[])

  const updateLocal = (newData)=>{
    if(typeof newData === 'function'){
      localStorage.setItem(key, JSON.stringify(newData(data)))
      setData(newData(data))
    }else{
      localStorage.setItem(key, JSON.stringify(newData))
      setData(newData)
    }
  }

  return (
    [data, updateLocal]
  )
}
