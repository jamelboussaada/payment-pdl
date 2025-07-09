import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null; // To hold the reset token from the URL
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // In a real application, you would extract the token from the URL
    // For example: this.token = this.route.snapshot.queryParamMap.get('token');
    // Or from a path parameter if your route was defined as 'reset-password/:token'
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('Reset password token:', this.token);

    if (!this.token) {
      // Handle case where token is missing, e.g., redirect to an error page or forgot password
      console.error('Password reset token is missing.');
      this.errorMessage = 'Password reset token is missing or invalid.';
      // this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.isLoading = false;
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      this.isLoading = false;
      return;
    }

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      if (this.token && this.password === 'newpassword') { // Simulate success for a specific password
        this.successMessage = 'Password has been reset successfully!';
        // this.router.navigate(['/login']); // Redirect to login after successful reset
      } else {
        this.errorMessage = 'Failed to reset password. Please try again.';
      }
    }, 2000);
  }
}
