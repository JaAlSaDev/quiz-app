import { Answer } from '../../../Types/questionTypes';

import RadioInputs from '../../../Components/RadioInputs';

type Props = 
{
    style?:
    {
        container?: string,
        radio?:
        {
            container?: string,
            input?: string
        }
    },

    correctAnswer: Answer,
    possibleAnswers: Answer[],
    onChange: (correctAnswer: Answer) => void
}

const AnswerSection = (props: Props) => 
{
    const { style, correctAnswer, possibleAnswers, onChange } = props;

    const changeValue = (newCorrectAnswer: Answer) =>
    {
        onChange(newCorrectAnswer as Answer)
    }

    return (
        <div className='flex gap-3'>
            <p className='text-lg font-bold'>Possible Answers: </p>

            <RadioInputs 
                style={style}
                possibleAnswers={possibleAnswers}
                correctAnswer={correctAnswer}
                onChange={changeValue}
            />
        </div>
    )
}

export default AnswerSection