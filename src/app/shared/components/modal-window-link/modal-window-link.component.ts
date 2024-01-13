import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { ClipboardService } from 'ngx-clipboard';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-modal-window-link',
  templateUrl: './modal-window-link.component.html',
  styleUrls: ['./modal-window-link.component.css']
})
export class ModalWindowComponent{
    @Input() isShowQRCode?: boolean = true;
    @Input() isPatient?: boolean = false;
    @Input() link!: string;
    @Input() isMobile?: boolean = false;
    
    @Output() protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private clipboardService: ClipboardService,
        @Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}
    
    copyContent() {
        this.clipboardService.copyFromContent(this.link);
        this.alerts
            .open('<div>Ссылка скопирована</div>', {label: 'Уведомление'})
            .subscribe()
        this.closeDialog();
    }

    protected closeDialog() {
        this.isOpen.emit(false);
    }
}
