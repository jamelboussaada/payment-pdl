import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Add this import

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //showRegisterForm = signal<boolean>(false);
isRegisterView = false;
http = inject(HttpClient);
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
  debugger;
  this.http.post("https//:", this.customerObj).subscribe((res:any)=> {
    debugger;
    if(res.result){
      alert("Customer Registered Successfully")
    }else{
      alert(res.message)
    }
  }, error => {
    alert("Network Error")
  })
}

//login api
onLogin(){
  debugger;
  const formValue = this.loginForm.value;
  this.http.post("https//:", formValue).subscribe((res:any)=> {
    debugger;
    if(res.result){
      sessionStorage.setItem("ecommerceUser", JSON.stringify(res.data));
      this.router.navigateByUrl("home-page");

    }else{
      alert(res.message)
    }

  }, error => {
    alert("Network Error")

  })
}

}
