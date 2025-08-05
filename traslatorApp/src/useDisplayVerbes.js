import {useState, useEffect, useContext} from 'react'
import { WordsContext } from './App.jsx'


export function useDisplayVerbes(){

        const {formattedVerbes, wordFromUrl}=useContext(WordsContext)
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
        
            if(currentButton*30>=formattedVerbes.length){
                setToCurrent(currentButton-1)
            }

       

        },[buttons])

        useEffect(()=>{
            setCurrentButton(0)
        }, [wordFromUrl])
          
    
        useEffect(()=>{

            let newVerbesToShow=formattedVerbes.slice(currentButton*30,formattedVerbes.length).slice(0,actualCounter)
            setVerbes(newVerbesToShow)
           
           
        },[actualCounter, currentButton, formattedVerbes])
          
        useEffect(()=>{
            let newCounters=[10]
            
            for(let i=1; i<=formattedVerbes.slice(currentButton*30,formattedVerbes.length).length; i++){
                if (i%10===0&&i<30){
                    newCounters.push(i+10)
                    
                }
            }
            
            setCounters(newCounters)
            
            
        },[formattedVerbes, currentButton])

        useEffect(()=>{
            setActualCounter(10)

        }, [currentButton])
        
        const updateCounter=function(value){
            setActualCounter(value)
        }
    
        const setToCurrent=function(button){
            setCurrentButton(button)
        }
    
    
       

        return {"verbes":verbes, "buttons":buttons,"currentButton":currentButton,"counters":counters, "actualCounter":actualCounter, "updateCounter":updateCounter, "setToCurrent":setToCurrent, "formattedVerbes":formattedVerbes}
}