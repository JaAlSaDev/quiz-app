import MultiChoiceAnswers from "./MultiChoiceAnswers"

import { QuestionTypeLabel, Answer, BooleanAnswer, MultiChoiceAnswer, GenericAnswer } from "../../../../../Types/questionTypes"


const Answers = (props: 
    { 
        answer: BooleanAnswer | MultiChoiceAnswer, 
        options:
        {
            select: (correctAnswerID: number) => void,
            add: () => void,
            delete: (index: number) => void,
            edit: (index: number, newAnswer: Answer) => void
        }
        questionLabelType: (QuestionTypeLabel) 
    }) =>
{
    const { answer, options,  questionLabelType } = props;

    const isChoiceQuestion = answer.label === QuestionTypeLabel.yes_no || answer.label === QuestionTypeLabel.multi_choice

    
    if (!isChoiceQuestion) 
    {
        return <></>
    }
    return (
            <MultiChoiceAnswers 
                style={{ container: "flex w-fit gap-3", radio: { container: "gap-3" }}}
                answer={answer}

                onChange={options.select}
                multiChoiceFunctions= 
                {
                    {
                        addAnswer: options.add,
                        deleteAnswer: options.delete,
                        editAnswer: options.edit
                    }
                }
            />
    )    
    
}

export default Answers