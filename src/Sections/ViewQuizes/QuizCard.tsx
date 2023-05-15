import { useState } from "react";

import Questions from "../CreateQuiz/Components/Questions";
import Button from "../../Components/Button";

type Props = 
{
    quiz: any
}

const QuizDetails = (props: { details: any, turnOnQuestions: () => void }) =>
{
    const { details, turnOnQuestions } = props;

    const randomNum = Math.floor(Math.random() * 4);

    const backgroundColor: { [index: number]: string} =
    {
        0: "bg-[#cb9vfb]",
        1: "bg-[#7da6f6]",
        2: "bg-[#f9fd91]",
        3: "bg-[#5fcca0]"
    }

    return (
    <div 
        className={`w-full h-full grid grid-cols-1 gap-4 p-5 rounded-xl bg-gray-300 overflow-hidden cursor-pointer ${backgroundColor[randomNum]}`}
        onClick={turnOnQuestions}
    >
        <p className='text-3xl font-bold font-sans mb-10 line-clamp-2'>{details?.title?.value}</p>

        <div className="grid grid-cols-2 self-end">
            <div className='text-lg'>
                <p className='font-bold'>Chances </p>
                <p className=''>{details?.numOfChances?.value}</p>
            </div>

            <div className='text-lg'>
                <p className='font-bold'>% to Pass</p>
                <p className=''>{details?.percentagePass?.value}</p>
            </div>
        </div>
    </div>
    )
}

const QuizQuestions = (props: { quizTitle: string, questions: any, close: () => void }) =>
{
    const { quizTitle, questions, close } = props;

    return (
        <div className='fixed top-0 right-0 h-screen w-screen flex justify-center items-center bg-black/[0.5]'>
            <div className='min-w-[370px] max-h-full h-full w-full sm:min-w-[500px] sm:w-fit md:min-w-[710px] sm:h-fit sm:max-h-[85%] grid grid-cols-1 gap-9 overflow-y-scroll gap-11 p-[4rem] rounded-lg bg-white'>
            <p className='font-bold text-5xl'>{quizTitle}</p>

                <div className="flex justify-between items-center">
                    <p className='text-xl font-bold'>Questions</p>

                    <Button 
                        style={{
                            neutral: "w-fit px-4 py-2 text-red-600 font-bold rounded-lg border border-red-600 bg-transparent-100"
                        }}
                        text={"Close"}
                        isDisabled={false}
                        onClick={close}
                    />
                </div>
                

                <Questions questions={questions}  />
            </div>
        </div>
    )
}

const QuizCard = (props: Props) => 
{
    const { quiz } = props;
    
    const [isQuestionsOn, setisQuestionsOn] = useState<boolean>(false);

    return (
        <div className='w-[370px] h-[300px] p-7 rounded-lg'>
            {
                !!quiz?.details 
            && 
                <QuizDetails 
                    details={quiz?.details} 
                    turnOnQuestions={() => setisQuestionsOn(true)} 
                />
            }

            {
                isQuestionsOn && !!quiz?.questions 
            && 
                <QuizQuestions 
                    quizTitle={quiz?.details?.title?.value}
                    questions={quiz?.questions} 
                    close={() => setisQuestionsOn(false)}
                />
            }
        </div>
    )
}

export default QuizCard