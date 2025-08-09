import {useState,useRef, useEffect, useContext, useMemo} from 'react'

import { useDisplayVerbes } from './useDisplayVerbes.js'
import {useParams, Link} from 'react-router-dom'

import {Navigator} from './Home.jsx'
import {Footer} from './Home.jsx'
import './Component.css'
import { WordsContext } from './App.jsx'


import trash from './assets/trash-can.svg'
import hangman from './assets/hangman.png'
import guess from './assets/guess.png'
import france from './assets/france.png'

const hangmanList =[
  "https://i.imgur.com/kReMv94.png",
  "https://i.imgur.com/UFP8RM4.png",
  "https://i.imgur.com/9McnEXg.png",
  "https://i.imgur.com/vNAW0pa.png",
  "https://i.imgur.com/8UFWc9q.png",
  "https://i.imgur.com/rHCgIvU.png",
  "https://i.imgur.com/CtvIEMS.png",
  "https://i.imgur.com/Z2mPdX0.png"
];

const fixedLetters="qwertyuiopñlkjhgfdsazxcvbnmç"

export  default function Component(){

     const {verbes, buttons, counters, currentButton, updateCounter, setToCurrent, actualCounter}=useDisplayVerbes()
     const {handleOverMenu,webText, showWord, playingGame, handleStartPlaying, removeData, handleWordFromUrl, wordFromUrl}=useContext(WordsContext)

     const {filter}=useParams()

   useEffect(()=>{
    handleWordFromUrl(filter)
   },[filter])

    return <>
    <main onClick={(e)=>{
        
    if((e.target.className!="navContainer-reduced")&&(e.target.className!="menu-alt-logo")){

      handleOverMenu(false)
    }
   }}>
 
    <Navigator wordFromUrl={wordFromUrl}/>

    {(!playingGame && wordFromUrl!="Blog") &&  <div className="Component">

    <label className="wordsToShowLabel" htmlFor="wordsToShow">{webText.comp?.counterLabel}: </label>
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
        window.scrollTo(0,0)
        handleStartPlaying()
    }}>{webText.comp?.playButton}</button>
    
    <ul>
        {verbes && <div className="wordContainer-container">
             {verbes.map((word)=>{


  return <div className='wordContainer'>  
    <li key={word}>
    <p> <span className={word.hidden?"originalWord overlined":"originalWord"} onClick={()=>{
       showWord(word)
    }}>{word.original}</span> <h3 className="translationWord"> {word.translation}</h3> </p>
   <button className= "remove-button" onClick={()=>{
    removeData(word)
   }}><img src={trash}></img></button>
    </li>
  </div>


})}

</div>}
        
    </ul>
    
    </div>}
   
    {playingGame && <aside className="gameRulesAside">
        
        <GameRules/>
        
    
        </aside>}

{(!playingGame && wordFromUrl=="Blog") && <div className="blog-board">

    <Blog/>
    
    </div>}
    
    <Footer/>
    </main>
</>
}

