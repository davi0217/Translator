import { useState} from 'react'
import {createContext} from 'react'

export const WordsContext=createContext()

export default function App({children}){

    const words=JSON.parse(localStorage.getItem("words"))
    const [data, setData]= useState(words?words:[]) 
  

    const handleAddWords=function(newData){
        console.log("handleAddWords clicked with data: "+newData)
    
 if(data.some((d)=>{
      return d.translation===newData.translation
    })){
      return
    }
 
   setData([...data, newData])

   localStorage.setItem("words", JSON.stringify([...data, newData]))
  }

  const formatVerbes=function(words, cat){

    let newWords= words.filter((w)=>{
        return w.category==cat
    }).map((w)=>{
        return {...w, "hidden":true}
    })

    return newWords

  }



    return  (<WordsContext.Provider value={{"data":data, "handleAddWords":handleAddWords, "formatVerbes":formatVerbes}}>

        {children}

        </WordsContext.Provider>)


}