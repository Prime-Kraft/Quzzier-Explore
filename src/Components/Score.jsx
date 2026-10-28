export default function Score({score, Questions}) {
  return (


    <>

      <div className="score-container">
 <h2> You scored  { `${score }/${ Questions.length }` }   </h2>
      </div>




</>
  )
}
