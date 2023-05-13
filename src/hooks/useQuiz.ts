import { useState, useEffect } from "react"

import { Question } from "../Types/questionTypes"

import { CompositionValue } from "../Types/questionTypes"

type QuizContents =
{
    "id": number,
    "details": { [index: string]: CompositionValue },
    "questions": Question[]
}

type Details =
{
    [index: string]: CompositionValue
}

const useDetails = () =>
{
    const [details, setDetails] = useState<Details>({});

    const edit = (key: string, value: CompositionValue): void =>
    {
        setDetails(oldDetails =>
        {
            const newDetails = { ...oldDetails };

            newDetails[key] = value;

            return newDetails;
        })
    }

    const isValid = (): boolean => !Object.values(details).some(field => !field.isValid);


    return {
        value: details,
        edit: edit,

        isValid: isValid,
    }
}

const useQuestions = () =>
{
    const [questions, setQuestions] = useState<Question[]>([]);

    const add = (newQuestion: Question) =>
    {        
        setQuestions(oldQuestions =>
        {
            const newQuestions = [ ...oldQuestions ];

            newQuestions.push(newQuestion);

            return newQuestions;
        })
    }

    const remove = (index: number) =>
    {
        setQuestions(oldQuestions =>
        {
            const newQuestions = [...oldQuestions];
            
            newQuestions.splice(index, 1);

            return newQuestions;
        })
    }

    const isValid = (): boolean => 
    {
        const areAllQuestionsValid = !questions.some(question => !question.isValid);
        const isLengthValid = questions.length > 2 && questions.length < 9;

        return areAllQuestionsValid && isLengthValid;
    }


    return {
        value: questions,
        add: add,
        remove: remove,
        isValid: isValid
    }
}

const useQuiz = (closeQuizForm: () => void) =>
{
    const [isValid, setisValid] = useState<boolean>(false)
    const details = useDetails();
    const questions = useQuestions();

    const saveQuiz = () => 
    {
        if (isValid) 
        {
            const quiz: QuizContents =
            {
                id: Math.floor(Math.random() * 9999),
                details: details.value,
                questions: questions.value
            }

            const quizesString = localStorage?.getItem("quizes");

            if (quizesString) 
            {
                const quizes = JSON.parse(quizesString);

                quizes.push(quiz)

                localStorage.setItem("quizes", JSON.stringify(quizes))
            }
            else
            {
                const quizes = [quiz];

                localStorage.setItem("quizes", JSON.stringify(quizes))
            }

            closeQuizForm();
        }

        console.log("Saving quiz now...");
    }

    useEffect(() => 
    {                          
        const isAllValid = details.isValid() && questions.isValid();
              
        setisValid(isAllValid)
    }, [details, questions])

    return {
        isValid: isValid,

        details: details,

        questions: questions,

        save: saveQuiz
    }
}

export default useQuiz