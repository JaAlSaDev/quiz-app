import { useState } from 'react'

import Button from '../../../Components/Button'
import { BooleanAnswer, GenericAnswer, MultiChoiceAnswer, Question, QuestionTypeLabel } from '../../../Types/questionTypes'

import AlertBox from '../../../Components/AlertBox'

import RadioInputs from '../../../Components/InputFields/RadioInputs'

type Props = 
{
    questions: Question[],
    deleteQuestion: (index: number) => void
}


const AnswersElement = (props: { answer: GenericAnswer }) =>
{
    const { correctAnswerID,  } = props.answer;

    return (
        <>
            {( typeof correctAnswerID === "number" ) && 
            
                <RadioInputs 
                    style={{
                        container: "flex w-fit gap-3",
                        radio: { container: "gap-3" }
                    }}
                    
                    answer={props.answer}
                    isDisabled={true}
                />
            
            }
        </> 
    )
}

const QuestionElement = (props: { index: number, question: Question, deleteQuestion: () => void}) =>
{
    const { index, question } = props;    

    const [isAlertOn, setIsAlertOn] = useState<boolean>(false);

    const answer = question.answer;

    const openDeleteDialog = () => setIsAlertOn(true);

    const deleteQuestion = () =>
    {
        props.deleteQuestion();
        setIsAlertOn(false)
    }

    return (
        <>
            <div className='bg-blue-100'>
                <div className='w-full flex justify-between items-center'>
                    <p>
                        <span className='font-bold'>{index}: </span>
                        <span>{question.title.value}</span>
                    </p>

                    <Button 
                        className="px-2 rounded-sm bg-red-500 text-md font-bold text-white"
                        text={"X"}
                        isDisabled={false}
                        onClick={openDeleteDialog}
                    />
                </div>
            

                {
                    question.clarification?.value 
                &&
                    <p className='ms-12 text-sm'>
                        <span className='font-bold'>Clarification: </span> 
                        <span>{question.clarification?.value}</span>
                    </p>
                }
                
                {
                    question.answer?.label !== QuestionTypeLabel.open_ended
                &&
                    <div className={`ms-4 mt-2 ${answer?.label === QuestionTypeLabel.yes_no && "flex items-center"}`}>
                        <p>Answers: </p>

                        <div className='mt-1 ps-5'>
                            {
                                (answer?.label === QuestionTypeLabel.yes_no || answer?.label === QuestionTypeLabel.multi_choice)
                            &&
                                <AnswersElement answer={answer as (BooleanAnswer | MultiChoiceAnswer)} />
                            }
                        </div>
                    </div>
                }
                
            </div>

           {
                isAlertOn 
            && 
                <AlertBox 
                    message={`Are you sure you want to remove question #${index}?`}
                    confirm={deleteQuestion}
                    cancel={() => setIsAlertOn(false)}
                />
            }
        </>
    )
}

 const Questions = (props: Props) => 
{
    const { questions, deleteQuestion } = props
    
    return (
        <div className='flex flex-col gap-3 ms-10'>
            {questions.map((question, index) => 
            (
                <QuestionElement 
                    key={question.id} 
                    index={index + 1} 
                    question={question}
                    
                    deleteQuestion={() => deleteQuestion(index)}
                />
            ))}
        </div>
    )
}

export default Questions