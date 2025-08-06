import { useContext, useEffect, useState} from 'react'
import {useSearch} from './useSearch.js'
import { WordsContext } from './App.jsx'
import {useIntersection} from './useIntersection.js'

import {Link, useParams} from 'react-router-dom'

import './Home.css'

import menu from './assets/menu.svg'

import flecha from './assets/flecha-abajo.svg'

import spanish from './assets/spanish-flag.png'
import french from './assets/french.png'
import github from './assets/github.svg'
import linkedin from './assets/linkedin-logo.png'
import creme from './assets/creme.png'



function Home() {

  const {handleOverMenu}=useContext(WordsContext)


  const { language, wordToSearch, handlerSearch, handlerLanguage}=useSearch()
 
return <main onClick={(e)=>{
  console.log(e.target.className)
    if((e.target.className!="navContainer-reduced")&&(e.target.className!="menu-alt-logo")){

      handleOverMenu(false)
    }
   }}>
  <Navigator/>

  <h1 className="title">Ton app de traduction</h1>

  <h2 className="subtitle">Traduisez automatiquement les mots que vous souhaitez et enregistrez-les dans votre propre espace personnel</h2>

<Input handleSearch={handlerSearch} handlerLanguage={handlerLanguage} language={language}/>
<Display word={wordToSearch} language={language}/>
<Challenge/>
<Footer/>
</main>
  


}

