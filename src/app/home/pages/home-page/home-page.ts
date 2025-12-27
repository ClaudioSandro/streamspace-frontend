import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../iam/services/auth.service';
import { AuthenticatedUser } from '../../../iam/models/authenticated-user.model';
import { SpacesService } from '../../../spaces/services/spaces.service';
import { ProductionSpace } from '../../../spaces/models/production-space.model';
import { SpaceCard } from '../../../spaces/components/space-card/space-card';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterLink, SpaceCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  currentUser: AuthenticatedUser | null = null;
  recentSpaces: ProductionSpace[] = [];
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private spacesService: SpacesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    console.log('[HomePage] ngOnInit called');
    this.loadRecentSpaces();
  }

  loadRecentSpaces(): void {
    console.log('[HomePage] loadRecentSpaces() - Starting...');
    
    this.spacesService.getAll().subscribe({
      next: (spaces) => {
        console.log('[HomePage] SUCCESS - Spaces received:', spaces);
        this.recentSpaces = Array.isArray(spaces) ? spaces.slice(0, 6) : [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('[HomePage] ERROR:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }
}

