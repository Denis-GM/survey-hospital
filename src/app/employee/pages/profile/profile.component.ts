import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { AccessKeyService } from 'src/app/core/api/access-key.service';
import { AccountService } from 'src/app/core/api/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  protected role: number;
  protected account: any = {};
  protected inputElementAdmin!: any | null;
  protected inputElementAnalyst!: any | null;
  protected editingMode: boolean = false;

  protected accessKey: any = {};
  protected message: string = 'Ключ действителен'
  protected accessKeyControl: FormControl = new FormControl({value: '', disabled: false});

  constructor(private accountService: AccountService, private accsessKeyService: AccessKeyService,
    private clipboardService: ClipboardService) {
    this.role = (localStorage.getItem('role') || 3) as number;
  }

  ngOnInit(): void {
    this.getAccount();
    if(this.role != 3){
      this.getAccessKey();
      this.accessKeyControl.disable();
    }
  }

  getAccount() {
    this.accountService.getAccount().subscribe(
      (data: any) => {
        this.account = data;
        console.log(this.account);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getAccessKey() {
    this.accsessKeyService.getAccessKey().subscribe(
      (data: any) => {
        this.accessKey = data;
        console.log(data);
        this.accessKeyControl.setValue(data.key);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  editKeyAccess() {
    this.inputElementAdmin = document.getElementById('keyAccessAdmin');
    this.inputElementAnalyst = document.getElementById('keyAccessAnalyst');
    this.accessKeyControl.enable();
    this.editingMode = true;
    this.message = 'Введите ключ доступа в поле ввода';
    this.inputElementAdmin.style.border = '2px solid #526ED3';
  }

  saveKeyAccess() {
    this.accessKeyControl.disable();
    if(this.accessKeyControl.value){
      this.accsessKeyService.editAccessKey(this.accessKeyControl.value).subscribe(
        (data: any) => {
          this.accessKey = data;
          this.getAccessKey();
        },
        (error: any) => {
          console.log(error);
          this.getAccessKey();
        }
      )
      this.undoEdits();
    }
  }

  undoEdits() {
    this.editingMode = false;
    this.inputElementAdmin.style.border = 'none';
    this.accessKeyControl.disable();
  }

  copyContent() {
    this.clipboardService.copyFromContent(this.accessKeyControl.value);
  }

  // f0766e15-725f-4e06-9682-b4a50e3c0fd5
  addKeyAccess() {
    const res = {key: this.accessKeyControl.value} 
    this.accsessKeyService.addAccessKeyАnalyst(res).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteAccount() {
    if (window.confirm("Вы действительно хотите удалить учетную запись?")) {
      if (window.confirm("Учетная запись будет удалена безвозвратно. Вы уверены в своем выборе?")){
        this.accountService.deleteAccount().subscribe(
          (data: any) => {
            console.log(data);
            this.accountService.logout();
          },
          (error: any) => {
            console.log(error);
          }
        )
      }
    }
  }
}
