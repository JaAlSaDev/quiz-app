import { useEffect, useState } from 'react'
import QuizCard from './QuizCard';

type Props = 
{
    isCreateQuizOn: boolean
}

const Quizes = (props: Props) => 
{
    const [quizes, setQuizes] = useState<[]>([]);

    useEffect(() => 
    {
      if (!props.isCreateQuizOn) 
      {
        const quizesString = localStorage.getItem("quizes")
      
        if (quizesString) 
        {
          const quizesList = JSON.parse(quizesString);

          if (Array.isArray(quizesList)) 
          {
            setQuizes(quizesList as [])
          }
        }
      }
    }, [props.isCreateQuizOn])    
    
    const getKey = (quiz: any, index: number): number =>
    {
      if (quiz?.id) {
        return quiz?.id as number
      }
      
      return index
    }
  return (
    <div className='w-[80%] flex flex-col overflow-y-scroll gap-4 mt-4'>      
      {
        quizes?.length > 0 
      &&
        <>
          {quizes.map((quiz, index) => <QuizCard key={getKey(quiz, index)} quiz={quiz} />)}
        </>
      }
    </div>
  )
}

export default Quizes