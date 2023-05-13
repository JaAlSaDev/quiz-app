import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import DetailsSection from './Components/DetailsSection'
import { CompositionValue, Question } from '../../Types/questionTypes'
import QuestionsSection from './Components/QuestionsSection'

type Props = 
{
    navigateToMainPage: () => void
}

type QuizContents =
{
    "details": { [index: string]: CompositionValue },
    "questions": Question[]
}

const CreateQuizPage = (props: Props) => 
{
    const [isValid, setisValid] = useState<boolean>(false)
    const [quizContents, setQuizContents] = useState<QuizContents>({ details: {}, questions: [] })

    const editQuizDetails = (key: string, value: CompositionValue) =>
    {        
        setQuizContents(oldQuizContents =>
        {
            const newQuizContents = { ...oldQuizContents };

            newQuizContents.details[key] = value;

            return newQuizContents;
        })
    }

    const addQuestion = (newQuestion: Question) =>
    {
        setQuizContents(oldQuizContents =>
        {
            const newQuizContents = { ...oldQuizContents };

            newQuizContents.questions.push(newQuestion);

            return newQuizContents;
        })
    }

    const deleteQuestion = (index: number) =>
    {
        setQuizContents(oldQuizContents =>
        {
            const newQuizContents = { ...oldQuizContents };

            const newQuestions = [...newQuizContents.questions];
            
            newQuestions.splice(index, 1);

            newQuizContents.questions = newQuestions

            return newQuizContents;
        })
    }

    const saveQuiz = () => 
    {
        if (isValid) 
        {
            const quizesString = localStorage?.getItem("quizes");

            if (quizesString) 
            {
                const quizes = JSON.parse(quizesString);

                quizes.push(quizContents)


                localStorage.setItem("quizes", JSON.stringify(quizes))
            }
            else
            {
                const quizes = [quizContents];

                localStorage.setItem("quizes", JSON.stringify(quizes))
            }

            props.navigateToMainPage();
        }
        
        console.log("Saving quiz now...");
    }

    useEffect(() => 
    {
        console.log("quizContents: ", quizContents);
        
        const { details, questions } = quizContents
        
        const areQuizDetailsValid = !Object.values(details).some(field => !field.isValid);
        
        const areQuestionsValid = !questions.some(question => !question.isValid) && questions.length > 2 && questions.length < 9;

        const isAllValid = areQuizDetailsValid && areQuestionsValid ;
              
        setisValid(isAllValid)
    }, [quizContents])
    

    return (
        <div className='w-[75%] flex flex-col gap-3 overflow-y-scroll'>
            <DetailsSection editQuizDetails={editQuizDetails} />

            <QuestionsSection 
                questions={quizContents.questions} 
                addQuestion={addQuestion}
                deleteQuestion={deleteQuestion}
            />
            
            <div className='w-full flex justify-center my-4'>
                <Button 
                    className="w-fit px-3 py-2 text-lg rounded-lg"
                    text={"Save Quiz"}
                    isDisabled={!isValid}
                    onClick={saveQuiz}
                />
            </div>
        </div>
    )
}

export default CreateQuizPage