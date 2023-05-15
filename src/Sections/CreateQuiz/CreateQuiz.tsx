import Button from '../../Components/Button'
import DetailsSection from './Components/DetailsSection'
import QuestionsSection from './Components/QuestionsSection'
import useQuiz from '../../hooks/useQuiz'

type Props = { closeQuizForm: () => void }

const CreateQuizPage = (props: Props) => 
{
    const { isValid, details, questions, save } = useQuiz(props.closeQuizForm);
    
    return (
        <div className='fixed top-0 right-0 h-screen w-screen flex justify-center items-center bg-black/[0.5]'>
            <div className='min-w-[370px] max-h-full h-full w-full sm:min-w-[500px] sm:w-fit md:min-w-[710px] sm:h-fit sm:max-h-[85%] grid grid-cols-1 gap-9 overflow-y-scroll gap-11 p-[4rem] rounded-lg bg-white'>
                <p className='font-bold text-5xl'>Create a New Quiz</p>

                <div className='flex flex-col gap-10'>
                    <DetailsSection editQuizDetails={details.edit} />

                    <QuestionsSection 
                        questions={questions.value}

                        addQuestion={questions.add}
                        deleteQuestion={questions.remove}
                    />
                </div>
                
                <div className='w-full flex justify-center items-center self-end mt-10'>
                    <div className='h-fit w-full sm:w-[300px] flex sm:justify-center items-center gap-4 text-center text-md'>
                        <Button 
                            style={{
                                neutral: "grow w-full px-4 py-2 text-red-600 font-bold rounded-lg border border-red-600 bg-transparent-100"
                            }}
                            text={"Cancel"}
                            isDisabled={false}
                            onClick={props.closeQuizForm}
                        />

                        <Button 
                            style={{
                                neutral: `grow w-full px-4 py-2 font-bold rounded-lg ${isValid && "bg-green-600 text-white"}`
                            }}
                            text={"Publish"}
                            isDisabled={!isValid}
                            onClick={save}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateQuizPage