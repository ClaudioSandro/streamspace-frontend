import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { EquipmentService } from '../../services/equipment.service';
import { AuthService } from '../../../iam/services/auth.service';
import { ProductionSpace } from '../../models/production-space.model';
import { Equipment } from '../../models/equipment.model';
import { EquipmentList } from '../../components/equipment-list/equipment-list';
import { EquipmentFormData } from '../../components/equipment-form/equipment-form';

@Component({
  selector: 'app-space-detail-page',
  imports: [CommonModule, RouterLink, EquipmentList],
  templateUrl: './space-detail-page.html',
  styleUrl: './space-detail-page.css',
})
export class SpaceDetailPage implements OnInit {
  space: ProductionSpace | null = null;
  equipmentList: Equipment[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacesService: SpacesService,
    private equipmentService: EquipmentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const spaceId = Number(this.route.snapshot.paramMap.get('id'));
    if (spaceId) {
      this.loadSpace(spaceId);
      this.loadEquipment(spaceId);
    }
  }

  loadSpace(spaceId: number): void {
    this.spacesService.getById(spaceId).subscribe({
      next: (space) => {
        this.space = space;
        this.isLoading = false;
        const userId = this.authService.getCurrentUserId();
        this.isOwner = userId === space.ownerId;
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

  loadEquipment(spaceId: number): void {
    this.equipmentService.getBySpaceId(spaceId).subscribe({
      next: (equipment) => {
        this.equipmentList = equipment;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading equipment:', error);
      }
    });
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'PODCAST': 'Podcast',
      'STREAMING': 'Streaming',
      'PHOTO_VIDEO': 'Foto/Video'
    };
    return labels[type] || type;
  }

  onAddEquipment(data: EquipmentFormData): void {
    if (!this.space) return;
    
    this.equipmentService.create(this.space.id, data).subscribe({
      next: (equipment) => {
        this.equipmentList = [...this.equipmentList, equipment];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error adding equipment:', error);
      }
    });
  }

  onUpdateEquipment(event: { equipment: Equipment; data: EquipmentFormData }): void {
    if (!this.space) return;
    
    this.equipmentService.update(this.space.id, event.equipment.id, event.data).subscribe({
      next: (updated) => {
        this.equipmentList = this.equipmentList.map(e => 
          e.id === updated.id ? updated : e
        );
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error updating equipment:', error);
      }
    });
  }

  onDeleteEquipment(equipment: Equipment): void {
    if (!this.space) return;
    
    this.equipmentService.delete(this.space.id, equipment.id).subscribe({
      next: () => {
        this.equipmentList = this.equipmentList.filter(e => e.id !== equipment.id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error deleting equipment:', error);
      }
    });
  }

  deleteSpace(): void {
    if (!this.space) return;
    
    if (confirm('¿Estás seguro de eliminar este espacio? Esta acción no se puede deshacer.')) {
      this.spacesService.delete(this.space.id).subscribe({
        next: () => {
          this.router.navigate(['/spaces']);
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el espacio';
          this.cdr.detectChanges();
          console.error('Error deleting space:', error);
        }
      });
    }
  }
}
