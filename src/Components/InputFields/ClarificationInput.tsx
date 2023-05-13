import { InputFieldStyle, ValidationRule } from '../../Types/inputTypes'
import InputValidationField from './InputValidationField'

type Props = 
{
    style?: InputFieldStyle
    onChange: (e: {value: string, isValid: boolean}) => void
}

const validationRules: ValidationRule[] =
[
    {
        checkValidity: (value: string) => value.length > 2,
        errorMessage: "Clarification must be at least 3 characters."
    },
    {
        checkValidity: (value: string) => value.length < 151,
        errorMessage: "Clarification must not be longer than 150 characters."
    }
]
    
const ClarificationInput = (props: Props) => 
{
  return (
   <InputValidationField 
        style={props?.style}
        label='Clarification (optional)'

        validationRules={validationRules}
        isOptional={true}

        onChange={props.onChange}
   />
  )
}

export default ClarificationInput