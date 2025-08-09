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
import { wordsList } from './muestra.js'



function Home() {

  const {handleOverMenu, webText, handleWebText}=useContext(WordsContext)


  const { language, wordToSearch, handlerSearch, handlerLanguage}=useSearch()
 
return <main onClick={(e)=>{
  console.log(e.target.className)
    if((e.target.className!="navContainer-reduced")&&(e.target.className!="menu-alt-logo")){

      handleOverMenu(false)
    }
   }}>
  <Navigator/>

  <h1 className="title">{webText.home?.title}</h1>

  <h2 className="subtitle" >{webText.home?.subtitle}</h2>
 <select className="select-lang" onChange={(e)=>{

  handleWebText(e.target.value)

 }}name="lang" id="lang">
  <option value="fr" selected={webText.home.title=="Ton app de traduction"}>Français</option>
  <option value="es" selected={webText.home.title=="Tu app de traducción"}>Español</option>
 </select>

<Input handleSearch={handlerSearch} handlerLanguage={handlerLanguage} language={language}/>
<Display word={wordToSearch} language={language}/>
<Challenge/>
<Footer/>
</main>
  


}

export function Navigator({wordFromUrl}){

  const {overMenu, handleOverMenu, webText}=useContext(WordsContext)

 
  return <>

  <div className="navContainer">
    <nav>
      <Link to="/" style={wordFromUrl?{}:{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}}>{webText.nav?.nav1}</Link>
     
      <Link to="/component/Verbe" style={wordFromUrl=="Verbe"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav2}</Link>
      <Link to="/component/Adjectif" style={wordFromUrl=="Adjectif"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}} >{webText.nav?.nav3}</Link>
      <Link to="/component/Adverbe" style={wordFromUrl=="Adverbe"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav4}</Link>
      <Link to="/component/Vocabulaire" style={wordFromUrl=="Vocabulaire"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav5}</Link>
      <Link to="/component/Blog" style={wordFromUrl=="Blog"?{borderBottom:"none",backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav6}</Link>
     
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
      <Link to="/" style={wordFromUrl?{}:{backgroundColor:"rgb(245, 217, 196)"}}>{webText.nav?.nav1}</Link>
     
      <Link to="/component/Verbe" style={wordFromUrl=="Verbe"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav2}</Link>
      <Link to="/component/Adjectif" style={wordFromUrl=="Adjectif"?{backgroundColor:"rgb(245, 217, 196)"}:{}} >{webText.nav?.nav3}</Link>
      <Link to="/component/Adverbe" style={wordFromUrl=="Adverbe"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav4}</Link>
      <Link to="/component/Vocabulaire" style={wordFromUrl=="Vocabulaire"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav5}</Link>
      <Link to="/component/Blog" style={wordFromUrl=="Blog"?{backgroundColor:"rgb(245, 217, 196)"}:{}}>{webText.nav?.nav6}</Link>
    
    </nav>
   </div>
    

  </div>

  </>
}

function Input({handleSearch,  handlerLanguage, language}){

  const [value, setValue]=useState("")

  const {handleAddWords, handlerFilter, filter, webText}=useContext(WordsContext)
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
      if(window.innerWidth>750){
        window.scrollTo(0,180)
      }else if(window.innerWidth<=750 && window.innerWidth>450){
        window.scrollTo(0,350)
      }else if(window.innerWidth<=450 && window.innerWidth>350){
        window.scrollTo(0,400)
      }else if(window.innerWidth<=350){
        window.scrollTo(0,500)
      }
    }} >

      <div className='inputContainer visible'>
    <label htmlFor="filter">{webText.home?.inputs.categoryLabel} </label>
    <select name="filter" id="filter" onChange={(e)=>{
      handlerFilter(e.target.value)
    }}>

      {webText.home?.inputs.categories.map((c)=>{
        return <option value={c} >{c}</option>
      })}

    </select>
    </div>
    <div  className='inputContainer '>
    <label htmlFor="language"> <img  className="flag-logo" src={language=="français"?french:spanish}></img>{webText.home?.inputs.langLabel}</label>
    <select name="language" id="language" onChange={()=>{
      
      handlerLanguage()
    }}>
      <option value="french-spanish" default>{webText.home?.inputs?.lang1}</option>
      <option value="spanish-french">{webText.home?.inputs.lang2}</option>
    </select>
    </div>
    <div className='inputContainer'>
    <label  htmlFor="search">{webText.home?.inputs.searchLabel}</label>
    <input type="text" name="search"  onChange={(e)=>{
      handleChange(e.target.value)
    }}/>
    </div>
  <div  className='inputContainer'>
    <input type="submit" value={webText.home?.inputs.sendLabel} />
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
    <label htmlFor="original">{webText.home?.inputs.selfEntryTitle}{seeOptions?<span><img className='arrow-logo' src={flecha} alt="" /></span>:" "}</label>
    <div className ={seeOptions?"hidden":""}>
    <input type="text" name="original" placeholder={webText.home?.inputs.selfEntry1} />
    <input type="text" name="translation" placeholder={webText.home?.inputs.selfEntry2} />
    <input type="submit" value={webText.home?.inputs.selfEntryButton} />
    </div>
  </form>
  </div>
  </>

}

