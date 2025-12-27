import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { AuthService } from '../../../iam/services/auth.service';
import { SpaceForm, SpaceFormData } from '../../components/space-form/space-form';
import { CreateSpaceRequest } from '../../models/create-space-request.model';

@Component({
  selector: 'app-space-create-page',
  imports: [CommonModule, SpaceForm],
  templateUrl: './space-create-page.html',
  styleUrl: './space-create-page.css',
})
export class SpaceCreatePage {
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private spacesService: SpacesService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(formData: SpaceFormData): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.errorMessage = 'Debes iniciar sesión para crear un espacio';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: CreateSpaceRequest = {
      ownerId: userId,
      ...formData
    };

    this.spacesService.create(request).subscribe({
      next: (space) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/spaces', space.id]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al crear el espacio. Intenta nuevamente.';
        this.cdr.detectChanges();
        console.error('Error creating space:', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/spaces']);
  }
}
