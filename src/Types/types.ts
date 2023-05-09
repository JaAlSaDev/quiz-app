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