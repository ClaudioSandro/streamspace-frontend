import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductionSpace } from '../../models/production-space.model';

@Component({
  selector: 'app-space-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './space-card.html',
  styleUrl: './space-card.css',
})
export class SpaceCard {
  @Input({ required: true }) space!: ProductionSpace;

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'PODCAST': 'Podcast',
      'STREAMING': 'Streaming',
      'PHOTO_VIDEO': 'Foto/Video'
    };
    return labels[type] || type;
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase().replace('_', '-')}`;
  }
}
