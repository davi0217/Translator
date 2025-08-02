import { useContext, useEffect, useState} from 'react'
import {useSearch} from './useSearch.js'
import { WordsContext } from './App.jsx'

import {Link, useParams} from 'react-router-dom'

import './Home.css'

import menu from './assets/menu.svg'

import flecha from './assets/flecha-abajo.svg'

import spanish from './assets/spanish-flag.png'
import french from './assets/french.png'

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

  <h2>Fais une recherche et mette une nouvelle parole dans la base de données</h2>

<Input handleSearch={handlerSearch} handlerLanguage={handlerLanguage} language={language}/>
<Display word={wordToSearch} language={language}/>
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
    console.log(e.target.className)
    handleOverMenu(!overMenu)
   }}>
   {!wordFromUrl  && <img  className="menu-alt-logo" src={menu} alt="" onClick={(e)=>{
    console.log(e.target.className)
    
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

  const {handleAddWords, handlerFilter}=useContext(WordsContext)
  const [actualFilter, setActualFilter]=useState("Verbe")

  const [seeOptions, setSeeOptions]=useState(true)

  const handleSeeOptions=function(e){

    if(e!=="text"){
    setSeeOptions(!seeOptions)
    }
  }
  

  const handleChange=function(e){

    setValue(e)
  }
  const handleChangeFilter=function(e){

    setActualFilter(e)
  }

  

  return <>
  <div className='formsContainer'>
  <form  className="searchForm" name="searchForm" action="POST" onSubmit={(e)=>{
      e.preventDefault()
      handleSearch(value)
      handlerFilter(e.target.filter.value)
      e.target.search.value=""
    }} >

      <div className='inputContainer'>
    <label htmlFor="filter">Selecciona la categoría </label>
    <select name="filter" id="filter" onChange={(e)=>{
      handleChangeFilter(e.target.value)
    }}>
      <option value="Verbe" default>Verbe</option>
      <option value="Adjectif">Adjectif</option>
      <option value="Adverbe">Adverbe</option>
      <option value="Vocabulaire">Vocabulaire</option>
      <option value="Façons">Façon de dire</option>
    </select>
    </div>
    <div className='inputContainer'>
    <label htmlFor="language"> <img  className="flag-logo" src={language=="français"?french:spanish}></img>Language</label>
    <select name="language" id="language" onChange={()=>{
      
      handlerLanguage()
    }}>
      <option value="french-spanish" default>Français à spagnol</option>
      <option value="spanish-french">Spagnol à français</option>
    </select>
    </div>
    <div className='inputContainer'>
    <label  htmlFor="search">Search</label>
    <input type="text" name="search"  onChange={(e)=>{
      handleChange(e.target.value)
    }}/>
    </div>
  <div className='inputContainer'>
    <input type="submit" value="Envoyer" />
    </div>
  </form>

  <form action=""  onClick={(e)=>{
    console.log(e.target.type)
      handleSeeOptions(e.target.type)
    }} className={seeOptions?"self-introduction-form self-introduction-form-reduced":"self-introduction-form"} onSubmit={(e)=>{
    e.preventDefault()
    let newWord={"original":e.target.original.value, "translation":e.target.translation.value, "category":actualFilter}
    handleAddWords(newWord)
    e.target.original.value=""
    e.target.translation.value=""

  }}  >
    <label htmlFor="original">Ou introduis-le toi-même{seeOptions?<span><img className='arrow-logo' src={flecha} alt="" /></span>:" "}</label>
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
    console.log(`https://lingva.ml/api/v1/${languageOrigin}/${languageTarget}/${word}`)

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

    {loading?<h1 className="loading-message" style={{color:"red"}}>Loading request...</h1>:<h1></h1>}  
    {message.type=="added" && <h1 className="loading-message" style={{color:"green"}}>{message.text}</h1>}
    {message.type=="repeated" && <h1 className="loading-message" style={{color:"red"}}>{message.text}</h1>}

    {translation && <div className='translation'> 
    {word!=="" && !loading?<h1>{translation.original} se traduce como {translation.translation} en {language=="français"?"francés":"español"}</h1>:<h1></h1>}
    {translation && <div>
      <input type="submit" value="Ajouter aux donnés" onClick={(e)=>{
        handleAddWords(translation)
      }} />

      </div>}
      </div>  }
  </>
}


export default Home
