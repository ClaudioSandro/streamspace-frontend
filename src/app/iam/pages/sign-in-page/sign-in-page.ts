import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SignInForm } from '../../components/sign-in-form/sign-in-form';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  imports: [CommonModule, SignInForm, RouterLink],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.css',
})
export class SignInPage {
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignIn(credentials: { username: string; password: string }): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.signIn(credentials.username, credentials.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error('Sign in error:', error);
      }
    });
  }
}
