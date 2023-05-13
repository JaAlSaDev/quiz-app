import { useState, useEffect } from 'react'

import Button from '../../../Components/Button'
import { Question, CompositionValue, typesArray, questionTypesObj, YES_NO, QuestionTypeLabel, AnswerType, Answer, MULTI_CHOICE, OPEN_ENDED } from '../../../Types/questionTypes'
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
    const [answer, setAnswer] = useState<AnswerType>(new YES_NO());
    
    console.log("answer: ", answer);
    
    const editTitle = (value: CompositionValue) => setTitle(value);

    const editClarification = (value: CompositionValue) => setClarification(value);

    const changeType = (type: QuestionTypeLabel) =>
    {
        let newType: AnswerType = new YES_NO();

        if (type === QuestionTypeLabel['multi-choice']) 
        {
            newType = new MULTI_CHOICE()
        }
        else if (type === QuestionTypeLabel["open-ended"])
        {
            newType = new OPEN_ENDED()
        }

        setAnswer(newType)
    }

    const editCorrectAnswer = (questionLabelType: QuestionTypeLabel | undefined, correctAnswerID: number) =>
    {
        if (questionLabelType === QuestionTypeLabel['yes-no'] || questionLabelType === QuestionTypeLabel["multi-choice"]) 
        {
            const newAnswer = { ...answer } as (YES_NO | MULTI_CHOICE);
    
            console.log("newAnswer: ", newAnswer);
            
            newAnswer.correctAnswerID = correctAnswerID
    
            setAnswer(newAnswer)
        }
    }

    
    const addAnswer = () =>
    {
        if (answer.label === questionTypesObj["multi choice"].label) 
        {
            const copyAnswer = { ...answer } as MULTI_CHOICE;

            const newAnswerItem : Answer =
            {
                id: copyAnswer.answers.length,
                composition: { value: "", isValid: false }
            }

            copyAnswer.answers.push(newAnswerItem);

            setAnswer(copyAnswer);
        }
    }


    const editAnswer = (index: number, newAnswer: Answer) =>
    {
        if (answer.label === questionTypesObj["multi choice"].label) 
        {
            const copyAnswer = { ...answer } as MULTI_CHOICE;

            copyAnswer.answers[index] = newAnswer

            setAnswer(copyAnswer);
        }
    }

    const deleteAnswer = (index: number) =>
    {
        if (answer.label === questionTypesObj["multi choice"].label) 
        {
            const newAnswer = { ...answer } as MULTI_CHOICE;

            newAnswer.answers.splice(index, 1);

            setAnswer(newAnswer);
        }
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

        console.log("questionquestionquestion: ", question);
        
        props.addQuestion(question)
    }

    const getAnswerElement = (questionLabelType: (QuestionTypeLabel | undefined)): JSX.Element =>
    {
        if (questionLabelType === QuestionTypeLabel['yes-no'] || questionLabelType === QuestionTypeLabel["multi-choice"]) 
        {
            const answerProp = answer as (YES_NO | MULTI_CHOICE);

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
                        answer={answerProp}

                        onChange={(value: number) => editCorrectAnswer(questionLabelType, value)}
                        multiChoiceFunctions= 
                        {
                            {
                                addAnswer: addAnswer,
                                deleteAnswer: deleteAnswer,
                                editAnswer: editAnswer
                            }
                        }
                        
                    />
        }

        return <></>
    }

    useEffect(() => 
    {
        const isTitleValid = title.isValid as boolean;

        const isClarificationValid = clarification.isValid as boolean;

        let arePossibleAnswersValid = false;

        if (answer?.label === QuestionTypeLabel['yes-no']) 
        {
            console.log("answer yes-no: ", answer);
            
            arePossibleAnswersValid = true
        }
        else if (answer?.label === QuestionTypeLabel["multi-choice"])
        {
            const multi_choice_answer = (answer as MULTI_CHOICE);

            const allAnswersValid = !(multi_choice_answer.answers.some(answer => !answer?.composition.isValid));
            const isSelectedAnswerValid = multi_choice_answer?.correctAnswerID !== null;
            const meetsMinimumAmount = multi_choice_answer.doesMeetMinimum();

            arePossibleAnswersValid = allAnswersValid && isSelectedAnswerValid && meetsMinimumAmount

        }
        else if (answer?.label === QuestionTypeLabel["open-ended"])
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