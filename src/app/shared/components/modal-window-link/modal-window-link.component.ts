import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-modal-window-link',
  templateUrl: './modal-window-link.component.html',
  styleUrls: ['./modal-window-link.component.css']
})
export class ModalWindowComponent{
  @Input() isShowQRCode?: boolean = true;
  @Input() link!: string;
  
  @Output() protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private clipboardService: ClipboardService) {}
  
  copyContent() {
    this.clipboardService.copyFromContent(this.link);
    this.closeDialog();
  }

  protected closeDialog() {
    this.isOpen.emit(false);
  }
}
