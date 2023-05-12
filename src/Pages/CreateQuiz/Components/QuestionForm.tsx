import { useState, useEffect } from 'react'

import Button from '../../../Components/Button'
import { Question, CompositionValue, typesArray, questionTypesObj, YES_NO, QuestionTypeLabel, AnswerType, Answer } from '../../../Types/questionTypes'
import DropDownField from '../../../Components/DropDownField'
import QuestionTitleInput from './QuestionTitleInput'
import ClarificationInput from './ClarificationInput'
import AnswerSection from './AnswerSection'

type Props = 
{
    addQuestion: (newQuestion: Question) => void
}

const QuestionForm = (props: Props) => 
{
    const [isValid, setValidity] = useState<boolean>(false);

    const [title, setTitle] = useState<CompositionValue>({ value: "", isValid: false });
    const [clarification, setClarification] = useState<CompositionValue>({ value: "", isValid: true })
    const [answer, setAnswer] = useState<AnswerType>(questionTypesObj["yes-no"]);

    const editTitle = (value: CompositionValue) => setTitle(value);

    const editClarification = (value: CompositionValue) => setClarification(value);

    const changeType = (type: QuestionTypeLabel) =>
    {
        let newAnswer = { ...answer };

        newAnswer = questionTypesObj[type];

        setAnswer(newAnswer)
    }

    const editCorrectAnswer = (questionLabelType: QuestionTypeLabel | undefined, correctAnswer: Answer) =>
    {
        if (questionLabelType === QuestionTypeLabel['yes-no']) 
        {
            const newAnswer = { ...answer } as YES_NO;
    
            newAnswer.correctAnswer = correctAnswer
    
            setAnswer(newAnswer)
        }
    }

    const getAnswerElement = (questionLabelType: (QuestionTypeLabel | undefined)): JSX.Element =>
    {
        if (questionLabelType === QuestionTypeLabel['yes-no']) 
        {
            const booleanAnswer = answer as YES_NO;

            return <AnswerSection 
                        style={
                            {
                                container: "flex w-fit gap-3",
                                radio:
                                {
                                    container: "gap-3",
                                }
                            }
                        }
                        correctAnswer={booleanAnswer.correctAnswer} 
                        possibleAnswers={booleanAnswer.answers} 
                        onChange={(value: Answer) => editCorrectAnswer(questionLabelType, value)}
                    />
        }
        else if (questionLabelType === QuestionTypeLabel["multi-choice"])
        {

        }

        return <></>
    }

    const saveQuestion = () =>
    {
        const question: Question =
        {
            title: title,
            clarification: clarification,
            answer: answer,
            isValid: isValid
        }

        props.addQuestion(question)
    }

    useEffect(() => 
    {
        const isTitleValid = title.isValid as boolean;

        const isClarificationValid = clarification.isValid as boolean;

        let arePossibleAnswersValid = false;

        if (answer?.label === QuestionTypeLabel['yes-no'] ) 
        {
            arePossibleAnswersValid = true
        }

        const isQuestionValied = isTitleValid && isClarificationValid && arePossibleAnswersValid;
        
        setValidity(isQuestionValied);
    }      
    ,[title, clarification, answer])
    
    return (
        <div className='fixed h-screen w-screen flex justify-center items-center top-0 right-0  bg-black/[0.5]'>
            <div className='fixed h-fit w-[50rem] z-[3] flex flex-col gap-2 p-5 rounded-lg bg-white'>
                <p className='bg-white w-full text-center font-bold text-xl'>Question Form</p>

                <QuestionTitleInput 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                
                    onChange={editTitle}
                />

                <ClarificationInput 
                    style={{
                        container: "w-full",
                        label: "font-bold",
                        input: "border-black border px-2",
                        underline: "h-[2px] mt-1"
                    }}
                
                    onChange={editClarification}
                />
                
                <DropDownField 
                    style={{
                        container: "w-full mb-5",
                        label: "font-bold",
                        input: "border-black border px-3",
                    }}
                
                    label='Question Type'
                    value={answer?.label}
                    options={typesArray}

                    onChange={(value: string) => changeType(value as QuestionTypeLabel)}
                />

                {getAnswerElement(answer?.label)}

                <div className='w-full h-fit flex justify-center mt-4'>
                    <Button 
                        className="w-fit px-4 py-2 rounded-lg"
                        text={"Add Question!"}
                        isDisabled={!isValid}
                        onClick={saveQuestion}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default QuestionForm