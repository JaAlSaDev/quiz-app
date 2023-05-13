import React from 'react'
import { InputFieldStyle, ValidationRule } from '../../Types/inputTypes'

import InputValidationField from './InputValidationField'
import { CompositionValue } from '../../Types/questionTypes'

type Props = 
{
    style?: InputFieldStyle
    onChange: (e: CompositionValue) => void
}

const validationRules: ValidationRule[] =
    [
        {
            checkValidity: (value: string) => value.length > 0,
            errorMessage: "The answer must not be empty"
        },
        {
            checkValidity: (value: string) => value.length < 51,
            errorMessage: "The answer must not be longer than 50 characters."
        }
    ]
    

const MultiChoiceInput = (props: Props) => 
{
    

  return (
   <InputValidationField 
        style={props?.style}

        validationRules={validationRules}
        isOptional={false}
        onChange={props.onChange}
   />
  )
}

export default MultiChoiceInput