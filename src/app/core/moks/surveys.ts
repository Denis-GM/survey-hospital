import { QuestionBase, SurveyBase } from "../interfaces/question-base";

export const Surveys: SurveyBase<string>[] = [
  {
    id: "1",
    name: "Название опроса №1",
    description: "Описание",
    questions: [
      {
        id: "1",
        title: "Вопрос №1",
        type: 0,
        isRequired: true,
        options: [ 
          { id: "1", answer: "1" },
          { id: "2", answer: "2" },
          { id: "3", answer: "3" },
          { id: "4", answer: "4" }
        ]
      },
      {
        id: "2",
        title: "Вопрос №2",
        type: 1,
        isRequired: true,
        options: [ 
          { id: "5", answer: "1" },
          { id: "6", answer: "2" },
          { id: "7", answer: "3" },
          { id: "8", answer: "4" },
          { id: "9", answer: "5" },
        ]
      },
      {
        id: "3",
        title: "Вопрос №3",
        type: 0,
        isRequired: false,
        options: [ 
          { id: "10", answer: "3" },
          { id: "11", answer: "4" },
          { id: "12", answer: "5" },
        ]
      },
      {
        id: "4",
        title: "Вопрос №4",
        type: 2,
        isRequired: true,
        options: [ ]
      },
      {
        id: "5",
        title: "Вопрос №5",
        type: 3,
        isRequired: true,
        options: [ ]
      }
    ],
    creationTime: "2023-12-01T16:36:35.214Z",
    adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  {
    id: "2",
    name: "Название опроса №2",
    description: "Описание",
    questions: [
      {
        id: "1",
        title: "Вопрос №1",
        type: 0,
        isRequired: true,
        options: [ 
          { id: "1", answer: "1" },
          { id: "2", answer: "2" },
          { id: "3", answer: "3" },
          { id: "4", answer: "4" }
        ]
      },
      {
        id: "2",
        title: "Вопрос №2",
        type: 1,
        isRequired: true,
        options: [ 
          { id: "5", answer: "1" },
          { id: "6", answer: "2" },
          { id: "7", answer: "3" },
          { id: "8", answer: "4" },
          { id: "9", answer: "5" },
        ]
      },
      {
        id: "5",
        title: "Вопрос №5",
        type: 3,
        isRequired: true,
        options: [ ]
      }
    ],
    creationTime: "2023-12-01T16:36:35.214Z",
    adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  {
    id: "3",
    name: "Название опроса №3",
    description: "Описание",
    questions: [
      {
        id: "1",
        title: "Вопрос №1",
        type: 0,
        isRequired: true,
        options: [ 
          { id: "1", answer: "1" },
          { id: "2", answer: "2" },
          { id: "3", answer: "3" },
          { id: "4", answer: "4" }
        ]
      },
      {
        id: "2",
        title: "Вопрос №2",
        type: 1,
        isRequired: true,
        options: [ 
          { id: "5", answer: "1" },
          { id: "6", answer: "2" },
          { id: "7", answer: "3" },
          { id: "8", answer: "4" },
          { id: "9", answer: "5" },
        ]
      }
    ],
    creationTime: "2023-12-01T16:36:35.214Z",
    adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
];