import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { ProductionSpace } from '../../models/production-space.model';
import { SpaceCard } from '../../components/space-card/space-card';

@Component({
  selector: 'app-space-list-page',
  imports: [CommonModule, RouterLink, SpaceCard],
  templateUrl: './space-list-page.html',
  styleUrl: './space-list-page.css',
})
export class SpaceListPage implements OnInit {
  spaces: ProductionSpace[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private spacesService: SpacesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSpaces();
  }

  loadSpaces(): void {
    this.isLoading = true;
    this.spacesService.getAll().subscribe({
      next: (spaces) => {
        console.log('[SpaceListPage] Spaces received:', spaces);
        this.spaces = Array.isArray(spaces) ? spaces : [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('[SpaceListPage] Error loading spaces:', error);
        this.errorMessage = 'Error al cargar los espacios';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
