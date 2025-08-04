import {useContext, useState} from 'react'

import { WordsContext } from './App.jsx'

export function useSearch(){


    const [wordToSearch, setWordToSearch]=useState("")
    
    const {handleMessage}=useContext(WordsContext)
    const [language, setLanguage]=useState("français")

 const handlerSearch=function(e){

  handleMessage({"type":"", "text":""})

  if(e.length>30){
    handleMessage({"type":"repeated", "text":"Your word is too long. Try again"})
    return 
  }
  if(e==" " || e.trim()==""){
    handleMessage({"type":"repeated", "text":"You have to write a word"})
    return 
  }
     
     setWordToSearch(e)
  }


  
  const handlerLanguage=function(){
    let languageToChange=language=="français"?"spagnol":"français"
    setLanguage(languageToChange)  
  }


  return {"wordToSearch":wordToSearch, "language":language, "handlerLanguage":handlerLanguage,  "handlerSearch":handlerSearch}

}