import { useContext, useEffect, useState} from 'react'
import {useSearch} from './useSearch.js'
import { WordsContext } from './App.jsx'

import {Link} from 'react-router-dom'

import './Home.css'

function Home() {


  const {filter, language, wordToSearch, handlerFilter, handlerSearch, handlerLanguage}=useSearch()
 
return <main>
  <Navigator/>

  <h1>Soyez le bienvenue à mon App de traduction!</h1>

  <h2>Fais une recherche et mette une nouvelle parole dans la base de données</h2>

<Input handleSearch={handlerSearch} handleFilter={handlerFilter} handlerLanguage={handlerLanguage}/>
<Display word={wordToSearch} filter={filter} language={language}/>
</main>
  


}

export function Navigator(){

  return <div className="navContainer">
    <nav>
      <Link to="/">Rechercher</Link>
     
      <Link to="/verbes">Verbes</Link>
      <Link to="/adjectifs">Adjectifs</Link>
      <Link to="/adverbes">Adverbes</Link>
      <Link to="/vocabulaire">Vocabulaire</Link>
      <Link to="/façons">Façons de dire</Link>
    </nav>
  </div>
}

function Input({handleSearch, handleFilter, handlerLanguage}){

  const [value, setValue]=useState("")
  console.log("input rendered")

  const handleChange=function(e){

    setValue(e)
  }

  return <form name="searchForm" action="POST" onSubmit={(e)=>{
      e.preventDefault()
      handleSearch(value)
      handleFilter(e.target.filter.value)
    }} >

    <label htmlFor="filter">Selecciona la categoría </label>
    <select name="filter" id="filter">
      <option value="Verbe" default>Verbe</option>
      <option value="Adjectif">Adjectif</option>
      <option value="Adverbe">Adverbe</option>
      <option value="Vocabulaire">Vocabulaire</option>
      <option value="Façon de dire">Façon de dire</option>
    </select>
    <label htmlFor="language">Language</label>
    <select name="language" id="language" onChange={()=>{
      console.log("language changé")
      handlerLanguage()
    }}>
      <option value="french-spanish" default>Français à spagnol</option>
      <option value="spanish-french">Spagnol à français</option>
    </select>
    <label  htmlFor="search">Search</label>
    <input type="text" name="search"  onChange={(e)=>{
      handleChange(e.target.value)
    }}/>

    <br />
    <input type="submit"  />
  </form>

}

function Display({word, filter, language}){

  const [translation, setTranslation]=useState("")
  const [loading, setLoading]=useState(false)

  const {handleAddWords}=useContext(WordsContext)

console.log("displayed is rendered with word"+word)

  useEffect(()=>{

    

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

    {loading?<h1 style={{color:"red"}}>Loading request...</h1>:<h1></h1>}     
    {word!=="" && !loading?<h1>{translation.original} se traduce como {translation.translation} en {language=="français"?"francés":"español"}</h1>:<h1></h1>}
    {translation && <div>
      <input type="submit" value="Ajouter aux donnés" onClick={(e)=>{
        handleAddWords(translation)
      }} />

      </div>}
  </>
}


export default Home
