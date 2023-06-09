import React, { useState, useEffect } from 'react'
import { InputFieldStyle, ValidationRule } from '../../Types/inputTypes';
import InputField from './InputField';

import { CompositionValue } from '../../Types/questionTypes';
type Props = 
{
    style?: InputFieldStyle
    label?: string,

    validationRules: ValidationRule[]
    isOptional: boolean;

    onChange: (e: {value: string, isValid: boolean}) => void
}

const InputValidationField = (props: Props) => 
{
    const [value, setValue] = useState<string>("");
    const [compositionValue, setCompositionValue] = useState<CompositionValue>({value: "", isValid: props.isOptional });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [hasFocused, setHasFocused] = useState<boolean>(false);
    const [hasTyped, setHasTyped] = useState<boolean>(false);


    const validateInput = () =>
    {
        let isValid = true;
        let errorMessage = "";
        
        if (!props.isOptional || value.length > 0) 
        {
            const validationRules = props.validationRules;

            for (let i = 0; i < validationRules.length; i++) 
            {
               const rule = validationRules[i]; 
               
               if (!rule.checkValidity(value)) 
               {
                    isValid = false;
                    errorMessage = rule.errorMessage

                    break
               }
            }
        }
        else
        {

        }

        return { isValid, errorMessage }
    }

    useEffect(() => 
    {
        const hasInteractedWithInputField = hasFocused && hasTyped;
        
        if (hasInteractedWithInputField) 
        {
            const { isValid, errorMessage } = validateInput();

            setErrorMessage(errorMessage);
        
            setCompositionValue({ value: value, isValid: isValid })
        }
    }, [value, hasFocused, hasTyped])


    useEffect(() => {        
        props.onChange(compositionValue)
    }, [compositionValue])
        
    return (
        <InputField 
            style={props?.style}
            label={props?.label}
            hasFocused={hasFocused}

            errorMessage={errorMessage}
            retrieveValue={setValue}
            retrieveFocus={setHasFocused}
            retrieveTyped={setHasTyped}
        />
    )
}

export default InputValidationField