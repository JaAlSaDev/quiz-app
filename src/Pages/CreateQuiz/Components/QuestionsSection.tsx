import React, { useState, useEffect } from 'react'

import QuestionForm from './QuestionForm';
import { Question } from '../../../Types/types';

type Props = {}

const QuestionsSection = (props: Props) => 
{
    const [questions, setQuestions] = useState<Question[]>([]);

    const addQuestion = (newQuestion: Question) =>
    {
        const questionsArr = [...questions, newQuestion];

        setQuestions(questionsArr)
    }

    useEffect(() => 
    {
        console.log("questions: ", questions);
    }, [questions])
    

    return (
        <div className=''>
            <p className='text-xl font-bold mb-3'>
                Questions:
            </p>

            <div className='ms-10'>
            </div>


            <QuestionForm addQuestion={addQuestion}/>
        </div>
    )
}

export default QuestionsSection