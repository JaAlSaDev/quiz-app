import React from 'react'

type Props = 
{
    className: string,
    text: string,
    isDisabled?: boolean,
    onClick: Function
}

const Button = (props: Props) => 
{
    const { className, text, isDisabled,  onClick } = props;

    return (
        <div 
            className={`h-fit w-fit ${className} ${isDisabled? "bg-gray-300 cursor-not-allowed": `bg-[#ee9a00] cursor-pointer`} `} 
            onClick={() => 
                {
                    if (!isDisabled) 
                    {
                        onClick()
                    }
                }}
        >
            {text}
        </div>)
}

export default Button