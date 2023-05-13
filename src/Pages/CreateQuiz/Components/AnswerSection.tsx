import { useState, useEffect } from 'react';

import { Answer, MULTI_CHOICE, QuestionTypeLabel, YES_NO } from '../../../Types/questionTypes';

import Button from '../../../Components/Button';

import RadioInputs from '../../../Components/RadioInputs';

type Props = 
{
    style?:
    {
        container?: string,
        radio?: { container?: string, input?: string }
    },

    answer: YES_NO | MULTI_CHOICE,

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
            answer: YES_NO | MULTI_CHOICE, 
            questionType: QuestionTypeLabel,
            addAnswer?: () => void
}) =>
{

    const [canAddNewOption, setCanAddNewOption] = useState<boolean>(false);
    const [doesMeetMinimum, setMeetsMinimum] = useState<boolean>(true);

    const { answer, questionType } = props;

    useEffect(() => {

      if (typeof (answer as MULTI_CHOICE)?.canAddNewOption === "function") 
      {
        setCanAddNewOption((answer as MULTI_CHOICE).canAddNewOption())
      }

      if (typeof (answer as MULTI_CHOICE)?.doesMeetMinimum === "function") 
      {
        setMeetsMinimum((answer as MULTI_CHOICE).doesMeetMinimum())
      }
    }, [answer, answer.answers])
    

    

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
                    questionType === QuestionTypeLabel["multi-choice"]
                &&
                    <Button 
                        className="w-fit px-3 py-1 text-lg rounded-lg"
                        text={"+"}
                        isDisabled={!canAddNewOption}
                        onClick={addAnswer}
                    />
                }
            </div>

            {!doesMeetMinimum && <p>You must add at least 2 answers..</p>}
        </div>
    )
    
}
const AnswerSection = (props: Props) => 
{
    const { style, answer, onChange } = props;

    const questionType = answer.label;
    
    return (
        <div className={`${questionType === QuestionTypeLabel["yes-no"] && "flex"}  gap-3`}>
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

export default AnswerSection