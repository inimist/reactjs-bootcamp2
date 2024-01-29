import React from 'react'

function Quiz({question}) {
    
  return (
    <div class="container">
        {
            question.length && question.map((res)=>{
                console.log(res)
            })
        }
    </div>
  )
}

export default Quiz