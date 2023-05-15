import React from 'react'

type Props = 
{
    style:
    {
        neutral: string,
        active?: string,
        disabled?: string
    }
    text: string,
    isDisabled?: boolean,
    onClick: Function
}

const Button = (props: Props) => 
{
    const { style, text, isDisabled } = props;

    const onClick = () =>
    {
        if (!isDisabled) 
        {
            props.onClick()
        }
    }

    return (
        <div 
            className={`h-fit w-fit m-0 flex justify-center items-center ${style.neutral} ${isDisabled? `bg-gray-200 ${style.disabled} cursor-not-allowed`: `${style.active} cursor-pointer`}`} 
            onClick={onClick}
        >
            <p>{text}</p>
        </div>)
}

export default Button