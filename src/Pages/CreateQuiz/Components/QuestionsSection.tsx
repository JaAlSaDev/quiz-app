import React, { useState } from 'react'

import Button from '../../../Components/Button';

import QuestionForm from './QuestionForm';
import { Question } from '../../../Types/questionTypes';
import Questions from './Questions';

type Props = 
{
    questions: Question[],
    addQuestion: (questions: Question) => void,
    deleteQuestion: (index: number) => void
}

const Header = (props: { isAddButtonEnabled: boolean, openQuestionForm: () => void }) =>
{
    const { isAddButtonEnabled, openQuestionForm } = props;

    return (
        <div className='w-full flex justify-between items-center mb-3'>
            <p className='text-xl font-bold'>Questions:</p>

            <Button 
                className="px-3 text-2xl rounded-lg"
                text={"+"}
                isDisabled={isAddButtonEnabled}
                onClick={openQuestionForm}
            />
        </div>
    )
}

const QuestionsSection = (props: Props) => 
{
    const { questions, deleteQuestion } = props;

    const [isFormOn, setIsFormOn] = useState<boolean>(false);

    const addQuestion = (newQuestion: Question) =>
    {
        setIsFormOn(false);

        props.addQuestion(newQuestion)
    }

    const openQuestionForm = () => setIsFormOn(true);

    const isAddButtonEnabled = (questions.length > 7)
    
    return (
        <div className='w-full'>
            <Header
                isAddButtonEnabled={isAddButtonEnabled} 
                openQuestionForm={openQuestionForm}
            />

            <div className='ms-5'>
                {questions.length < 3 && <p>Please add at least 3 questions...</p>}
            </div>

            <Questions questions={questions} deleteQuestion={deleteQuestion} />

           {isFormOn && <QuestionForm addQuestion={addQuestion}/>}
        </div>
    )
}

export default QuestionsSection