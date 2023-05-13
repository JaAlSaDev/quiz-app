/* 
    Most of these types/enums could be renamed, simplified, and refactored.
*/ 


export type CompositionValue = { value: string, isValid: boolean }

export enum QuestionTypeLabel
{
    "yes-no" = "yes-no",
    "multi-choice" = "multi choice", 
    "open-ended" ="open ended"
}

export type Answer = null | { id: number, composition: CompositionValue } 

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

export type multi_choice_option = Answer

export class YES_NO 
{
    readonly label: QuestionTypeLabel = QuestionTypeLabel["yes-no"];
    correctAnswerID: number | null = no?.id as number;
    readonly answers: Answer[] = [yes, no]
}

export class MULTI_CHOICE
{
    readonly label: QuestionTypeLabel = QuestionTypeLabel["multi-choice"];
    readonly answersSize: { min: number, max: number } = { min: 2, max: 4 }

    correctAnswerID: number | null = null;
    answers: Answer[] = [];

    doesMeetMinimum = (): boolean =>
    {
        const answers = this.answers;
        const { min } = this.answersSize

        return min <= answers.length
    };

    canAddNewOption = (): boolean =>
    {
        const answers = this.answers;
        const { max } = this.answersSize
        
        return answers.length < max
    };
}

export class OPEN_ENDED 
{ 
    readonly label: QuestionTypeLabel = QuestionTypeLabel["open-ended"];
    answers: Answer = null;
} 

export type AnswerType = YES_NO | MULTI_CHOICE | OPEN_ENDED

export type Question =
{
    isValid: boolean

    title: CompositionValue,
    clarification?: CompositionValue,
    answer?: AnswerType,   
}

export const typesArray = Object.values(QuestionTypeLabel);

export const questionTypesObj: { [label in QuestionTypeLabel]: AnswerType } =
{
    "yes-no": new YES_NO(),
    "multi choice": new MULTI_CHOICE(),
    "open ended": new OPEN_ENDED()
}