import Button from '../../Components/Button'
import DetailsSection from './Components/DetailsSection'
import QuestionsSection from './Components/QuestionsSection'
import useQuiz from '../../hooks/useQuiz'

type Props = { navigateToMainPage: () => void }

const CreateQuizPage = (props: Props) => 
{
    const 
    { 
        isValid, 
        details, 
        questions, 
        save 
    } = useQuiz(props.navigateToMainPage);
    
    return (
        <div className='w-[75%] flex flex-col gap-3 overflow-y-scroll'>
            <DetailsSection editQuizDetails={details.edit} />

            <QuestionsSection 
                questions={questions.value} 
                addQuestion={questions.add}
                deleteQuestion={questions.remove}
            />
            
            <div className='w-full flex justify-center my-4'>
                <Button 
                    className="w-fit px-3 py-2 text-lg rounded-lg"
                    text={"Save Quiz"}
                    isDisabled={!isValid}
                    onClick={save}
                />
            </div>
        </div>
    )
}

export default CreateQuizPage