import React from 'react'
import { AnswerType, MULTI_CHOICE, Question, QuestionTypeLabel, YES_NO } from '../../../Types/questionTypes'
import RadioInputs from '../../../Components/RadioInputs'

type Props = 
{
    questions: Question[]
}


const AnswersElement = (props: { answer: YES_NO | MULTI_CHOICE }) =>
{
    const { correctAnswer, answers } = props.answer;

    return (
        <>
            {correctAnswer && 
            
                <RadioInputs 
                    style={{
                        container: "flex w-fit gap-3",
                        radio:
                        {
                            container: "gap-3",
                        }
                    }}
                    possibleAnswers={answers}
                    correctAnswer={correctAnswer}
                    isDisabled={true}
                />
            
            }
        </> 
    )
}

const QuestionElement = (props: { index: number, question: Question}) =>
{
    const { index, question } = props;    

    const questionType = question.answer?.label;

    const answer = question.answer;

    return (
        <div className='bg-blue-100'>
            <p>
                <span className='font-bold'>{index}: </span>
                <span>{question.title.value}</span>
            </p>

            <p className='ms-12 text-sm'>
                <span className='font-bold'>Clarification: </span> 
                <span>{question.clarification?.value}</span>
            </p>


            <div className={`ms-4 mt-2 ${questionType === QuestionTypeLabel["yes-no"] && "flex"}`}>
                <p>Answers: </p>

                <div className='mt-1 ps-5'>
                    {
                        (questionType === QuestionTypeLabel["yes-no"] || questionType === QuestionTypeLabel["multi-choice"])
                    &&
                        <AnswersElement answer={answer as (YES_NO | MULTI_CHOICE)}/>
                    }
                </div>
            </div>
        </div>
    )
}

const Questions = (props: Props) => 
{
    const { questions } = props

    return (
        <div className='flex flex-col gap-3 ms-10'>
            {questions.map((question, index) => 
            (
                <QuestionElement 
                    key={question.title.value} 
                    index={index + 1} 
                    question={question} 
                />
            ))}
        </div>
    )
}

export default Questions