import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //showRegisterForm = signal<boolean>(false);
  isRegisterView = false;
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  //api
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    address: new FormControl(""),
    phone: new FormControl("")
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  changeView() {
    this.isRegisterView = !this.isRegisterView;
  }

  showRegisterForm() {
    return this.isRegisterView;
  }
  onRegister(){
    this.authService.signup(this.registerForm.value).subscribe((res:any)=> {
      if(res.result){
        this.snackBar.open("Customer Registered Successfully", "Close", { 
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackbar']
        });
      }else{
        this.snackBar.open(res.message, "Close", { 
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });
      }
    }, error => {
      this.snackBar.open("Network Error", "Close", { 
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
    })
  }

  //login api
  onLogin(){

    const formValue = this.loginForm.value;
    this.authService.signin(formValue).subscribe((res:any)=> {
      if(res){
        this.snackBar.open("Login Success", "Close", { 
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackbar']
        });
        sessionStorage.setItem("ecommerceUser", JSON.stringify(res));
        this.router.navigateByUrl("home");

      }else{
        this.snackBar.open("Invalid Credentials", "Close", { 
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });
      }

    }, error => {
      this.snackBar.open("Network Error", "Close", { 
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });

    })
  }

}
