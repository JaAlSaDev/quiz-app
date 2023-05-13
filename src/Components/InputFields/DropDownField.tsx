import React from 'react'

type Props = 
{
    style?:
    {
        container?: string,
        label?: string,
        input?: string
    },

    label: string,
    value: string | undefined,
    options: string[],
    onChange: (value: string) => void,

}

const DropDownField = (props: Props) => 
{
    const { 
        style, 
        label, 
        value, 
        options, 
        onChange 
    } = props;

  return (
    <div className={`flex flex-col  ${style?.container}`}>
        <label className={`${style?.label}`}>{label}</label>

        <select 
            className={`w-fit pe-4 ${style?.input}`}
            name="questionType"
            value={value} 
            onChange={e => onChange(e.target.value)}
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
  )
}

export default DropDownField