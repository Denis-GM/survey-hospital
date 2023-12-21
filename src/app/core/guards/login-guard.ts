import {inject} from "@angular/core";
import { AccountService } from "../api/account.service";
// import {AuthService} from "./auth.service";
 
export const loginGuard = () => {
  let isLoggedIn: boolean = false;
  const authService = inject(AccountService);
  authService.getAccount().subscribe(
    (data: any) => {
        isLoggedIn = true;
    },
    (err: any) => {
        isLoggedIn = false;
    }
  )
  return isLoggedIn;
};