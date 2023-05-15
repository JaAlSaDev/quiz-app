import React from 'react'

import Button from '../Button'

import { Answer, GenericAnswer, BooleanAnswer, CompositionValue, MultiChoiceAnswer, QuestionTypeLabel } from '../../Types/questionTypes'
import MultiChoiceInput from './MultiChoiceInput'

interface RadioProps
{
    style?: 
    { 
        container?: string, 
        input?: string
    },

    isMultiChoice: boolean,
    isDisabled?: boolean,
    
    questionType: QuestionTypeLabel,
    correctAnswerID: number
    possibleAnswer: Answer,

    changeValue: (answerID: number) => void,
    editAnswer: (answer: Answer) => void,
    deleteAnswer: (answerID: number) => void
}


const RadioInput = (props: RadioProps) =>
{
    const { 
            style, 
            isMultiChoice, 
            correctAnswerID, 
            possibleAnswer, 
            changeValue 
        } = props;

    const isChosen = correctAnswerID === (possibleAnswer?.id as number) ;
    
    const editAnswer = (e: CompositionValue): void =>
    {
        const possibleAnswerCopy = { ...possibleAnswer } as Answer;

        if (possibleAnswerCopy) 
        {
            possibleAnswerCopy["composition"] = e
            props.editAnswer(possibleAnswerCopy)
        }
    }
    
    
    return (
        <div className={`flex bg-blue items-center select-none ${style?.container}`}>
            <div 
                className={`aspect-square p-[0.25rem]  rounded-full  flex items-center justify-center cursor-pointer border ${props?.isDisabled? "border-gray-900": "border-black"}  overflow-hidden`}
                onClick={() => changeValue(possibleAnswer.id)} 
            >
                <div className={`p-[0.2rem] aspect-square rounded-full ${isChosen? props?.isDisabled? "bg-gray-900": "bg-black": ""}`}/>
            </div>

            {
                !isMultiChoice || props?.isDisabled
            ? 
                <p>{possibleAnswer?.composition.value}</p>
            :
                <>
                    <MultiChoiceInput 
                        style={{
                            container: "w-full self-center top-4",
                            label: "font-bold",
                            input: "border-black border px-2",
                            underline: "h-[2px] mt-1"
                        }}

                        onChange={editAnswer} 
                    />

                    <Button 
                        style={{
                            neutral: "px-[0.35rem] rounded-full bg-red-500 text-sm font-bold text-white"
                        }}
                        text={"X"}
                        isDisabled={false}
                        onClick={props.deleteAnswer}
                    />
                </>
            }
        </div>
    )
}

interface RadioInputsProps
{
    style?:
    {
        container?: string, 
        radio?:
        {
            container?: string,
            input?: string
        }
    },

    isDisabled?: boolean,

    answer: GenericAnswer,

    onChange?: (correctAnswer: number) => void

    deleteAnswer?: (index: number) => void
    editAnswer?: (index: number, answer: Answer) => void
}

const RadioInputs = (props: RadioInputsProps) => 
{
    const { style, answer } = props;

    const changeValue = (answerID: number) =>
    {   
        const isDisabled = props?.isDisabled? props.isDisabled: false;
        
        if (!isDisabled && props?.onChange) 
        {
            props?.onChange(answerID)
        }
    }

    const editAnswer = (index: number, answer: Answer) =>
    {
        if (props?.editAnswer) 
        {
            props.editAnswer(index, answer)
        }
    }

    const deleteAnswer = (index: number) =>
    {
        if (props?.deleteAnswer) 
        {
            props.deleteAnswer(index)
        }
    }
    
    const isMultiChoice = answer.label === QuestionTypeLabel.multi_choice

    return (
        <div className={`${style?.container} ${isMultiChoice && "flex flex-col"}`}>
            {
                answer?.answers?.map((possibleAnswer, index) =>
                {
                    return (
                        <RadioInput 
                            key={possibleAnswer?.id} 
                            style={style?.radio}

                            isMultiChoice={isMultiChoice}
                            questionType={answer.label}
                            isDisabled={props?.isDisabled}

                            correctAnswerID={answer?.correctAnswerID as number}
                            possibleAnswer={possibleAnswer}

                            changeValue={changeValue}
                            editAnswer={(editedAnswer: Answer) =>  editAnswer(index, editedAnswer)}
                            deleteAnswer={() => deleteAnswer(index)}
                        />
                    )
                }
            )}
        </div>
    )
}

export default RadioInputs