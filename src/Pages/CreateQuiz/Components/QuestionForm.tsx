import React, { useState, useEffect } from 'react'

import { Question, YES_NO, MULTI_CHOICE, OPEN_ENDED, CompositionValue } from '../../../Types/types'
import DropDownField from '../../../Components/DropDownField'
import QuestionTitleInput from './QuestionTitleInput'
import ClarificationInput from './ClarificationInput'

type Props = 
{
    addQuestion: (newQuestion: Question) => void
}

const questionTypes =
{
    "yes-no": new YES_NO(),
    "multi choice": new MULTI_CHOICE(),
    "open ended": new OPEN_ENDED()
}

const typesArray: string[] = Object.values(questionTypes).map(type => type.label);

const QuestionForm = (props: Props) => 
{
    const [question, setQuestion] = useState<Question>(
    {
        title: { value: "", isValid: false },
        clarification: { value: "", isValid: true },
        type: questionTypes["yes-no"]
    })
    
    const [isValid, setValidity] = useState<boolean>(false);

    const editTitle = (value: CompositionValue) =>
    {
        const newQuestion = { ...question };

        newQuestion.title = value

        setQuestion(newQuestion)
    }

    const editClarification = (value: CompositionValue) =>
    {
        const newQuestion = { ...question };

        newQuestion.clarification = value

        setQuestion(newQuestion)
    }

    const changeType = (type: string) =>
    {
        const newQuestion = { ...question };

        newQuestion.type = questionTypes[type as "yes-no" | "multi choice" | "open ended"];

        setQuestion(newQuestion)
    }

    useEffect(() => {
      console.log("question: ", question);
    }, [question])


    const AnswersObj = 
    {
        "yes-no": <p>Yes no</p>,
        "multi choice": <p>multi choice</p>,
        "open ended": <p>open ended</p>
    }
    
    return (
        <div className='fixed h-screen w-screen flex justify-center items-center top-0 right-0  bg-black/[0.5]'>
            <div className='fixed h-fit w-[50rem] z-[3] flex flex-col gap-2 p-5 rounded bg-white'>
                <p className='bg-white w-full text-center font-bold text-xl'>Question Form</p>

                <QuestionTitleInput 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                
                    onChange={editTitle}
                />

                <ClarificationInput 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                
                    onChange={editClarification}
                
                />
                <DropDownField 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-3",
                    }}
                
                    label='Question Type'
                    value={question.type?.label}
                    options={typesArray}

                    onChange={changeType}
                />


                {question.type?.label && AnswersObj[question.type?.label as "yes-no" | "multi choice" | "open ended"]}
            </div>
        </div>
    )
}

export default QuestionForm