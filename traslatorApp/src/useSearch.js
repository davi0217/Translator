import {useContext, useState} from 'react'

import { WordsContext } from './App.jsx'

export function useSearch(){


    const [wordToSearch, setWordToSearch]=useState("")
    
    const {handleMessage}=useContext(WordsContext)
    const [language, setLanguage]=useState("français")

 const handlerSearch=function(e){

  handleMessage({"type":"", "text":""})
     
     setWordToSearch(e)
  }


  
  const handlerLanguage=function(){
    let languageToChange=language=="français"?"spagnol":"français"
    setLanguage(languageToChange)  
  }


  return {"wordToSearch":wordToSearch, "language":language, "handlerLanguage":handlerLanguage,  "handlerSearch":handlerSearch}

}