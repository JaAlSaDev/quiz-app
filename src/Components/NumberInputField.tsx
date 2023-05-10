import React, { useState, useEffect } from 'react'
import Button from './Button';

type Props = 
{
    style?:
    {
        container?: string,
        label?: string,
        input?: string
    }
    label: string,

    defaultValue: number,
    step: number,
    min: number,
    max: number, 

    onChange: (e: {value: string, isValid: boolean}) => void
}

const NumberInputField = (props: Props) => 
{
    const { style, label, defaultValue, step, min, max, onChange } = props;

    const [value, setValue] = useState<number>(defaultValue)

    const changeValue = (delta: -1 | 1) =>
    {
        const newValue = value + (delta * step);

        if (min <= newValue && newValue <= max) 
        {
            setValue(newValue)
        }
    }

    useEffect(() => onChange({value: value.toString(), isValid: true}), [value])

    return (
        <div className={`flex flex-col ${style?.container}`}> 
            <label className={style?.label}>{label}</label>

            <div className='flex items-center'>
                <input className={style?.input} type='text' value={value} min={min} max={max} readOnly />

                <div className='h-full flex ms-2 gap-1 text-sm'>
                    <Button 
                        className="px-2 rounded-lg flex justify-center"
                        text={"+"}
                        isDisabled={value === max}
                        onClick={() => changeValue(1)}
                    />

                    <Button 
                        className="px-2 rounded-lg flex justify-center"
                        text={"-"}
                        isDisabled={value === min}
                        onClick={() => changeValue(-1)}
                    />
                </div>

            </div>
        </div>
    )
}

export default NumberInputField