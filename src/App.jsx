import { useState } from 'react'
 
import './App.css'

function App() {
  let [data,setData]=useState({})
  let [score,setScore]=useState(0)
  let [randomQuestion, setRandomQuestion] = useState(0)
  let [isVisible, setIsVisible] = useState(false)

  
 
  async function handleGetQuestion(e){
e.preventDefault();
try {
  const response= await fetch("https://jservice.io/api/clues")
  const data= await response.json()
  console.log(data)
  setData(data)
  setIsVisible(false)
  let randomNumber=Math.floor(Math.random()*99)
setRandomQuestion(randomNumber)

} catch (err) {
  console.log(err.message)
}
  }


 
  function handleDecrease(){
  setScore(score-data?.[randomQuestion]?.value)
 
  }

  function handleIncrease(){
  
    setScore(score+data?.[randomQuestion]?.value)
      }

      function handleReset(){
  setData({})
  setScore(0)
          }

      function  handleRevealQuestion(){
        setIsVisible(!isVisible)

      }

  return (
    <div className='container'>
     <h1>Welcome to Jeopardy!</h1> 
     <h3><span>Score:</span>{score}</h3> 
     <div className='scoreButtons'>
      <button className='d' onClick={handleDecrease}>Decrease</button>
      <button className='i' onClick={handleIncrease}>Inrease</button>
      <button className='r' onClick={handleReset}>Reset</button>
     </div>
<h3><span>Let's play!</span></h3>
<button className="q" onClick={handleGetQuestion}>Get Question</button>
<div><span>Category:</span>{data?.[randomQuestion]?.category?.title}</div>
<div> <span>Points:</span> {data?.[randomQuestion]?.value}</div>
<div> <span>Answer:</span> {data?.[randomQuestion]?.answer}</div>

<button className='revQ' onClick={handleRevealQuestion}>Click to Reveal Qusetion</button>
<div className={isVisible? 'notReveal':'reveal'}> <span>Question:</span>{data?.[randomQuestion]?.question}</div>


    </div>
  )
}

export default App
