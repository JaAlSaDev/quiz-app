import React from 'react'

import QuizTitleInput from '../../../Components/InputFields/QuizTitleInput'
import NumberInputField from '../../../Components/InputFields/NumberInputField'

import { CompositionValue } from '../../../Types/questionTypes'
type Props = 
{
    editQuizDetails: (key: string, value: CompositionValue) => void
}

const DetailsSection = (props: Props) => 
{
    const { editQuizDetails } = props

  return (
    <div className=''>
        <p className='text-xl font-bold mb-3'>
            General Quiz Details
        </p>

        <div className='grid gap-3'>
            <QuizTitleInput 
                style={{
                    container: "w-full",
                    label: "font-bold",
                    input: "px-2",
                    underline: "h-[2px] mt-1"
                }}
                
                onChange={e => editQuizDetails("title", e)}
            />

            <NumberInputField 
                style={{
                    container: "w-1/2 mb-5",
                    label: "font-bold",
                    input: "px-2 h-fit w-1/2 bg-gray-200",
                }}
                label='Number of Chances '
                defaultValue={5} min={1} max={5} step={1}
                onChange={e => editQuizDetails("numOfChances", e)}
            />


            <NumberInputField 
                style={{
                    container: "w-1/2",
                    label: "font-bold",
                    input: " px-2 h-fit w-1/2 bg-gray-200",
                }}
                label='Percentage to Pass '
                defaultValue={100} min={0} max={100} step={5}
                onChange={e => editQuizDetails("percentagePass", e)}
            />

        </div>
    </div>
  )
}

export default DetailsSection