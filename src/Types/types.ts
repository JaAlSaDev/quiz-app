export type ValidationRule =
{
    checkValidity: (value: string) => boolean,
    errorMessage: string
}

export type InputFieldStyle =
{
    container?: string,
    label?: string,
    input?: string,
    underline?: string 
}

export type CompositionValue =
{
    value: string,
    isValid: boolean
}

export type yes_no = { yes: "yes", no: "no" };

export class YES_NO 
{
    readonly label: string = "yes-no";
    correctAnswer: "yes" | "no" = "no";
    readonly answers: yes_no = { yes: "yes", no: "no" }
}

export class MULTI_CHOICE
{
    readonly label: string = "multi choice";
    correctAnswer: number = 0;
    answers: { [index: number]: CompositionValue } = {}
}

export class OPEN_ENDED 
{ 
    readonly label: string = "open ended";
    answers: string = "" ;
} 

export type QuestionType = YES_NO | MULTI_CHOICE | OPEN_ENDED

export type Question =
{
    title: CompositionValue,
    clarification?: CompositionValue,
    type?: QuestionType
}