import { useState, useEffect } from 'react'

import Button from '../../../Components/Button'
import { Question, CompositionValue, typesArray, questionTypesObj, YES_NO, QuestionTypeLabel, AnswerType, Answer, MULTI_CHOICE, OPEN_ENDED } from '../../../Types/questionTypes'
import DropDownField from '../../../Components/InputFields/DropDownField'
import QuestionTitleInput from '../../../Components/InputFields/QuestionTitleInput'
import ClarificationInput from '../../../Components/InputFields/ClarificationInput'
import AnswerSection from './AnswerSection'


import useQuestion from '../../../hooks/useQuestion'

type Props = 
{
    addQuestion: (newQuestion: Question) => void
}

const QuestionForm = (props: Props) => 
{
    const question = useQuestion(props.addQuestion)

    const {
        isValid, 
        title, 
        clarification,
        answer,
    } = question;

    const getAnswerElement = (questionLabelType: (QuestionTypeLabel | undefined)): JSX.Element =>
    {
        if (questionLabelType === QuestionTypeLabel['yes-no'] || questionLabelType === QuestionTypeLabel["multi-choice"]) 
        {
            const answerProp = answer.value as (YES_NO | MULTI_CHOICE);

            return <AnswerSection 
                        style={
                            {
                                container: "flex w-fit gap-3",
                                radio: { container: "gap-3" }
                            }
                        }
                        answer={answerProp}

                        onChange={(value: number) => answer.options.select(questionLabelType, value)}
                        multiChoiceFunctions= 
                        {
                            {
                                addAnswer: answer.options.add,
                                deleteAnswer: answer.options.delete,
                                editAnswer: answer.options.edit
                            }
                        }
                    />
        }

        return <></>
    }

    return (
        <div className='fixed h-screen w-screen flex justify-center items-center top-0 right-0  bg-black/[0.5]'>
            <div className='fixed h-fit w-[50rem] z-[3] flex flex-col gap-2 p-5 rounded-lg bg-white'>
                <p className='bg-white w-full text-center font-bold text-xl'>Question Form</p>

                <QuestionTitleInput 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                
                    onChange={title.edit}
                />

                <ClarificationInput 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                
                    onChange={clarification.edit}
                />
                
                <DropDownField 
                    style={{
                        container: "w-full mb-5",
                        label: "font-bold",
                        input: "border-black border px-3",
                    }}
                
                    label='Question Type'
                    value={answer?.value.label}
                    options={typesArray}

                    onChange={(value: string) => answer.changeType(value as QuestionTypeLabel)}
                />

                {getAnswerElement(answer?.value.label)}

                <div className='w-full h-fit flex justify-center mt-4'>
                    <Button 
                        className="w-fit px-4 py-2 rounded-lg"
                        text={"Add Question!"}
                        isDisabled={!isValid}
                        onClick={question.save}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default QuestionForm