export function Navigator({wordFromUrl}){

  const {overMenu, handleOverMenu}=useContext(WordsContext)

 
  return <>

  <div className="navContainer">
    <nav>
      <Link to="/" style={wordFromUrl?{}:{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}}>Rechercher</Link>
     
      <Link to="/component/Verbe" style={wordFromUrl=="Verbe"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>Verbes</Link>
      <Link to="/component/Adjectif" style={wordFromUrl=="Adjectif"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}} >Adjectifs</Link>
      <Link to="/component/Adverbe" style={wordFromUrl=="Adverbe"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>Adverbes</Link>
      <Link to="/component/Vocabulaire" style={wordFromUrl=="Vocabulaire"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>Vocabulaire</Link>
      <Link to="/component/Façons" style={wordFromUrl=="Façons"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>Façons de dire</Link>
    </nav>
  </div>

  <div className='navContainer-reduced' onClick={(e)=>{
   
    handleOverMenu(!overMenu)
   }}>
   {!wordFromUrl  && <img  className="menu-alt-logo" src={menu} alt="" onClick={(e)=>{
    
    
    handleOverMenu(!overMenu)
    
   }}/>}
   {wordFromUrl && <h2 className="menu-alt-logo" style={{color:"white", fontSize:"30px"}}>{wordFromUrl} <img src={flecha} style={{minWidth:"10px"}} alt="" /></h2>}
   <div className={overMenu?"altNav":"hidden"}>
    <nav>
      <Link to="/" style={wordFromUrl?{}:{backgroundColor:"rgb(245, 217, 196)"}}>Rechercher</Link>
     
      <Link to="/component/Verbe" style={wordFromUrl=="Verbe"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>Verbes</Link>
      <Link to="/component/Adjectif" style={wordFromUrl=="Adjectif"?{backgroundColor:"rgb(245, 217, 196)"}:{}} >Adjectifs</Link>
      <Link to="/component/Adverbe" style={wordFromUrl=="Adverbe"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>Adverbes</Link>
      <Link to="/component/Vocabulaire" style={wordFromUrl=="Vocabulaire"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>Vocabulaire</Link>
      <Link to="/component/Façons" style={wordFromUrl=="Façons"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>Façons de dire</Link>
    </nav>
   </div>
    

  </div>

  </>
}

function Input({handleSearch,  handlerLanguage, language}){

  const [value, setValue]=useState("")

  const {handleAddWords, handlerFilter, filter}=useContext(WordsContext)
  const [actualFilter, setActualFilter]=useState("Verbe")

  const [seeOptions, setSeeOptions]=useState(true)

  const [ref, isVisible]=useIntersection(0.90)

  const handleSeeOptions=function(e){

    if(e!=="text"){
    setSeeOptions(!seeOptions)
    }
  }
  

  const handleChange=function(e){

    setValue(e)
  }
  const handleChangeFilter=function(e){

    handlerFilter(e)
  }

  

  return <>
  <div className='formsContainer'>
  <form  className="searchForm" name="searchForm" action="POST" onSubmit={(e)=>{
      e.preventDefault()
      handleSearch(value)
      handlerFilter(e.target.filter.value)
      e.target.search.value=""
    }} >

      <div className='inputContainer visible'>
    <label htmlFor="filter">Choisissez la catégorie </label>
    <select name="filter" id="filter" onChange={(e)=>{
      handlerFilter(e.target.value)
    }}>
      <option value="Verbe" default>Verbe</option>
      <option value="Adjectif">Adjectif</option>
      <option value="Adverbe">Adverbe</option>
      <option value="Vocabulaire">Vocabulaire</option>
      <option value="Façons">Façon de dire</option>
    </select>
    </div>
    <div  className='inputContainer '>
    <label htmlFor="language"> <img  className="flag-logo" src={language=="français"?french:spanish}></img>Language</label>
    <select name="language" id="language" onChange={()=>{
      
      handlerLanguage()
    }}>
      <option value="french-spanish" default>Français à spagnol</option>
      <option value="spanish-french">Spagnol à français</option>
    </select>
    </div>
    <div className='inputContainer'>
    <label  htmlFor="search">Chercher</label>
    <input type="text" name="search"  onChange={(e)=>{
      handleChange(e.target.value)
    }}/>
    </div>
  <div  className='inputContainer'>
    <input type="submit" value="Envoyer" />
    </div>
  </form>

  <form action=""  onClick={(e)=>{
    
      handleSeeOptions(e.target.type)
    }} ref={ref} className={(seeOptions?"self-introduction-form self-introduction-form-reduced":"self-introduction-form")+(isVisible?' visible':'')} onSubmit={(e)=>{
    e.preventDefault()
    let newWord={"original":e.target.original.value, "translation":e.target.translation.value, "category":filter}
    handleAddWords(newWord)
    e.target.original.value=""
    e.target.translation.value=""

  }}  >
    <label htmlFor="original">Ou entrez-les vous-même{seeOptions?<span><img className='arrow-logo' src={flecha} alt="" /></span>:" "}</label>
    <div className ={seeOptions?"hidden":""}>
    <input type="text" name="original" placeholder='Français...' />
    <input type="text" name="translation" placeholder='Spagnol...' />
    <input type="submit" value="Ajouter" />
    </div>
  </form>
  </div>
  </>

}

function Display({word, language}){

  const [translation, setTranslation]=useState("")
  const [loading, setLoading]=useState(false)

  const {handleAddWords, filter, message, handleMessage}=useContext(WordsContext)


  useEffect(()=>{

    handleMessage({"type":"", "text":""})


    setTranslation("")

    let languageOrigin=language=="français"?"fr":"es"
    let languageTarget=language=="français"?"es":"fr"

    if(word){
      setLoading(true)

      fetch(`https://lingva.ml/api/v1/${languageOrigin}/${languageTarget}/${word}`).then((result)=>{
      return result.json()
    }).then((data)=>{
    
      setTranslation({"translation":language=="français"?data.translation:word,"original":language=="français"?word:data.translation, "category":filter})
      setLoading(false)
    })
}
  }, [word])


  return <>

    {loading?<h1 className="loading-message" style={{color:"red"}}>Chargement en cours..</h1>:<h1></h1>}  
    {message.type=="added" && <h1 className="loading-message" style={{color:"green"}}>{message.text}</h1>}
    {message.type=="repeated" && <h1 className="loading-message" style={{color:"red"}}>{message.text}</h1>}

    {translation && <div className='translation'> 
    {word!=="" && !loading?<h1>{translation.original} se traduit par {translation.translation} en {language=="français"?"français":"spagnol"}</h1>:<h1></h1>}
    {translation && <div>
      <input type="submit" value="Ajouter aux donnés" onClick={(e)=>{
        handleAddWords(translation)
      }} />

      </div>}
      </div>  }
  </>
}


function Challenge(){

  const {data}=useContext(WordsContext)

  const [containerVisible, setContainerVisible]=useState(false)
  const [wordsVisible, setWordsVisible]=useState(false)
  const [textVisible, setTextVisible]=useState(false)
  const [words, setWords]=useState()
  

  const [rotation, setRotation]=useState(0)


  useEffect(()=>{

        let newWords=[]

        let value=1

        for(let i=0; i<3;i++){

          let goOn=true

            while(goOn){

          let newNum=Math.floor(Math.random()*data.length)

          if(!newWords.some((w)=>{
              return w.word==data[newNum.original]})){
            newWords.push({"word":data[newNum].original, "time":value})
            value++
            goOn=false;
          }
        }

        }

        setWords(newWords)
  },[])

  const handleText=function(){
    setTextVisible(true)
  }
  useEffect(()=>{


    
if(rotation>360*10){
    setTimeout(()=>{
      setRotation(rotation-1)
    },0.05)}else if((rotation<360*10) && (rotation>360*3)){
      setTimeout(()=>{
      setRotation(rotation-1)
    },0.5)
    }else if(rotation>0){
      setTimeout(()=>{
      setRotation(rotation-1)
    },1)

    handleText()
    }

  

  },[rotation])

  const handleContainer=function(){
    setContainerVisible(true)
  }


  const handleWords=function(){

    setRotation(360*30)
    setTimeout(()=>{
      setWordsVisible(true)
    },2000)
    
  }

  const passClass=function(){
    if(textVisible && containerVisible){
      return "challenge-container-visible-2"
    }else if(containerVisible){
      return "challenge-container-visible"
    }else{
      return "challenge-container"
    }
  }
 

  return <aside className="challenge-board">

    <h1 onClick={()=>{
      handleContainer()
    }}>Hâte d'un ptit défi?</h1>

    <div className={passClass()}>
<h2>Fais girer la roulette pour chosir trois mots</h2>

<div className='roulette-container'>
  <img style={{transform:`rotate(${rotation}deg)`}} onClick={()=>{

    handleWords()
  }}src={creme} alt="" />
</div>

<div className="words-challenge-container">

  {words?.map((w)=>{


    return <div className={wordsVisible?`word-challenge-visible-${w.time}`:`word-challenge-invisible`}>
      <p>{w.word}</p> 
    </div>
  })}
</div>

<input  className={textVisible?"text-challenge-container-visible":"text-challenge-container"} type="textarea" placeholder="C'était un temps..." />



    </div>
    

  </aside>
}

export function Footer(){

  return <footer>

    <div className='contact-info'>
      <h1>Contacte</h1>

      <h2>David Sánchez</h2>
      <h3>Communication et devéloppement</h3>
      <h4>Madrid, Spagne</h4>
    </div>

    <div className="links">

      <h5>Links d'intérêt</h5>

      <div className="link-container">
        <img src={linkedin} alt="" />
        <a href="https://www.linkedin.com/in/davidsanrod1420/">Link to LinkedIn </a>
      </div>
      <div className="link-container">
        <img src={github} alt="" />
        <a href="https://github.com/davi0217">Link to GitHub</a>
      </div>


    </div>

  </footer>
}


export default Home