function GameRules({}){

    const {webText}=useContext(WordsContext)

    const [choosenGame, setChoosenGame]=useState(false)
    const [rules, setRules]=useState({"number": 1,"time":5, "automatique":false})
    const [started, setStarted]=useState(false)

    const [games, setGames]=useState([
        {"game":"guess",
            "title":webText.comp?.gameTitle1,
         "showBack":false,
        "explanation":webText.comp?.guess.guessInfo}, 
        {"game":"hangman",
            "title":webText.comp?.gameTitle2,
        "showBack":false,
    "explanation":webText.comp?.hangman.hangmanInfo}])


    useEffect(()=>{
        window.scrollTo(0,0)
    },[started])

    const {formattedVerbes}=useContext(WordsContext)
    const handleRules=function(obj){
        setRules(obj)
    }

    const startGame=function(){
        setStarted(true)
    }

    const showBack=function(data){

        let newGames=games.map((g)=>{
            if(g.game==data.game){
                g.showBack=!g.showBack
            }
            return g
        })

        setGames(newGames)
    }

    const chooseGame=function(data){
                setChoosenGame(data)
    }


    return <>
    
   { !started && <div className="game-boxes-container">

        {games.map((g)=>{
                return <div className={`game-box ${g.game}`}>
            <div  onClick={()=>{
                    showBack(g)
                }} className={g.showBack?"game-box-front hidden":"game-box-front"}><h5>{g.title}</h5>
            </div>
            <div className={g.showBack?'game-box-back':'game-box-back hidden'}>
                <p onClick={()=>{
                    showBack(g)
                }} className="game-explanation">{g.explanation}</p>
                <div className="game-trigger">
                    <p onClick={()=>{
                        chooseGame(g.game)
                        startGame()
                    }}>Jouer</p>
                </div>
            </div>

        </div>

        })}      
        
        </div>}

    {(started && choosenGame!="hangman") && <Rules/>}
    {(started && choosenGame=="hangman") && <Hangman/>}
    </>
}

function Rules(){

    const [rules, setRules]=useState({"number": 1,"time":5, "automatique":false})
    const [started, setStarted]=useState(false)

    const {webText}=useContext(WordsContext)

   

    useEffect(()=>{
        window.scrollTo(0,0)
    },[started])

    const {formattedVerbes}=useContext(WordsContext)
    const handleRules=function(obj){
        setRules(obj)
    }

    const startGame=function(){
        setStarted(true)
    }

   


    return <>
     {!started && <div>
        <div className='gameRulesContainer'>
        <h1>{webText.comp?.guess.guessInstructionsTitle}</h1>

        <form action="post" onSubmit={(e)=>{
            e.preventDefault()
            handleRules({"number":e.target.number.value, "time":e.target.minutos.value, "automatique":e.target.automatique.checked})
            startGame()

        }}>
        <table>
            <tbody>
            <tr>
                <td>{webText.comp?.guess.instructionsNumber}</td>
                <td><input type="number" name="number" max={formattedVerbes.length} min={formattedVerbes.length>5?5:1} defaultValue={formattedVerbes.length>5?5:1}/></td>
            </tr>
            <tr>
                <td>{webText.comp?.guess.instructionsTime}</td>
                <td><select name="minutos" id="minutos">
                    <option value={5} default>5  minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    </select></td>
            </tr>
            <tr>
                <td>{webText.comp?.guess.instructionsAutomatique}</td>
                <td><input name="automatique" type="checkbox"/></td>     
            </tr>
            <tr>

                <td></td>
                <td><input type="submit" value={webText.comp?.guess.instructionsButton}/></td>
            </tr>
            </tbody>
        </table>
    </form>

    </div>
    </div>
   }
    
    {started && <Game rules={rules}/>}

    </>
}


function Game({rules}){

    
    const {formattedVerbes, webText, showWord, handleStartPlaying}=useContext(WordsContext)
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
{
    playing&&<div className="gameBoard">

        <p>{rules.automatique?"Playing automatique":""}</p>
    <p><span>{Math.trunc(clock/60)}</span>: <span>{clock%60}</span> {webText.comp?.guess.guessLeft}</p>

    <div>
        <div className='wordContainer'>  
    
    <p> <span className={formattedVerbes[numberPlaying].hidden?"originalWord overlined":"originalWord"} onClick={()=>{
       showWord(formattedVerbes[numberPlaying])
    }}>{formattedVerbes[numberPlaying].original}</span> <div className="trans-word-container"><h3 className='translationWord'> {formattedVerbes[numberPlaying].translation}</h3></div> </p>
    
  </div>
        <button  style={rules.number==wordsLeft.current?{backgroundColor:"red"}:{}}onClick={()=>{
            handleNext()
        }}>{rules.number==wordsLeft.current?"Finish":"Check"}</button>

    </div>

    <p>{webText.comp?.guess.guessDisplayed}: <span>{wordsLeft.current}</span> / {rules.number}</p>
    </div>
}
    </>



}

