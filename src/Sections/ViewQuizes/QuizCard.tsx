import Questions from "../CreateQuiz/Components/Questions";

type Props = 
{
    quiz: any
}

const QuizDetails = (props: { details: any }) =>
{
    const { details } = props;

    return (
    <div className='w-full flex flex-col gap-4'>
        <p className='text-2xl font-bold text-center'>{details?.title?.value}</p>

        <p className='text-xl font-bold'>Details:</p>

        <div className="ms-5">
            <p className='text-lg'>
                <span className='font-bold'>Number of Chances: </span>
                <span className='text-lg'>{details?.numOfChances?.value}</span>
            </p>

            <p className='text-lg'>
                <span className='font-bold'>Percentage to Pass: </span>
                <span className='text-lg'>{details?.percentagePass?.value}</span>
            </p>
        </div>
    </div>
    )
}

const QuizQuestions = (props: {questions: any}) =>
{
    const { questions } = props;

    return (
        <div>
            <p className='text-xl font-bold'>Questions:</p>

            <Questions questions={questions}  />
        </div>
    )
}

const QuizCard = (props: Props) => 
{
    const { quiz } = props;
    
    return (
        <div className='w-full flex flex-col gap-3 gap-10 p-7 bg-gray-100 rounded-lg'>
            {
                !!quiz?.details 
            && 
               <>
                    <QuizDetails details={quiz?.details}/>
                    <div className="h-[2px] w-full bg-black mt-3"/>
               </>
            }

            {!!quiz?.questions && <QuizQuestions questions={quiz?.questions }/>}
        </div>
    )
}

export default QuizCard