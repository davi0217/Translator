import { useState, useEffect} from 'react'


import {createContext} from 'react'
import { wordsList } from './muestra.js'

import {texts} from './texts.js'

export const WordsContext=createContext()

export default function App({children}){
    
    
    const words=JSON.parse(localStorage.getItem("words"))
    const [data, setData]= useState(words?words:wordsList) 
    const [playingGame, setPlayingGame]=useState(false)
    const [ffilter, setFilter]=useState("Verbe")
    const [wordFromUrl, setWordFromUrl]=useState("")
    const [message, setMessage]=useState({"type":"", "text":""})
    const [overMenu, setOverMenu]=useState(false)

    const blogs=JSON.parse(localStorage.getItem("blogs"))
    const [entries, setEntries]=useState(blogs?blogs:[])

    const [webText, setWebText]=useState(texts.fr)
    
    const handlerFilter=function(e){
    setFilter(e)
}

const handleWordFromUrl=function(e){
    setWordFromUrl(e)
}

 const handleMessage=function(t){
     setMessage({"type":t.type, "text":t.text})
    }

const handleOverMenu=function(state){
  
    setOverMenu(state)
}

const handleEntries=function(en){
    setEntries(en)
}

const handleWebText=function(lang){
    setWebText(lang=="fr"?texts.fr:texts.es)
}



const handleAddBlog=function(text, date, img){


    let newBlogs=[]
if(entries.length>0){

    newBlogs=entries.map((b)=>{
        b.showing=false
        return b
    })

    if(!entries.some((en)=>{
        return en.text==text
    })){
    newBlogs.push({
        "text":text,
        "date":date,
        "img":img,
        "showing":false
    })}}else{ newBlogs=[{
        "text":text,
        "date":date,
        "img":img,
        "showing":false
    }]}

    setEntries(newBlogs)

    localStorage.setItem("blogs", JSON.stringify(newBlogs))



}

const handleRemoveBlog=function(t){

    let newBlogs=entries.filter((en)=>{

            return en.text!=t
    })

    setEntries(newBlogs)

    localStorage.setItem("blogs",JSON.stringify(newBlogs))
}


    
    useEffect(()=>{
        setPlayingGame(false)

    },[wordFromUrl])
    
    const removeData=function(v){
        let newData=data.filter((word)=>{
            return word.original!=v.original
        })
        localStorage.setItem("words", JSON.stringify(newData))
        
        setData(newData)

    }

    const formatVerbes=function(words, cat){
  
      let newWords= words.filter((w)=>{
          return w.category==cat
      }).map((w)=>{
          return {...w, "hidden":true}
      })
  
      return newWords
  
    }

    


    
    const [formattedVerbes,setFormattedVerbes]=useState(formatVerbes(data, wordFromUrl))


    useEffect(()=>{
       
        setFormattedVerbes(formatVerbes(data,wordFromUrl))
    },[data, wordFromUrl])

    
    useEffect(()=>{
setFormattedVerbes(formattedVerbes.map((v)=>{
            v.hidden=true;
            return v
}))

window.scrollTo(0,0)
    },[playingGame])

    const setFirstLetterToCapital=function(word){
        let wordUpper= (word.slice(0,1).toUpperCase()+word.slice(1,word.length).toLowerCase())
        if(wordUpper.includes(" ")){
            wordUpper=wordUpper.replaceAll(" ","-")
        }
        return wordUpper
    }
    
const handleAddWords=function(newData){

   

   
    if(newData.original==" " || newData.original.trim()=="" || newData.translation.trim()==""){
    handleMessage({"type":"repeated", "text":webText?.error.empty})
    return 
  }

  if(newData.original.length>30 || newData.translation.length>30){
    handleMessage({"type":"repeated", "text":webText?.error.long})
    return 
  }
        
    
 if(data.some((d)=>{
      return setFirstLetterToCapital(d.translation)===setFirstLetterToCapital(newData.translation)
    })){
        handleMessage({"type":"repeated", "text":webText?.error.repeated})
      return
    }

    handleMessage({"type":"added", "text":`${webText?.error.added} ${newData.original} ${webText?.error.added2}`})

    let newDataFormatted={"original":setFirstLetterToCapital(newData.original), "translation":setFirstLetterToCapital(newData.translation), "category":ffilter}
 
   setData([...data, newDataFormatted])

   localStorage.setItem("words", JSON.stringify([...data, newDataFormatted]))
  }


  const showWord=function(w){
       
           
            let newVerbes=formattedVerbes.map((verbe)=>{
                if(verbe.original==w.original){
                    console.log("matching found")
                    console.log(verbe.hidden)
                    verbe.hidden=!verbe.hidden;
                    console.log(verbe.hidden)
                }
    
                return verbe
            })

          
    
            setFormattedVerbes(newVerbes)
        }

          const handleStartPlaying=function(){
            setPlayingGame(!playingGame)
        }

    return  (<WordsContext.Provider value={{"data":data, "handleAddWords":handleAddWords, "removeData":removeData, "formattedVerbes":formattedVerbes, "showWord":showWord, "playingGame":playingGame, "handleStartPlaying":handleStartPlaying, "filter":ffilter, "handlerFilter":handlerFilter, "wordFromUrl":wordFromUrl, "handleWordFromUrl":handleWordFromUrl, "message":message, "handleMessage":handleMessage, "overMenu":overMenu, "handleOverMenu":handleOverMenu, "handleAddBlog":handleAddBlog, "entries":entries, "handleEntries":handleEntries, "handleRemoveBlog":handleRemoveBlog, 
        "webText":webText, "handleWebText":handleWebText
    }}>

        {children}

        </WordsContext.Provider>)


}