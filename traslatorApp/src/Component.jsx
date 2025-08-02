import {useState,useRef, useEffect, useContext, act} from 'react'

import { useDisplayVerbes } from './useDisplayVerbes.js'
import {useParams} from 'react-router-dom'

import {Navigator} from './Home.jsx'
import './Component.css'
import { WordsContext } from './App.jsx'

import trash from './assets/trash-can.svg'

export  default function Component(){

     const {verbes, buttons, counters, currentButton, updateCounter, setToCurrent, actualCounter}=useDisplayVerbes()
     const {handleOverMenu, showWord, playingGame, handleStartPlaying, removeData, handleWordFromUrl, wordFromUrl}=useContext(WordsContext)

     const {filter}=useParams()
   useEffect(()=>{
    handleWordFromUrl(filter)
   },[filter])

    return <>
    <main onClick={(e)=>{
        console.log(e.target.className)
    if((e.target.className!="navContainer-reduced")&&(e.target.className!="menu-alt-logo")){

      handleOverMenu(false)
    }
   }}>
 
    <Navigator wordFromUrl={wordFromUrl}/>

    {!playingGame &&  <div className="Component">

    <label className="wordsToShowLabel" htmlFor="wordsToShow">Paroles montrées: </label>
    <select  className="wordsToShow" name="wordsToShow" id="wordsToShow" onChange={(v)=>{
        updateCounter(v.target.value)
    }}>

        {
            counters.map((c)=>{
                
               return <option value={c} selected={c==actualCounter}>{c}</option>
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

    <button  className="startPlaying" onClick={()=>{
        handleStartPlaying()
    }}> Jouer</button>
    
    <ul>
        {verbes && <div className="wordContainer-container">
             {verbes.map((word)=>{


  return <div className='wordContainer'>  
    <li key={word}>
    <p> <span className={word.hidden?"originalWord overlined":"originalWord"} onClick={()=>{
       showWord(word)
    }}>{word.original}</span> <h3 className="translationWord"> {word.translation}</h3> </p>
   <button onClick={()=>{
    removeData(word)
   }}><img src={trash}></img></button>
    </li>
  </div>


})}

</div>}
        
    </ul>
    
    </div>}
    </main>
    {playingGame && <main>
        
        <GameRules/>
    
        </main>}
</>
}

function GameRules({}){

    const [rules, setRules]=useState({"number": 1,"time":5, "automatique":false})
    const [started, setStarted]=useState(false)


    const {formattedVerbes}=useContext(WordsContext)
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
            handleRules({"number":e.target.number.value, "time":e.target.minutos.value, "automatique":e.target.automatique.checked})
            startGame()

        }}>
        <table>
            <tbody>
            <tr>
                <td>Nombre de paroles</td>
                <td><input type="number" name="number" max={formattedVerbes.length} min={formattedVerbes.length>5?5:1} defaultValue={formattedVerbes.length>5?5:1} step={formattedVerbes.length>5?5:0}/></td>
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
                <td><input name="automatique" type="checkbox"/></td>     
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

    
    const {formattedVerbes, showWord, handleStartPlaying}=useContext(WordsContext)
    const [playing, setPlaying]=useState(true)
    const [clock, setClock]=useState(rules.time*60)
    const [numberPlaying, setNumberPlaying]=useState(Math.floor(Math.random()*formattedVerbes.length))
    const [numbersPlayed,setNumbersPlayed]=useState([numberPlaying])
    
    
    let wordsLeft=useRef(1)
    let secondsPassed=useRef(0)
    
    
    const handleNext=function(){

        let keepGoing=true
        
        while(keepGoing){
            let newNumber=Math.floor(Math.random()*formattedVerbes.length)
           
            

            if(numbersPlayed.includes(newNumber) && numbersPlayed.length!=rules.number){
                continue
            }else{
            setNumberPlaying(newNumber)
            let newPlayed=numbersPlayed.map((e)=>{
                return e
            })
            wordsLeft.current++
            newPlayed.push(newNumber)
            setNumbersPlayed(newPlayed)
            if(newPlayed.length>=(Number.parseInt(rules.number)+1)){
                console.log("game is finishing")
                handleStartPlaying()
                break
            }
            keepGoing=false}
        }    
    }

    useEffect(()=>{
        secondsPassed.current++
        setTimeout(()=>{


            setClock(clock-1)
            if(clock==0){
                handleStartPlaying()
            }

        },1000)

        if(rules.automatique&&(secondsPassed.current%3===0&&secondsPassed.current>3)){
            handleNext()          
            
        }

        if(rules.automatique&&((secondsPassed.current+1)%3===0&&(secondsPassed.current+1)>3)){
            showWord(formattedVerbes[numberPlaying])
        }
     }
    ,[clock])

    
    
    return <>

    {(playing)&&<main className="gameBoard">

        <p>{rules.automatique?"Playing automatique":""}</p>
    <p><span>{Math.trunc(clock/60)}</span>: <span>{clock%60}</span> left</p>

    <div>
        <div className='wordContainer'>  
    <li key={formattedVerbes[numberPlaying]}>
    <p> <span className={formattedVerbes[numberPlaying].hidden?"originalWord overlined":"originalWord"} onClick={()=>{
       showWord(formattedVerbes[numberPlaying])
    }}>{formattedVerbes[numberPlaying].original}</span> <div className="trans-word-container"><h3 className='translationWord'> {formattedVerbes[numberPlaying].translation}</h3></div> </p>
    </li>
  </div>
        <button  style={rules.number==wordsLeft.current?{backgroundColor:"red"}:{}}onClick={()=>{
            handleNext()
        }}>{rules.number==wordsLeft.current?"Finish":"Check"}</button>

    </div>

    <p>Words displayed: <span>{wordsLeft.current}</span> / {rules.number}</p>
    </main>
    }
    
    </>



}