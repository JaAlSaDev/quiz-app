import React, { useState, useEffect } from 'react'



type Props = 
{
    style?:
    {
        container?: string,
        label?: string,
        input?: string,
        underline?: string
    }

    label?: string,
    hasFocused: boolean,
    errorMessage?: string,

    retrieveValue: (value: string) => void,
    retrieveFocus: (value: boolean) => void,
    retrieveTyped: (value: boolean) => void
}

const InputField = (props: Props) => 
{
    const { style } = props 
    const [value, setValue] = useState<string>("");
    const [isFocused, setFocused] = useState<boolean>(false);

    const changeValue = (value: string) =>
    {
        props.retrieveTyped(true);

        setValue(value)
    }

    useEffect(() => props.retrieveValue(value), [value])

    useEffect(() => 
    {
        if (!props.hasFocused && isFocused) 
        {
            props.retrieveFocus(isFocused)
        }
    }, [isFocused])

    return (
        <div className={`relative ${style?.container}`}>
            <div className='w-full'>

                {props?.label && <label className={style?.label}>{props.label}</label>}

                <input 
                    className={`w-full outline-0 bg-gray-200 border-transparent ${style?.input}`}
                    type='text'
                    value={value}
                    placeholder={isFocused? "Start typing...": ""}
                    
                    onChange={e => changeValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() =>  setFocused(false)}
                />

                <>
                    <div className={`w-full ${props?.errorMessage? "bg-red-500": "bg-gray-500"} ${style?.underline}`}/>

                    <div className='mt-2 h-4 mb-1'>
                        {props.errorMessage && <p className='text-sm text-red-500'>{props.errorMessage}</p>}
                    </div>
                </>
            </div>
        </div>
    )
}

export default InputField