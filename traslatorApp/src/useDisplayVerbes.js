import {useState, useEffect, useContext} from 'react'
import { WordsContext } from './App.jsx'


export function useDisplayVerbes(){

        const {data, formatVerbes}=useContext(WordsContext)
        const [formattedVerbes, setFormattedVerbes]=useState(formatVerbes(data,"Verbe"))
        const [verbes, setVerbes]=useState()
        const [counters,setCounters]=useState([])
        const [actualCounter,setActualCounter]=useState(10)
        const [buttons, setButtons]=useState([])
        const [currentButton, setCurrentButton]=useState(0)
        const [playingGame, setPlayingGame]=useState(false)
    
        useEffect(()=>{
        
            let newButtons=[];
    
            if(formattedVerbes.length>30){
                    newButtons.push({"display":"<<", "number":false})
                    newButtons.push({"display":"<", "number":false})
                    for(let i=0;i<formattedVerbes.length; i=i+30){
                        newButtons.push({"display":i/30, "number":true})
                    }
                    newButtons.push({"display":">", "number":false})
                    newButtons.push({"display":">>", "number":false})
                
            }
    
            setButtons(newButtons)
    
        }, [formattedVerbes])
          
    
        useEffect(()=>{
            
            let newVerbesToShow=formattedVerbes.slice(currentButton*30,formattedVerbes.length).slice(0,actualCounter)
            setVerbes(newVerbesToShow)
            console.log(newVerbesToShow)
           
        },[actualCounter, currentButton])
          
        useEffect(()=>{
            let newCounters=[10]
            
            for(let i=1; i<formattedVerbes.slice(currentButton*30,formattedVerbes.length).length; i++){
                if (i%10===0&&i>10){
                    newCounters.push(i)
                    
                }
            }
            
            setCounters(newCounters)
            
            
        },[formattedVerbes, currentButton])
        
        const updateCounter=function(value){
            setActualCounter(value)
        }
    
        const setToCurrent=function(button){
            setCurrentButton(button)
        }
    
    
        const showWord=function(w){
            console.log("showword clicked with verbe: "+w.original+" "+w.hidden)
           
            let newVerbes=formattedVerbes.map((verbe)=>{
                if(verbe.original==w.original){
                    console.log("matching found")
                    console.log(verbe.hidden)
                    verbe.hidden=!verbe.hidden;
                    console.log(verbe.hidden)
                }
    
                return verbe
            })

            console.log(newVerbes)
    
            setFormattedVerbes(newVerbes)
        }
    
        const handleStartPlaying=function(){
            setPlayingGame(!playingGame)
        }


        return {"verbes":verbes, "buttons":buttons,"currentButton":currentButton,"counters":counters, "actualCounter":actualCounter, "playingGame":playingGame, "updateCounter":updateCounter, "setToCurrent":setToCurrent, "showWord":showWord, "handleStartPlaying":handleStartPlaying, "formattedVerbes":formattedVerbes}
}