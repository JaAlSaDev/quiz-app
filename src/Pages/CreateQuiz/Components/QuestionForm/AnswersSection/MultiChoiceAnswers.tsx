import { useState, useEffect } from 'react';

import { Answer, BooleanAnswer, GenericAnswer, MultiChoiceAnswer, QuestionTypeLabel } from '../../../../../Types/questionTypes';

import Button from '../../../../../Components/Button';

import RadioInputs from '../../../../../Components/InputFields/RadioInputs';

type Props = 
{
    style?:
    {
        container?: string,
        radio?: { container?: string, input?: string }
    },

    answer: GenericAnswer,

    onChange: (correctAnswer: number) => void,

    multiChoiceFunctions?:
    {
        addAnswer: () => void,
        deleteAnswer: (index: number) => void
        editAnswer: (index: number, answer: Answer) => void
    }
}

const Header = (props: 
        {
            answer: GenericAnswer, 
            questionType: QuestionTypeLabel,
            addAnswer?: () => void
}) =>
{

    const [canAddNewOption, setCanAddNewOption] = useState<boolean>(false);
    const [doesMeetMinimum, setMeetsMinimum] = useState<boolean>(true);

    const { answer, questionType } = props;

    useEffect(() => 
    {
        const isAnswerMultiChoice = answer.label === QuestionTypeLabel.multi_choice;

        if (isAnswerMultiChoice) 
        {
            setCanAddNewOption((answer as MultiChoiceAnswer)?.canAddNewOption())
            setMeetsMinimum((answer as MultiChoiceAnswer)?.doesMeetMinimum())
        }
    }, [answer])
    
    const addAnswer = () =>
    {
        if (props?.addAnswer) 
        {
            props.addAnswer()
        }
    }
    
    return (
        <div>
            <div className={`flex justify-between items-center`}>
                <p className='text-lg font-bold'>Possible Answers: </p>

                {
                    answer.label === QuestionTypeLabel.multi_choice
                &&
                    <Button 
                        className="w-fit px-3 py-1 text-lg rounded-lg"
                        text={"+"}
                        isDisabled={!canAddNewOption}
                        onClick={addAnswer}
                    />
                }
            </div>

            {!doesMeetMinimum && answer.label === QuestionTypeLabel.multi_choice && <p>You must add at least 2 answers..</p>}
        </div>
    )
    
}

const MultiChoiceAnswers = (props: Props) => 
{
    const { style, answer, onChange } = props;

    const questionType = answer.label;
        
    return (
        <div className={`${answer.label === QuestionTypeLabel.yes_no && "flex"}  gap-3`}>
            <Header 
                answer={answer}
                questionType={questionType}
                addAnswer={props?.multiChoiceFunctions?.addAnswer}
            />

            <RadioInputs 
                style={style}
                answer={answer}

                onChange={onChange}

                editAnswer={props?.multiChoiceFunctions?.editAnswer}
                deleteAnswer={props?.multiChoiceFunctions?.deleteAnswer}
            />
        </div>
    )
}

export default MultiChoiceAnswers