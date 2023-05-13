import React from 'react'

import { Answer, AnswerType, CompositionValue, MULTI_CHOICE, QuestionTypeLabel, YES_NO } from '../Types/questionTypes'
import MultiChoiceInput from '../Pages/CreateQuiz/Components/MultiChoiceInput'

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

    changeValue: (answer: number) => void,
    editAnswer: (answer: Answer) => void
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

    console.log("correctAnswerID: ", correctAnswerID);
    
    console.log("possibleAnswer: ", possibleAnswer);
    
    
    return (
        <div className={`flex bg-blue items-center select-none ${style?.container}`}>
            <div 
                className={`h-3 flex items-center justify-center cursor-pointer rounded-full aspect-square border ${props?.isDisabled? "border-gray-900": "border-black"}  overflow-hidden`}
                onClick={() => changeValue(possibleAnswer?.id as number)} 
            >
                <div className={`h-[70%] rounded-full aspect-square ${isChosen? props?.isDisabled? "bg-gray-900": "bg-black": ""}`}/>
            </div>

            {
                !isMultiChoice || props?.isDisabled
            ? 
                <p>{possibleAnswer?.composition.value}</p>
            :
                <MultiChoiceInput 
                    style={{
                        container: "w-full self-center top-4",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                onChange={editAnswer} />
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

    answer: YES_NO | MULTI_CHOICE,

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

    console.log("answer?.correctAnswerID as number: ", answer?.correctAnswerID as number);
    
  return (
    <div className={`${style?.container} ${answer.label === QuestionTypeLabel["multi-choice"] && "flex flex-col"}`}>
        {
            answer?.answers?.map((possibleAnswer, index) =>
            {
                return (
                    <RadioInput 
                        key={possibleAnswer?.id} 
                        style={style?.radio}

                        isMultiChoice={answer.label === QuestionTypeLabel["multi-choice"]}
                        questionType={answer.label}
                        isDisabled={props?.isDisabled}

                        correctAnswerID={answer?.correctAnswerID as number}
                        possibleAnswer={possibleAnswer}

                        changeValue={changeValue}
                        editAnswer={(editedAnswer: Answer) =>  editAnswer(index, editedAnswer)}
                    />
                )
            }
        )}
    </div>
  )
}

export default RadioInputs