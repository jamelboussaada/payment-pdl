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
  customerObj: any ={
    "name": "",
    "lastName": "",
    "email": "",
    "password" : "",
    "address" :  "",
    "phone" : ""
  }

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  })

  changeView() {
    this.isRegisterView = !this.isRegisterView;
  }

  showRegisterForm() {
    return this.isRegisterView;
  }
  onRegister(){
    this.authService.signup(this.customerObj).subscribe((res:any)=> {
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
    debugger;
    const formValue = this.loginForm.value;
    this.authService.signin(formValue).subscribe((res:any)=> {
      debugger;
      if(res.result){
        sessionStorage.setItem("ecommerceUser", JSON.stringify({"token": res.data}));
        this.router.navigateByUrl("home-page");

      }else{
        alert(res.message)
      }

    }, error => {
      alert("Network Error")

    })
  }

}
