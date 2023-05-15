import Button from '../../../../Components/Button'
import { Question, BooleanAnswer, MultiChoiceAnswer } from '../../../../Types/questionTypes'

import InputFields from './InputFields'
import Answers from './AnswersSection/Answers'

import useQuestion from '../../../../hooks/useQuestion'

type Props = 
{
    addQuestion: (newQuestion: Question) => void,
    cancel: () => void
}

const QuestionForm = (props: Props) => 
{
    const { cancel } = props;

    const question = useQuestion(props.addQuestion)

    const { isValid, title, clarification, answer } = question;

    return (
        <div className='fixed top-0 right-0 h-screen w-screen flex justify-center items-center bg-black/[0.5]'>
        <div className='min-w-[370px] max-h-full h-full w-full sm:min-w-[500px] sm:w-fit md:min-w-[710px] sm:h-fit sm:max-h-[85%] grid grid-cols-1 gap-9 overflow-y-scroll gap-11 p-[4rem] rounded-lg bg-white'>
                <div>
                    <p className='text-center font-bold text-4xl mb-5'>Add a New Question</p>

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
                </div>
                

                <div className='w-full flex justify-center items-center self-end mt-10'>
                    <div className='h-fit w-full sm:w-[300px] flex sm:justify-center items-center gap-4 text-center text-md'>
                        <Button 
                            style={{
                                neutral: "grow w-full px-4 py-2 text-red-600 font-bold rounded-lg border border-red-600 bg-transparent"
                            }}
                            text={"Cancel"}
                            isDisabled={false}
                            onClick={cancel}
                        />

                        <Button 
                            style={{
                                neutral: `grow w-full px-4 py-2 font-bold rounded-lg ${isValid && "bg-green-600 text-white"}`
                            }}
                            text={"Confirm"}
                            isDisabled={!isValid}
                            onClick={question.save}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionForm