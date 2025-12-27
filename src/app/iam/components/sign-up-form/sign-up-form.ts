import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  get isFormValid(): boolean {
    return !!this.username && !!this.password && !!this.confirmPassword && this.passwordsMatch;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      this.submitForm.emit({ username: this.username, password: this.password });
    }
  }
}
