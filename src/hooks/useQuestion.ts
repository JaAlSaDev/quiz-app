import { useState, useEffect } from "react";

import { BooleanAnswer, CompositionValue, MultiChoiceAnswer, OpenEndedAnswer } from "../Types/questionTypes";

import { Question, QuestionTypeLabel, GenericAnswer, Answer } from "../Types/questionTypes";


const useTitle = () =>
{
    const [title, setTitle] = useState<CompositionValue>({ value: "", isValid: false });

    const editTitle = (value: CompositionValue): void => setTitle(value);

    const isValid = (): boolean => title.isValid;

    return { 
        value: title, 
        edit: editTitle,
        isValid: isValid
    };
}

const useClarification = () =>
{
    const [clarification, setClarification] = useState<CompositionValue>({ value: "", isValid: true });

    const editClarification = (value: CompositionValue) => setClarification(value);

    const isValid = (): boolean => clarification.isValid;

    return { 
        value: clarification, 
        edit: editClarification,
        isValid: isValid
    }
}

const useAnswer = () =>
{
    const [answer, setAnswer] = useState<GenericAnswer>(new BooleanAnswer());
    
    const changeType = (type: QuestionTypeLabel) =>
    {
        let newAnswer;
        
        if (type === QuestionTypeLabel.multi_choice) 
        {            
            newAnswer = new MultiChoiceAnswer();

            setAnswer(newAnswer)
        }
        else if (type === QuestionTypeLabel.open_ended)
        {
            newAnswer = new OpenEndedAnswer();

            setAnswer(newAnswer)
        }
        else 
        {   
            setAnswer(new BooleanAnswer())
        }
    }

    const selectCorrectOption = (correctAnswerID: number) =>
    {
        const isAnswerChoice = answer.label === QuestionTypeLabel.yes_no || answer.label === QuestionTypeLabel.multi_choice;

        if (isAnswerChoice) 
        {
            const newAnswer = { ...answer };
                
            newAnswer.correctAnswerID = correctAnswerID
            
            setAnswer(newAnswer)
        }
    }

    const addOption = () =>
    {  
        const isMultiChoice = answer.label === QuestionTypeLabel.multi_choice
        if (isMultiChoice) 
        {
            const copyAnswer = { ...answer };

            const newAnswerItem : Answer =
            {
                id: Math.floor(Math.random() * 9999),
                composition: { value: "", isValid: false }
            }

            copyAnswer.answers.push(newAnswerItem);

            setAnswer(copyAnswer);
        }
    }

    const editOption = (index: number, newAnswer: Answer) =>
    {
        const isMultiChoice = answer.label === QuestionTypeLabel.multi_choice;

        if (isMultiChoice) 
        {
            const copyAnswer = { ...answer };

            copyAnswer.answers[index] = newAnswer

            setAnswer(copyAnswer);
        }
    }

    const deleteOption = (index: number) =>
    {
        const isMultiChoice = answer.label === QuestionTypeLabel.multi_choice;

        if (isMultiChoice) 
        {
            const newAnswer = { ...answer };


            const chosenAnswer = newAnswer.answers[index];

            newAnswer.answers.splice(index, 1);
    
            if (chosenAnswer?.id === newAnswer.correctAnswerID) 
            {
                newAnswer.correctAnswerID = -1
            }

            setAnswer(newAnswer);
        }
    }

    const isValid = () =>
    {
        let arePossibleAnswersValid = false;

        if (answer.label === QuestionTypeLabel.yes_no) 
        {            
            arePossibleAnswersValid = true
        }
        else if (answer.label === QuestionTypeLabel.multi_choice)
        {
            const allAnswersValid = !(answer.answers).some(answer => !answer?.composition.isValid);
            const isSelectedAnswerValid = answer?.correctAnswerID > -1;
            const meetsMinimumAmount = (answer as MultiChoiceAnswer)?.doesMeetMinimum();

            arePossibleAnswersValid = allAnswersValid && isSelectedAnswerValid && meetsMinimumAmount
        }
        else if (answer.label === QuestionTypeLabel.open_ended)
        {
            arePossibleAnswersValid = true
        }

        return arePossibleAnswersValid
    }

    return {
        value: answer,

        changeType: changeType,

        options:
        {
            select: selectCorrectOption,
            add: addOption,
            edit: editOption,
            delete: deleteOption
        },

        isValid: isValid
    }
}

const useQuestion = (addQuestion: (newQuestion: Question) => void) =>
{
    const [isValid, setValidity] = useState<boolean>(false);

    const title = useTitle();
    const clarification = useClarification();
    const answer = useAnswer()

    const saveQuestion = () =>
    {
        
        
        const question: Question =
        {
            id: Math.floor(Math.random() * 9999),
            title: title.value,
            clarification: clarification.value,
            answer: answer.value,
            isValid: isValid
        }

        addQuestion(question)
    }

    useEffect(() => 
    {
        const isQuestionValied = title.isValid() && clarification.isValid() && answer.isValid();
        
        setValidity(isQuestionValied);
    }      
    ,[title, clarification, answer])

    return { 
        isValid,

        title: title,
        clarification: clarification,
        answer: answer,

        save: saveQuestion
    }
}

export default useQuestion;