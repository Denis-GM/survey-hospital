export interface ISurvey {
  name: string,
  description: string,
  questions: IQuestion[]
}

export interface ISurveyGet {
  id: string,
  name: string,
  description: string,
  questions: IQuestion[]
}

export interface IQuestion {
  title: string,
  type: number,
  number: number,
  isRequired: boolean,
  answerOptions: IAnswerOptions[],
}

export interface IAnswerOptions {
  answer: string
}