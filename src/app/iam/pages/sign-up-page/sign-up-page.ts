import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SignUpForm } from '../../components/sign-up-form/sign-up-form';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  imports: [CommonModule, SignUpForm, RouterLink],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css',
})
export class SignUpPage {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignUp(credentials: { username: string; password: string }): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.authService.signUp(credentials.username, credentials.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Cuenta creada exitosamente. Redirigiendo al inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al crear la cuenta. El usuario podría ya existir.';
        console.error('Sign up error:', error);
      }
    });
  }
}
