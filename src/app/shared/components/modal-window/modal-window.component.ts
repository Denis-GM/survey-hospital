import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit{
  error ='';
  @Output() protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private mwControl: ModalWindowControlService) {
    this.getStateModalWindow();
  }

  ngOnInit(): void {

  }

  getStateModalWindow() {
    this.mwControl.getStateModalWindow().subscribe(
      (data: boolean) => {
        this.isOpen.emit(data);
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  protected closeDialog() {
    this.isOpen.emit(false);
  }
}
