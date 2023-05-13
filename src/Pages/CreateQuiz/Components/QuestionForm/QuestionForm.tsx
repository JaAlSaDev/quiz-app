import Button from '../../../../Components/Button'
import { Question, BooleanAnswer, MultiChoiceAnswer } from '../../../../Types/questionTypes'

import InputFields from './InputFields'
import Answers from './AnswersSection/Answers'

import useQuestion from '../../../../hooks/useQuestion'

type Props = 
{
    addQuestion: (newQuestion: Question) => void
}

const QuestionForm = (props: Props) => 
{
    const question = useQuestion(props.addQuestion)

    const { isValid, title, clarification, answer } = question;

    return (
        <div className='fixed h-screen w-screen flex justify-center items-center top-0 right-0  bg-black/[0.5]'>
            <div className='fixed h-fit w-[50rem] z-[3] flex flex-col gap-2 p-5 rounded-lg bg-white'>
                <p className='bg-white w-full text-center font-bold text-xl'>Question Form</p>

                <InputFields 
                    answerType={answer.value.label} 
                    editTitle={title.edit}
                    editClarification={clarification.edit}
                    changeAnswerType={answer.changeType}
                />

                <Answers 
                    answer={answer.value}
                    options={answer.options}
                    questionLabelType={answer?.value.label}
                />

                <div className='w-full h-fit flex justify-center mt-4'>
                    <Button 
                        className="w-fit px-4 py-2 rounded-lg"
                        text={"Add Question!"}
                        isDisabled={!isValid}
                        onClick={question.save}
                    />
                </div>
            </div>
        </div>
    )
}

export default QuestionForm