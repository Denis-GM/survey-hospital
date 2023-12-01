export class SurveyBase<T> {
    id!: string | T;
    name?: string;
    description?: string;
    questions!: QuestionBase<T>[];
    creationTime?: string;
    adminId!: string;
    // constructor() { }
}

export class QuestionBase<T> {
    id!: string | T; 
    title!: string; 
    type!: number; 
    isRequired!: boolean;
    options!: OptionBase<T>[];
}

export class OptionBase<T> {
    id!: string | T; 
    answer!: string;
}