import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css',
})
export class SignInForm {
  username: string = '';
  password: string = '';
  
  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();

  onSubmit(): void {
    if (this.username && this.password) {
      this.submitForm.emit({ username: this.username, password: this.password });
    }
  }
}