function Hangman(){

    const {formattedVerbes, webText}=useContext(WordsContext)
    const [playing, setPlaying]=useState(true)

    const [randomWord, setRandomWord]=useState(formattedVerbes[Math.floor(Math.random()*formattedVerbes.length)].original.toLowerCase().trim())

    const [randomChars, setRandomChars]=useState([...randomWord].map((l)=>{
        return {"letter":l,
            "showing":false,
            "right":false,
            "wrong":false
        }
    }))

    const[clock, setClock]=useState(0)

    const [currentTranslation, setCurrentTranslation]=useState()

    const [result, setResult]=useState({
        "outcome":"",
        "time":0,
        "word":randomWord
    })

    let mistakes=useRef(0)
    let wrongLetters=useRef([])


    useEffect(()=>{

        setTimeout(()=>{
            setClock(clock+1)
        },1000)


    },[clock])
   
    useEffect(()=>{

        formattedVerbes.forEach((d)=>{

            
            if(d.original.toLowerCase()==randomWord.toLowerCase()){

                setCurrentTranslation(d.translation)
            }
        })

        if(randomChars.length<5){
            let newInt=Math.floor(Math.random()*4)
            let newChars=randomChars.map((c, index)=>{
            if((!fixedLetters.includes(c.letter))|| index== newInt ){
                c.showing=true 
                return c
            }else{
                return c
            }
        }   )  

        setRandomChars(newChars)
        }

        if(randomChars.length>=5){
            let newInt=Math.floor(Math.random()*randomChars.length-1)
            
          
            let newChars=randomChars.map((c, index)=>{
            if((!fixedLetters.includes(c.letter))|| index== newInt){
                c.showing=true 
                return c
            }else{
               return c
            }
        }   
    )  

        setRandomChars(newChars)
        }
    },[])
    
    const finishGame=function(state){
        let newResults={
            "outcome":state,
            "time":clock,
            "word":randomWord
        }

        setResult(newResults)
    }

    useEffect(()=>{

        if(mistakes.current>=7){
                    window.scrollTo(0,0)
                    finishGame("lose")
                    return         
                }

        let needToChange=0;
        let newChars=randomChars.map((c, index)=>{
            if(c.letter==[...randomWord][index]){
                console.log("now we are comparing "+c.letter+" with the original  "+ [...randomWord][index])
                return c
            }else{
                c.wrong=false
                c.letter=[...randomWord][index]
                c.showing=false
                needToChange++

                return c
            }
        })
        
        if(needToChange>0){
        setTimeout(()=>{
            setRandomChars(newChars)
        },1000)}

        if(!randomChars.some((d)=>{
            return d.showing==false
        })){
            window.scrollTo(0,0)
            finishGame("win")
        }


    }, [randomChars]) 


    const checkLetter=function(l, letterIndex){

       
        let newChars= randomChars.map((c, index)=>{
            if(letterIndex==index){
                console.log("we are comparing "+c.letter+" with "+l)

            if(c.letter==l.toLowerCase()){
                c.showing=true;
                c.wrong=false;
                c.right=true;
            }else{
                mistakes.current++
                
                if(!wrongLetters.current.some((letter)=>{
                    return letter==l
                })){
                    wrongLetters.current.push(l.toLowerCase())
                }
                c.letter=l.toLowerCase()
                c.showing=true
                c.wrong=true
            }
            return c
        }else{
            return c
        }
        })

        setRandomChars(newChars)
    }

    


    return <>
     { !result.outcome && <div className="hangman-board">
        <h1>{webText.comp?.hangman.hangmanTitle}</h1>

        <div className="hangman-display">
            
            <div className="hangman-container">
                <img src={hangmanList[mistakes.current]} alt="hangman image" />
            </div>
            <div className="hangman-word">
                 
                <p>{webText.comp?.hangman.hangmanComplete}: <br /><span style={{fontWeight:"bold", color:"brown", textAlign:"center", fontSize:"20px"}}>{

                    currentTranslation
                   
            }</span></p>
                <h3>{mistakes.current}/7 {webText.comp?.hangman.hangmanError} {wrongLetters.current.length>0 && ":"} <br />
                    {wrongLetters.current.length==0 && <span style={{color:"red"}}>-----</span>}
                    {wrongLetters.current.length>0 && wrongLetters.current.map((l)=>{
                        
                        return <span style={{color:"red"}}>{l+" - "}</span>
                    })}
                </h3>
                 <div className="chars-container">

                    {randomChars.map((d, index)=>{
                        console.log("in mapping d is "+d.showing)
                            return <input maxLength="1" type="text" value={d.showing?d.letter:""} 
                            style={d.wrong?{"color":"red"}:{"color":"black"}}
                            onChange={(e)=>{
                                if(d.showing){
                                    return
                                }
                                checkLetter(e.target.value, index)
                            }}>
                                
                            </input>
                        })}
                </div>
            </div>
        </div>
        
        
    </div>
}

{result.outcome && <Result resultData={result}/>}
        </>

}


