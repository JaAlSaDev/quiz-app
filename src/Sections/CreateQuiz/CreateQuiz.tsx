import Button from '../../Components/Button'
import DetailsSection from './Components/DetailsSection'
import QuestionsSection from './Components/QuestionsSection'
import useQuiz from '../../hooks/useQuiz'

type Props = { closeQuizForm: () => void }

const CreateQuizPage = (props: Props) => 
{
    const 
    { 
        isValid, 
        details, 
        questions, 
        save 
    } = useQuiz(props.closeQuizForm);
    
    return (
        <div className='fixed top-0 right-0 h-screen w-screen flex justify-center items-center bg-black/[0.5]'>
            <div className='w-[75%] flex flex-col gap-3 overflow-y-scroll gap-10 p-5 rounded-lg bg-white'>
                <DetailsSection editQuizDetails={details.edit} />

                <QuestionsSection 
                    questions={questions.value} 
                    addQuestion={questions.add}
                    deleteQuestion={questions.remove}
                />
                
                <div className='w-full flex justify-center gap-4 my-4'>

                    <Button 
                        className="w-fit px-3 py-2 text-lg text-white font-bold rounded-lg bg-red-500"
                        text={"Cancel"}
                        isDisabled={false}
                        onClick={props.closeQuizForm}
                    />

                    <Button 
                        className="w-fit px-3 py-2 text-lg font-bold rounded-lg"
                        text={"Save Quiz"}
                        isDisabled={!isValid}
                        onClick={save}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateQuizPage