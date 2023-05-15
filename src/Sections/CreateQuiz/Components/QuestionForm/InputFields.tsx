import { CompositionValue } from "../../../../Types/questionTypes";

import { QuestionTypeLabel, typesArray } from "../../../../Types/questionTypes";

import QuestionTitleInput from "../../../../Components/InputFields/QuestionTitleInput";
import ClarificationInput from "../../../../Components/InputFields/ClarificationInput";
import DropDownField from "../../../../Components/InputFields/DropDownField";

const InputFields = (props: 
    {
        answerType: string, 
        editTitle: (value: CompositionValue) => void;
        editClarification: (value: CompositionValue) => void, 
        changeAnswerType: (type: QuestionTypeLabel) => void;
    }) =>
{

    const 
    { 
        answerType, 

        editTitle, 
        editClarification,
        changeAnswerType 
    } = props

    return (
    <>
        <QuestionTitleInput 
            style={{
                container: "w-full",
                label: "font-bold",
                input: " px-2",
                underline: "h-[2px] mt-1"
            }}
        
            onChange={editTitle}
        />

        <ClarificationInput 
            style={{
                container: "w-full",
                label: "font-bold",
                input: " px-2",
                underline: "h-[2px] mt-1"
            }}
        
            onChange={editClarification}
        />
        
        <DropDownField 
            style={{
                container: "w-full mb-5",
                label: "font-bold",
                input: " px-3",
            }}
        
            label='Question Type'
            value={answerType}
            options={typesArray}

            onChange={(value: string) => changeAnswerType(value as QuestionTypeLabel)}
        />
    </>
    )
}

export default InputFields