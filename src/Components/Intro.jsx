export default function Intro({isLoading, handleStartQuiz}) {
  return (
    <>

      <section className='intro-container'>


        <h1> Quizzical </h1>
        <p> Explore the fun of answering some interesting  quiz questions</p>
        <button disabled={isLoading} onClick={handleStartQuiz} className='start-btn'>Start quiz</button>


      </section>

    </>

  )
}
