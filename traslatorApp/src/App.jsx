import { useEffect, useState} from 'react'

import {Link} from 'react-router-dom'

import './App.css'

function App() {
  const words=JSON.parse(localStorage.getItem("words"))

  const [wordToSearch, setWordToSearch]=useState("")
  const [filter, setFilter]=useState("")
  const [language, setLanguage]=useState("français")
  const [data, setData]= useState(words?words:[])


  const handlerSearch=function(e){

    setWordToSearch(e)

  }
  const handlerFilter=function(e){

    setFilter(e)

  }

  const handlerLanguage=function(){
let languageToChange=language=="français"?"spagnol":"français"

    setLanguage(languageToChange)
   
  }
console.log("language actuelle est "+language)
  const handleAddWords=function(newData){
    
 if(data.some((d)=>{
      return d.translation===newData.translation
    })){
      return
    }
 
   setData([...data, newData])

   localStorage.setItem("words", JSON.stringify([...data, newData]))
  }



return <main>
  <Navigator/>

  <h1>Soyez le bienvenue à mon App de traduction!</h1>

  <h2>Fais une recherche et mette une nouvelle parole dans la base de données</h2>

<Input handleSearch={handlerSearch} handleFilter={handlerFilter} handlerLanguage={handlerLanguage}/>
<Display word={wordToSearch} filter={filter} language={language} handleAddWords={handleAddWords}/>
<ul style={{listStyle:"none"}}>
{data.length>0 && data.map((word)=>{
  return <li key={word}>

    <p>{word.original}: <span> {word.translation}</span> <span> | {word.category}</span></p>

  </li>

})}
</ul>

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

function Display({word, filter, handleAddWords, language}){

  const [translation, setTranslation]=useState("")
  const [loading, setLoading]=useState(false)

  useEffect(()=>{

    console.log("language passing is" + language)

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


export default App
