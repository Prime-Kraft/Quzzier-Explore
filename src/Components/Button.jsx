export default function Button({handleResult, handleStartQuiz, isChecked}) {
  return (
    <>

      <button className='check-btn' disabled={isChecked} onClick={handleResult}> Check answers</button>

      {isChecked? <button className='check-btn' onClick={handleStartQuiz}> Get New Questions</button> : ""}

    </>
  )
}
