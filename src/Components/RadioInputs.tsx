import React from 'react'

import { Answer } from '../Types/questionTypes'

interface RadioProps
{
    style?: 
    { 
        container?: string, 
        input?: string
    },

    isDisabled?: boolean,

    correctAnswer: Answer
    possibleAnswer: Answer,
    changeValue: (answer: Answer) => void
}


const RadioInput = (props: RadioProps) =>
{
    const { style, correctAnswer, possibleAnswer, changeValue } = props;
    const isChosen = correctAnswer.id === possibleAnswer.id;
    
    return (
        <div className={`flex items-center select-none ${style?.container}`}>
            <div 
                className={`h-3 flex items-center justify-center cursor-pointer rounded-full aspect-square border ${props?.isDisabled? "border-gray-900": "border-black"}  overflow-hidden`}
                onClick={() => changeValue(possibleAnswer)} 
            >
                <div className={`h-[70%] rounded-full aspect-square ${isChosen? props?.isDisabled? "bg-gray-900": "bg-black": ""}`}/>
            </div>

            <p>{possibleAnswer.composition.value}</p>
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
    correctAnswer: Answer,
    possibleAnswers: Answer[],
    onChange?: (correctAnswer: Answer) => void
}

const RadioInputs = (props: RadioInputsProps) => 
{
    const { style, possibleAnswers, correctAnswer } = props;

    const changeValue = (answer: Answer) =>
    {   
        const isDisabled = props?.isDisabled? props.isDisabled: false;

        console.log("Chosen Answer: ", answer);
        
        if (!isDisabled && props?.onChange) 
        {
            props?.onChange(answer)
        }
    }

  return (
    <div className={style?.container}>
        {
            possibleAnswers.map(possibleAnswer =>
            {
                return (
                    <RadioInput 
                        key={possibleAnswer.composition.value} 
                        style={style?.radio}
                        isDisabled={props?.isDisabled}
                        correctAnswer={correctAnswer}
                        possibleAnswer={possibleAnswer}
                        changeValue={changeValue}
                    />
                )
            }
        )}
    </div>
  )
}

export default RadioInputs