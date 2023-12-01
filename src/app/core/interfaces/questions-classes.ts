import { QuestionBase } from './question-base';

export class QuestionTextbox extends QuestionBase<string> {
  override controlType = 'textbox';
}

export class QuestionCheckbox extends QuestionBase<string> {
    override controlType = 'checkbox';
}

export class QuestionRadio extends QuestionBase<string> {
  override controlType = 'radio';
}

export class QuestionScale extends QuestionBase<string> {
  override controlType = 'scale';
}