import React from 'react'
import { InputFieldStyle, ValidationRule } from '../../../Types/inputTypes'
import InputValidationField from '../../../Components/InputValidationField'

type Props = 
{
    style?: InputFieldStyle
    onChange: (e: {value: string, isValid: boolean}) => void
}

const QuestionTitleInput = (props: Props) => 
{
    const validationRules: ValidationRule[] =
    [
        {
            checkValidity: (value: string) => value.length > 2,
            errorMessage: "The question title must be at least 3 characters."
        },
        {
            checkValidity: (value: string) => value.length < 151,
            errorMessage: "The question title must not be longer than 150 characters."
        }
    ]

  return (
   <InputValidationField 
        style={props?.style}
        label='Title'

        validationRules={validationRules}
        isOptional={false}

        onChange={props.onChange}
   />
  )
}

export default QuestionTitleInput