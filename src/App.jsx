import { useState, useEffect } from 'react'

import blobBottom from "./assets/blob.png"

import blobTop from "./assets/blob-top.png"

import { decode } from 'he';

import clsx from 'clsx';

import Question from './Components/Question';

import Button from './Components/Button';
import Score from './Components/Score';
import Intro from './Components/Intro';



function App() {

  const [Questions, setQuestions] = useState([])

  const [isQuizStarted, setisQuizStarted] = useState(false)


  const [answersArray, setAnswersArray] = useState(null)

  const [selected, setSelected] = useState({})

  const [isChecked, setIsChecked] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState("")

  const isAllSelected = Object.keys(selected).length > 4

  const [score, setScore] = useState("")


  // we need to use define   handle Result function to handle to results operation
  function handleResult() {
// first step when handle result is called we need to setIschecked state to true
    setIsChecked(true)

    // second step we need to evalate the users score
    // by first getting the correct question  array the user selected and got the answer right

   const userCorrectAnswer =  Questions.filter(function (question, index) {

      return selected[index] === question.correct_answer

    })

    // next we need to check for how many correct answer it is by checking for the length of the array returned
    const userScore = userCorrectAnswer.length
    setScore(userScore)


  }

  // we need to define a function to handle get new questions




  function shuffleArray(Array) {

    const shuffled = [...Array]

    for (let i = shuffled.length - 1; i > 0; i--){

      const j = Math.floor(Math.random() * (i + 1))

        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }








  function handleStartQuiz() {

    setIsLoading(true)
    setSelected( prevValue=>{return{ ...prevValue }})
setIsChecked(false)
    async function getQuestions() {

      try {
        setError("")
        const response = await fetch("https://opentdb.com/api.php?amount=10&difficulty=easy")
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)

        }
        const data = await response.json()

        setQuestions(data.results)


      setAnswersArray(data.results.map((question) =>
          {return shuffleArray([...question.incorrect_answers, question.correct_answer]) }))




      }

      catch (error) {
        console.error("There was this error in the request", error)
        setError(`There was this error in the request ${error.message}`)
      }

      finally {
        setIsLoading(false)
      }
    }
    getQuestions()
   setisQuizStarted(true)
}


  function handleChange(questionIndex, answer) {
    setSelected(prevValue => { return { ...prevValue, [questionIndex]: answer } })




}



const questionElement = Questions.map((question, index) => {
  return (
    <div className='question-box' key={index}>
      <h4>{decode(question.question)}</h4>

      <div className='answer-container'>
        {answersArray?.[index]?.map((answer) => {
          const score = Questions.filter((question, index) => selected[index] === question.correct_answer).length
          const isSelected = selected[index] === answer
          const isCorrect = answer === question.correct_answer

          const btnClass = clsx('answer-btn', {
            correct: isChecked && isCorrect,
            wrong: isChecked && isSelected && !isCorrect
          })

          return (
            <label className={btnClass} key={answer}>
              <input
                type='radio'
                name={`quiz-answer-${index}`}
                checked={isSelected}
                disabled={isChecked}
                onChange={() => handleChange(index, answer)}
                value={answer}
              />
              <span>{decode(answer)}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
})



  return (
    <>
      <main className='main-container'>
        <img src={blobTop} className='blob-top'/>
        {!isQuizStarted ? <Intro isLoading={isLoading} handleStartQuiz={handleStartQuiz} /> : ""}



        <section className='loading-container'>
          {error ? <><p>{error}</p>  <button disabled={isLoading} onClick={handleStartQuiz} className='retry-btn'>Retry Quiz</button>

</> : ""}
          {isLoading? <p>Loading questions</p>: ""}
        </section>
        <img src={blobBottom} className='blob-bottom' />
        {isQuizStarted && !isLoading && !error ?
          <section>
            <Question questionElement={questionElement} />

             {isChecked ?  <Score score={score} Questions={Questions} /> : null}

            {isAllSelected ? <Button isChecked={isChecked} score={score} handleResult={handleResult} handleStartQuiz={handleStartQuiz} /> : null}



          </section> : ""}
      </main>
    </>
  )
}

export default App
