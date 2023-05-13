import { useState, useEffect } from "react";

import { CompositionValue } from "../Types/questionTypes";

import { Question, QuestionTypeLabel, AnswerType, Answer } from "../Types/questionTypes";

import { YES_NO, MULTI_CHOICE, OPEN_ENDED, questionTypesObj } from "../Types/questionTypes";

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
    const [answer, setAnswer] = useState<AnswerType>(new YES_NO());

    const changeType = (type: QuestionTypeLabel) =>
    {
        let newType: AnswerType = new YES_NO();

        if (type === QuestionTypeLabel['multi-choice']) 
        {
            newType = new MULTI_CHOICE()
        }
        else if (type === QuestionTypeLabel["open-ended"])
        {
            newType = new OPEN_ENDED()
        }

        setAnswer(newType)
    }

    const selectCorrectOption = (questionLabelType: QuestionTypeLabel | undefined, correctAnswerID: number) =>
    {
        if (questionLabelType === QuestionTypeLabel['yes-no'] || questionLabelType === QuestionTypeLabel["multi-choice"]) 
        {
            const newAnswer = { ...answer } as (YES_NO | MULTI_CHOICE);
                
            newAnswer.correctAnswerID = correctAnswerID
    
            setAnswer(newAnswer)
        }
    }

    const addOption = () =>
    {
        if (answer.label === questionTypesObj["multi choice"].label) 
        {
            const copyAnswer = { ...answer } as MULTI_CHOICE;

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
        if (answer.label === questionTypesObj["multi choice"].label) 
        {
            const copyAnswer = { ...answer } as MULTI_CHOICE;

            copyAnswer.answers[index] = newAnswer

            setAnswer(copyAnswer);
        }
    }

    const deleteOption = (index: number) =>
    {
        if (answer.label === questionTypesObj["multi choice"].label) 
        {
            const newAnswer = { ...answer } as MULTI_CHOICE;

            const chosenAnswer = newAnswer.answers[index];

            newAnswer.answers.splice(index, 1);

            if (chosenAnswer?.id === newAnswer.correctAnswerID) 
            {
                newAnswer.correctAnswerID = null
            }

            setAnswer(newAnswer);
        }
    }

    const isValid = () =>
    {
        let arePossibleAnswersValid = false;

        if (answer?.label === QuestionTypeLabel['yes-no']) 
        {            
            arePossibleAnswersValid = true
        }
        else if (answer?.label === QuestionTypeLabel["multi-choice"])
        {
            const multi_choice_answer = (answer as MULTI_CHOICE);

            const allAnswersValid = !(multi_choice_answer.answers.some(answer => !answer?.composition.isValid));
            const isSelectedAnswerValid = multi_choice_answer?.correctAnswerID !== null;
            const meetsMinimumAmount = multi_choice_answer.doesMeetMinimum();

            arePossibleAnswersValid = allAnswersValid && isSelectedAnswerValid && meetsMinimumAmount
        }
        else if (answer?.label === QuestionTypeLabel["open-ended"])
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