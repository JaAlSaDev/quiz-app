import React from 'react'

type Props = 
{
    className: string,
    text: string,
    onClick: Function
}

const Button = (props: Props) => 
{
    const { className, text, onClick } = props;

    return (
        <div className={`${className} cursor-pointer`} onClick={() => onClick()}>{text}</div>
    )
}

export default Button