/* 
    Most of these types/enums could be renamed, simplified, and refactored.
*/ 


export type CompositionValue = { value: string, isValid: boolean }

export enum QuestionTypeLabel
{
    "yes_no" = "yes-no",
    "multi_choice" = "multi choice", 
    "open_ended" ="open ended"
}

export type Answer =  { id: number, composition: CompositionValue } 

const yes : Answer = 
{
    id: 0,
    composition: { value: "yes", isValid: true }
}

const no : Answer = 
{
    id: 1,
    composition: { value: "no", isValid: true }
}

const booleanAnswers =  { "yes": yes, "no": no }

export type multi_choice_option = Answer


export class BooleanAnswer 
{
    label: QuestionTypeLabel = QuestionTypeLabel.yes_no;
    correctAnswerID: number = booleanAnswers["no"].id;
    answers: Answer[] = [yes, no];
}


export class MultiChoiceAnswer 
{
    private static readonly ANSWER_SIZE: { min: number, max: number } = { min: 2, max: 4 };

    label: QuestionTypeLabel = QuestionTypeLabel.multi_choice;
    correctAnswerID: number = -1;
    answers: Answer[] = [];

    doesMeetMinimum = (): boolean =>
    {
        const answers = this.answers;
        const { min } = MultiChoiceAnswer.ANSWER_SIZE

        return min <= answers.length
    };

    canAddNewOption = (): boolean =>
    {
        const answers = this.answers;
        const { max } = MultiChoiceAnswer.ANSWER_SIZE
        
        return answers.length < max
    };
}


export class OpenEndedAnswer
{
    label: QuestionTypeLabel = QuestionTypeLabel.open_ended;
    correctAnswerID: number = -1;
    readonly answers: Answer[] = [];
}

// export class YES_NO 
// {
//     readonly label: QuestionTypeLabel = QuestionTypeLabel["yes-no"];
//     correctAnswerID: number = booleanAnswers.no?.id;
//     readonly answers: Answer[] = [yes, no]
// }

// export class MULTI_CHOICE
// {
//     readonly label: QuestionTypeLabel = QuestionTypeLabel["multi-choice"];
//     readonly answersSize: { min: number, max: number } = { min: 2, max: 4 }

//     correctAnswerID: number | null = null;
//     answers: Answer[] = [];

//     doesMeetMinimum = (): boolean =>
//     {
//         const answers = this.answers;
//         const { min } = this.answersSize

//         return min <= answers.length
//     };

//     canAddNewOption = (): boolean =>
//     {
//         const answers = this.answers;
//         const { max } = this.answersSize
        
//         return answers.length < max
//     };
// }

// export class OPEN_ENDED 
// { 
//     readonly label: QuestionTypeLabel = QuestionTypeLabel["open-ended"];
//     readonly answers: Answer[] = [];
// } 

export type GenericAnswer = BooleanAnswer | MultiChoiceAnswer | OpenEndedAnswer;

export type Question =
{
    id: number;
    isValid: boolean

    title: CompositionValue,
    clarification?: CompositionValue,

    answer?: GenericAnswer,   
}

export const typesArray = Object.values(QuestionTypeLabel);

export const questionTypesObj: { [label in QuestionTypeLabel]: GenericAnswer } =
{
    "yes-no": new BooleanAnswer(),
    "multi choice": new MultiChoiceAnswer(),
    "open ended": new OpenEndedAnswer()
}