function Result({resultData}){

    const [isVisible,setIsVisible]=useState(false)
    const {handleStartPlaying, webText}=useContext(WordsContext)

    const handleVisibility=function(){
        console.log("charging after loading")
        setIsVisible(true)
    }


    useEffect(()=>{
        setTimeout(()=>{
        handleVisibility()},250)
    },[])

return <aside className='results-board'>
   
    <div className="results-container">

        <h1 className='results-title'>{resultData.outcome=="win"?webText.comp?.hangman.hangmanWinTitle:webText.comp?.hangman.hangmanLoseTitle}</h1>

        <h2 className={isVisible?" visible-subtitle":"results-subtitle"}> {webText.comp?.hangman.hangmanTime} <br />{(Math.floor(resultData.time/60))==0?"":Math.floor(resultData.time/60)+" " +webText.comp?.hangman.hangmanMinutes }  {resultData.time%60} {webText.comp?.hangman.hangmanSeconds}</h2>

        <h2 className={isVisible?"visible-little-title":"results-subtitle"}>{webText.comp?.hangman.hangmanReveal} <br /> {resultData.word}</h2>
   
    <button className="exit-button" onClick={()=>{
        handleStartPlaying()
    }}>{webText.comp?.hangman.hangmanExit}</button>
    </div>




</aside>
}

function Blog(){

    const {entries, webText, handleEntries, handleRemoveBlog}=useContext(WordsContext)


 



    const handleBlogs=function(b){

        let newBlogs=entries.map((blog)=>{
            if(blog.text==b){
                blog.showing=!blog.showing
            }
            return blog
        })

        handleEntries(newBlogs)

    }


    return <>

    <div className="blog-title">
        <h1>{webText.comp?.blog.blogTitle}</h1>
    </div>

    {entries &&  <div className='entries-container'>

       

            {entries.map((b)=>{
               return  <div className='entry-container'>
            <div className='profile-entry-container'>
                <img src={b.img} alt="" />
            </div>

                <div onClick={(e)=>{

                    if(e.target.className!="remove-blog-button"){
                    handleBlogs(b.text)}
                }} className={b.showing?'entry-info-visible':'entry-info'}>
                <div className="entry-header"><h2>{b.date}</h2> <span><img className="remove-blog-button" onClick={()=>{
                    handleRemoveBlog(b.text)
                }} src={trash} alt="" /></span></div>
                <div className='entry-text'>
                    <p>{b.text}</p>
                </div>
            </div>
            </div>
            })}

           
       
    </div>
}

{entries.length==0 && <h1 className="blog-empty"> {webText.comp?.blog.blogEmpty}</h1>}

<div className="blog-footer">
    <Link to="/" className='blog-footer-link' ><h1>{webText.comp?.blog.blogFooter}</h1></Link>
        
    </div>
    </>
}