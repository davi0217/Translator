import {useState,useRef, useEffect, useContext} from 'react'

import { useDisplayVerbes } from './useDisplayVerbes.js'

import {Navigator} from './Home.jsx'
import './Component.css'
import { WordsContext } from './App.jsx'
import { useSearch } from './useSearch.js'

export  default function Verbes(){

     const {verbes, buttons, counters, currentButton, playingGame, updateCounter, setToCurrent, handleStartPlaying, showWord}=useDisplayVerbes()

    return <>
 
    <Navigator/>

    {!playingGame &&  <main>

    <label htmlFor="wordsToShow">Words showing: </label>
    <select name="wordsToShow" id="wordsToShow" onChange={(v)=>{
        updateCounter(v.target.value)
    }}>

        {
            counters.map((c)=>{
                
                if(c==10){
                    return <option value="10" default>10</option>
                }else{
                    return <option value={c}>{c}</option>
                }
            }
        )
    }
    </select>

    <div className='buttonsContainer'>
        {buttons && buttons.map((b)=>{
            return <button value={b.display} className={currentButton==b.display?"current":""}
            onClick={()=>{
                if(b.number){
                        setToCurrent(b.display)
                }else if(b.display=="<" && currentButton>0){
                    setToCurrent(currentButton-1)
                }else if(b.display=="<<"){
                    setToCurrent(0)
                }else if(b.display==">" && currentButton<buttons.length-5){
                    setToCurrent(currentButton+1)
                }else if(b.display==">>"){
                    setToCurrent(buttons.length-5)
                }
            }}
            >{b.display}</button>
        })}
    </div>

    <button onClick={()=>{
        handleStartPlaying()
    }}> Start playing</button>
    
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
    
    </main>}


    {playingGame&& <main>
        
        <GameRules/>


        
        
        </main>}
</>
}

function GameRules({}){

    const [rules, setRules]=useState({"number": 0,"time":0})
    const [started, setStarted]=useState(false)


    const {data, formatVerbes}=useContext(WordsContext)
    const handleRules=function(obj){
        setRules(obj)
    }

    const startGame=function(){
        setStarted(true)
    }


    return <>
    
    {!started && <main>
        <div className='gameRulesContainer'>
        <h1>Redige les règlements pour ton jeu</h1>

        <form action="post" onSubmit={(e)=>{
            e.preventDefault()
            handleRules({"number":e.target.number.value, "time":e.target.minutos.value})
            startGame()

        }}>
        <table>
            <tbody>
            <tr>
                <td>Nombre de paroles</td>
                <td><input type="number" name="number" max={formatVerbes(data,"Verbe").length} min={0} step={5}/></td>
            </tr>
            <tr>
                <td>Temps</td>
                <td><select name="minutos" id="minutos">
                    <option value={5} default>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    </select></td>
            </tr>
            <tr>
                <td>Automatique</td>
                <td><input type="checkbox"/></td>     
            </tr>
            <tr>

                <td></td>
                <td><input type="submit" value="On y va"/></td>
            </tr>
            </tbody>
        </table>
    </form>

    </div>
    </main>
    }

    {started && <Game rules={rules}/>}
    </>
}

function Game({rules}){

    const {formattedVerbes}=useDisplayVerbes()
    const [playing, setPlaying]=useState(true)
    const [clock, setClock]=useState(rules.time*60)
    const [numberPlaying, setNumberPlaying]=useState(Math.floor(Math.random()*formattedVerbes.length))
    const [numbersPlayed,setNumbersPlayed]=useState([numberPlaying])

    const {showWord}=useDisplayVerbes()

    console.log("arriving in game, formattedverbes are "+formattedVerbes[numberPlaying].hidden)

    useEffect(()=>{
       

        setTimeout(()=>{


            setClock(clock-1)
            if(clock==0){
                setPlaying(false)
            }

        },1000)

        

    },[clock])

   

    const handleNext=function(){

        let keepGoing=true
        
        while(keepGoing){
            let newNumber=Math.floor(Math.random()*formattedVerbes.length)
           
            

            if(numbersPlayed.includes(newNumber)){
                continue
            }else{
            setNumberPlaying(newNumber)
            let newPlayed=numbersPlayed.map((e)=>{
                return e
            })
            newPlayed.push(newNumber)
            setNumbersPlayed(newPlayed)
            if(newPlayed.length>=(Number.parseInt(rules.number)+1)){
                setPlaying(false)
                break
            }
            keepGoing=false}
        }    
    }


    return <>

    {playing &&<main>
    <p><span>{Math.trunc(clock/60)}</span>: <span>{clock%60}</span> left</p>

    <div>
        <div className='wordContainer'>  
    <li key={formattedVerbes[numberPlaying]}>
    <p> <span className={formattedVerbes[numberPlaying].hidden?"originalWord overlined":"originalWord"} onClick={()=>{
       showWord(formattedVerbes[numberPlaying])
    }}>{formattedVerbes[numberPlaying].original}</span>: <span> {formattedVerbes[numberPlaying].translation}</span> </p>
    </li>
  </div>
        <button onClick={()=>{
            handleNext()
        }}>Check</button>

    </div>
    </main>
    }
    </>



}