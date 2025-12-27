import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { ProductionSpace } from '../../models/production-space.model';
import { UpdateSpaceRequest } from '../../models/update-space-request.model';
import { SpaceForm, SpaceFormData } from '../../components/space-form/space-form';

@Component({
  selector: 'app-space-edit-page',
  imports: [CommonModule, SpaceForm],
  templateUrl: './space-edit-page.html',
  styleUrl: './space-edit-page.css',
})
export class SpaceEditPage implements OnInit {
  space: ProductionSpace | null = null;
  isLoading: boolean = true;
  isSaving: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacesService: SpacesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const spaceId = Number(this.route.snapshot.paramMap.get('id'));
    if (spaceId) {
      this.loadSpace(spaceId);
    }
  }

  loadSpace(spaceId: number): void {
    this.spacesService.getById(spaceId).subscribe({
      next: (space) => {
        this.space = space;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el espacio';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error loading space:', error);
      }
    });
  }

  onSubmit(formData: SpaceFormData): void {
    if (!this.space) return;

    this.isSaving = true;
    this.errorMessage = '';

    const request: UpdateSpaceRequest = { ...formData };

    this.spacesService.update(this.space.id, request).subscribe({
      next: (updated) => {
        this.isSaving = false;
        this.cdr.detectChanges();
        this.router.navigate(['/spaces', updated.id]);
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage = 'Error al actualizar el espacio. Intenta nuevamente.';
        this.cdr.detectChanges();
        console.error('Error updating space:', error);
      }
    });
  }

  onCancel(): void {
    if (this.space) {
      this.router.navigate(['/spaces', this.space.id]);
    } else {
      this.router.navigate(['/spaces']);
    }
  }
}
