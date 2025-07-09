import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor() { }

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      if (this.email === 'test@example.com') { // Simulate success for a specific email
        this.successMessage = 'A password reset link has been sent to your email address.';
      } else {
        this.errorMessage = 'Could not find an account with that email address.';
      }
    }, 2000);
  }
}
