import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import MainPage from '../MainPage'
import DetailsSection from './Components/DetailsSection'
import { CompositionValue } from '../../Types/types'
import QuestionsSection from './Components/QuestionsSection'

type Props = {}

type QuizContents =
{
    "details": 
    {
        [index: string]: CompositionValue
    },
    "questions": 
    {
        [index: string]: object
    },
}

const CreateQuizPage = (props: Props) => 
{
    const [isValid, setisValid] = useState<boolean>(false)
    const [quizContents, setQuizContents] = useState<QuizContents>({ details: {}, questions: {} })

    const editQuizDetails = (key: string, value: CompositionValue) =>
    {        
        setQuizContents(oldQuizContents =>
        {
            const newQuizContents = { ...oldQuizContents };

            newQuizContents.details[key] = value;

            return newQuizContents;
        })
    }

    const editQuizQuestions = (key: string, value: CompositionValue) =>
    {
        setQuizContents(oldQuizContents =>
        {
            const newQuizContents = { ...oldQuizContents };

            newQuizContents.questions[key] = value;

            return newQuizContents;
        })
    }

    const saveQuiz = () => {}


    useEffect(() => 
    {
        console.log("quizContents: ", quizContents);
        
        const quizDetailsFields = Object.values(quizContents.details);
        
        const isAllValid = !quizDetailsFields.some(field => !field.isValid)
              
        setisValid(isAllValid)
    }, [quizContents])

    
    useEffect(() => {
      console.log("isQuizValid: ", isValid);
      
    }, [isValid])
    

    return (
        <div className='w-[75%] flex flex-col gap-3'>
            <DetailsSection editQuizDetails={editQuizDetails} />

            <QuestionsSection />
        </div>
    )
}

export default CreateQuizPage