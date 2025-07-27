import {useState,useRef, useEffect} from 'react'

import {Navigator} from './App.jsx'
import './Component.css'

export  default function Verbes(){

    let words=JSON.parse(localStorage.getItem("words"))
    let formattedVerbes=words.filter((w)=>{
        return w.category=="Verbe"
    }).map((w)=>{
        return {...w, "hidden":true}
    })
    console.log(formattedVerbes)

    const [verbes, setVerbes]=useState(formattedVerbes)
    const [counters,setCounters]=useState([])
    const [actualCounter,setActualCounter]=useState(10)
   



    useEffect(()=>{

        let newVerbesToShow=formattedVerbes.slice(0,actualCounter)
        setVerbes(newVerbesToShow)
       
    },[actualCounter])

    
    useEffect(()=>{
        let newCounters=[10]
        
        for(let i=1; i<formattedVerbes.length; i++){
            if (i%10===0&&i>10){
                newCounters.push(i)
                
            }
        }
        
        setCounters(newCounters)
        
        
    },[verbes])
    
    const updateCounter=function(value){
        setActualCounter(value)
    }


    const showWord=function(w){
        let newVerbes=verbes.map((verbe)=>{
            if(verbe.original==w.original){
                verbe.hidden=!verbe.hidden;
            }

            return verbe
        })

        setVerbes(newVerbes)
    }

    return <main>
    <Navigator/>

    <label htmlFor="wordsToShow">Words showing: </label>
    <select name="wordsToShow" id="wordsToShow" onChange={(v)=>{
        updateCounter(v.target.value)
    }}>
        {
            counters.map((c)=>{

                if(c==10){
                    return <option value={c} default>{c}</option>
                }else{
                return <option value={c}>{c}</option>
            }
            }
        )
        }
    </select>
    
    <ul>
        {verbes && verbes.map((word)=>{


  return <div className='wordContainer'>  
    <li key={word}>
    <p> <span className={word.hidden?"originalWord overlined":"originalWord"} onClick={()=>{
       showWord(word)
    }}>{word.original}</span>: <span> {word.translation}</span> </p>
    </li>
  </div>
  



})}
        
    </ul>
    
    </main>
}