import { useState, useEffect} from 'react'


import {createContext} from 'react'

export const WordsContext=createContext()

export default function App({children}){
    
    const words=JSON.parse(localStorage.getItem("words"))
    const [data, setData]= useState(words?words:[]) 
    const [playingGame, setPlayingGame]=useState(false)
    const [ffilter, setFilter]=useState("")
    const [wordFromUrl, setWordFromUrl]=useState("")
    const [message, setMessage]=useState({"type":"", "text":""})
    const [overMenu, setOverMenu]=useState(false)
    
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
    console.log("handleOvermenu called with data: "+overMenu)
    setOverMenu(state)
}

console.log("handleOverMenu changed with value: "+overMenu)
    
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

    },[playingGame])

    const setFirstLetterToCapital=function(word){
        return (word.slice(0,1).toUpperCase()+word.slice(1,word.length).toLowerCase())
    }
    
    const handleAddWords=function(newData){

   
        
    
 if(data.some((d)=>{
      return setFirstLetterToCapital(d.translation)===setFirstLetterToCapital(newData.translation)
    })){
        handleMessage({"type":"repeated", "text":"La parole est dejà registrée"})
      return
    }

    handleMessage({"type":"added", "text":"La parole s'a ajouté"})

    let newDataFormatted={"original":setFirstLetterToCapital(newData.original), "translation":setFirstLetterToCapital(newData.translation), "category":newData.category}
 
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

    return  (<WordsContext.Provider value={{"data":data, "handleAddWords":handleAddWords, "removeData":removeData, "formattedVerbes":formattedVerbes, "showWord":showWord, "playingGame":playingGame, "handleStartPlaying":handleStartPlaying, "filter":ffilter, "handlerFilter":handlerFilter, "wordFromUrl":wordFromUrl, "handleWordFromUrl":handleWordFromUrl, "message":message, "handleMessage":handleMessage, "overMenu":overMenu, "handleOverMenu":handleOverMenu}}>

        {children}

        </WordsContext.Provider>)


}