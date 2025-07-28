import {useState, useEffect, useContext} from 'react'

export function useSearch(){


    const [wordToSearch, setWordToSearch]=useState("")
    const [filter, setFilter]=useState("")
    const [language, setLanguage]=useState("français")

 const handlerSearch=function(e){
     
     setWordToSearch(e)
  }


  const handlerFilter=function(e){
    setFilter(e)
  }

  const handlerLanguage=function(){
    let languageToChange=language=="français"?"spagnol":"français"
    setLanguage(languageToChange)  
  }


  return {"filter":filter, "wordToSearch":wordToSearch, "language":language, "handlerLanguage":handlerLanguage, "handlerFilter":handlerFilter, "handlerSearch":handlerSearch}

}