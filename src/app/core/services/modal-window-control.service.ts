import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowControlService implements OnInit{
  public idSurvey: string = "0";
  // public isOpen: boolean = false;
  private myevent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.myevent.emit(false);
  }

  emitStateModalWindowLink(value: boolean, id?: string) {
    this.idSurvey = id ? id : "0";
    this.myevent.emit(value);
  }

  getStateModalWindow() {
    return this.myevent;
  }
}
