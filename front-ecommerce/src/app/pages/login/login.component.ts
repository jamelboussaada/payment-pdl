import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //showRegisterForm = signal<boolean>(false);
  isRegisterView = false;
  authService = inject(AuthService);
  router = inject(Router);

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
        console.log("Customer Registered Successfully")
      }else{
        console.log(res.message)
      }
    }, error => {
      console.log("Network Error")
    })
  }

  //login api
  onLogin(){

    const formValue = this.loginForm.value;
    this.authService.signin(formValue).subscribe((res:any)=> {
      alert('login success')
      console.log(res)
      if(res){
        sessionStorage.setItem("ecommerceUser", JSON.stringify({"token": res}));
        this.router.navigateByUrl("home");

      }else{
        console.log(res)
      }

    }, error => {
      console.log("Network Error")

    })
  }

}
