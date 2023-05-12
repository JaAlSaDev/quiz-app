import React, { useState } from 'react'

import Button from '../../../Components/Button';

import QuestionForm from './QuestionForm';
import { Question } from '../../../Types/questionTypes';
import Questions from './Questions';

type Props = 
{
    questions: Question[],
    addQuestion: (questions: Question) => void,
}

const QuestionsSection = (props: Props) => 
{
    const { questions } = props;

    const [isFormOn, setIsFormOn] = useState<boolean>(false);

    const addQuestion = (newQuestion: Question) =>
    {
        setIsFormOn(false);

        props.addQuestion(newQuestion)
    }
    
    return (
        <div className='w-full'>
            <div className='w-full flex justify-between items-center mb-3'>
                <p className='text-xl font-bold'>Questions:</p>

                <Button 
                    className="px-3 text-2xl rounded-lg"
                    text={"+"}
                    isDisabled={false}
                    onClick={() => setIsFormOn(true)}
                />
            </div>

            <div className='ms-5'>
                {   
                    questions.length < 3 
                && 
                    <p>Please add at least 3 questions....</p>
                }
            </div>

            <Questions questions={questions} />

           {isFormOn && <QuestionForm addQuestion={addQuestion}/>}
        </div>
    )
}

export default QuestionsSection