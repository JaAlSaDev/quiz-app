import React, { useEffect } from 'react'

type Props = 
{
    navigateToMainPage: () => void
}

const ViewPage = (props: Props) => 
{
    useEffect(() => 
    {
      const quizesString = localStorage.getItem("quizes")

      console.log("quizesString: ", quizesString);
      
      if (quizesString) 
      {
        const quizesList = JSON.parse(quizesString);

        console.log("quizesList", quizesList);
        
      }
    }, [])
    
  return (
    <div>ViewPage</div>
  )
}

export default ViewPage