function Display({word, language}){

  const [translation, setTranslation]=useState("")
  const [loading, setLoading]=useState(false)

  const {handleAddWords, webText, filter, message, handleMessage}=useContext(WordsContext)


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

    {loading?<h1 className="loading-message" style={{color:"red"}}>{webText.home?.display.loading}</h1>:<h1></h1>}  
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

  const {data, handleAddBlog, webText, entries}=useContext(WordsContext)

  const [containerVisible, setContainerVisible]=useState(false)
  const [wordsVisible, setWordsVisible]=useState(false)
  const [textVisible, setTextVisible]=useState(false)
  const [firstVisible, setFirstVisible]=useState(false)
  const [buttonVisible, setButtonVisible]=useState(false)
  const [words, setWords]=useState([])
  const [textValue, setTextValue]=useState([])
  const [textToPass, setTextToPass]=useState(" ")
  
  const [message, setMessage]=useState({
    "status": false,
    "text":" "
  })

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
            newWords.push({"word":data[newNum].original, "time":value, "used":false})
            value++
            goOn=false;
          }
        }

        }

        setWords(newWords)
  },[wordsVisible])

  const handleText=function(){
    setTextVisible(true)
  }

  const handleButton=function(t){
    setButtonVisible(t)
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
    setTimeout(()=>{
        setFirstVisible(true)
    },180)
  }


  const handleWords=function(){
    setWordsVisible(false)

    setRotation(360*30)
    setTimeout(()=>{
      setWordsVisible(true)
    },1000)
    
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

  const passWordClass=function(w){

    if(wordsVisible && w.used){
      return `word-challenge-visible-${w.time}-green`
    }else if(wordsVisible){
      return `word-challenge-visible-${w.time}`
    }else{
      return 'word-challenge-invisible'
    }
  }

  const handleTextValue=function(v){
    let newValue=v.split(/[ ,'?!.;\n]+/)
    setTextValue(newValue)
  }

  

  useEffect(()=>{

    if(words.length>0 && textToPass.length>0 && !words.some((w)=>{

      
          return w.used==false
    })){
      handleButton(true)
    }else{
      handleButton(false)
    }

    words.forEach((w)=>{
      console.log(w)
    })

    if(textValue.length>1){

    let newWords=words.map((w)=>{
      if(textValue.some((t)=>{
        return t.toLowerCase().trim().includes(w.word.toLowerCase().trim())
      })){
        return {...w, "used":true}
      }else{
        return {...w, "used":false}
      }
    })
    if(newWords.length>0 && !newWords.some((w)=>{

      
          return w.used==false
    })){
      handleButton(true)
    }else{
      handleButton(false)
    }
    setWords(newWords)}

    setMessage({
      "status":false,
      "text": " "
    })

  },[textValue]) 


  const handleTextToPass=function(t){
    setTextToPass(t)
  }

  const handleMessage=function(t){
    setMessage(t)
  }
 
 

  return <aside className="challenge-board">

    <h1 onClick={()=>{
      handleContainer()
    }}>{webText.home?.challenge.challengeTitle}</h1>

    <div className={passClass()}>
<h2 className={firstVisible?'':"hidden"}>{webText.home?.challenge.challengeSubtitle}</h2>

<div className={firstVisible?'roulette-container':"hidden"}>
  <img style={{transform:`rotate(${rotation}deg)`}} onClick={()=>{

    handleWords()
  }}src={creme} alt="" />
</div>

<div className="words-challenge-container">

  {words?.map((w)=>{


    return <div className={passWordClass(w)}>
      <p>{w.word}</p> 
    </div>
  })}
</div>

<button onClick={()=>{

  const d=new Date()


  handleAddBlog(textToPass,`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}` ,"https://xsgames.co/randomusers/avatar.php?g=male" )
  handleMessage({
    "status":true,
    "text": entries.length>=5?webText.home?.challenge.overload:webText.home?.challenge.added
  })
}} className={buttonVisible?"challenge-button":"hidden"}>Ajouter au blog</button>

<strong className={message.status?"blog-disclaimer":"hidden"}>{message.text}</strong>
<textarea maxLength={4000} contentEditable={true} className={textVisible?"text-challenge-container-visible":"text-challenge-container"} placeholder={webText.home?.challenge.challengePlaceholder} 

onChange={(e)=>{

  handleTextValue(e.target.value)
  handleTextToPass(e.target.value)
}} />



    </div>
    

  </aside>
}

export function Footer(){

  const {webText}=useContext(WordsContext)

  return <footer>

    <div className='contact-info'>
      <h1>{webText.footer?.contact}</h1>

      <h2>David Sánchez</h2>
      <h3>{webText.footer?.job}</h3>
      <h4>Madrid, {webText.footer?.country}</h4>
    </div>

    <div className="links">

      <h5>{webText.footer?.links}</h5>

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
