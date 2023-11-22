export interface ISurvey {
  title: string,
  description: string | null,
  questions: []
}

export interface IQuestion {
  type: TypesQuestion,
  questionText: string,
  options: [],
  isRequired: boolean
}

export enum TypesQuestion {
  OnlyAnswer = "Oдин ответ",
  MultipleAnswer = "Множественный ответ",
  Scale = "Выбор в диапазоне",
  OwnAnswer = "Вписать ответ"
}
