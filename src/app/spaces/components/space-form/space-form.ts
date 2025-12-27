import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductionSpace, SpaceType } from '../../models/production-space.model';

export interface SpaceFormData {
  name: string;
  description: string;
  type: SpaceType;
  city: string;
  district: string;
  addressLine: string;
  hourlyRateAmount: number;
  hourlyRateCurrency: string;
  maxPeople: number;
  rules: string;
}

@Component({
  selector: 'app-space-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './space-form.html',
  styleUrl: './space-form.css',
})
export class SpaceForm implements OnInit {
  @Input() space: ProductionSpace | null = null;
  @Input() isEditMode: boolean = false;
  @Output() submitForm = new EventEmitter<SpaceFormData>();
  @Output() cancelForm = new EventEmitter<void>();

  formData: SpaceFormData = {
    name: '',
    description: '',
    type: 'PODCAST',
    city: '',
    district: '',
    addressLine: '',
    hourlyRateAmount: 0,
    hourlyRateCurrency: 'PEN',
    maxPeople: 1,
    rules: ''
  };

  spaceTypes: { value: SpaceType; label: string }[] = [
    { value: 'PODCAST', label: 'Podcast' },
    { value: 'STREAMING', label: 'Streaming' },
    { value: 'PHOTO_VIDEO', label: 'Foto/Video' }
  ];

  currencies: string[] = ['PEN', 'USD', 'EUR'];

  ngOnInit(): void {
    if (this.space && this.isEditMode) {
      this.formData = {
        name: this.space.name,
        description: this.space.description,
        type: this.space.type,
        city: this.space.city,
        district: this.space.district,
        addressLine: this.space.addressLine,
        hourlyRateAmount: this.space.hourlyRateAmount,
        hourlyRateCurrency: this.space.hourlyRateCurrency,
        maxPeople: this.space.maxPeople,
        rules: this.space.rules
      };
    }
  }

  get isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.description &&
      this.formData.type &&
      this.formData.city &&
      this.formData.district &&
      this.formData.addressLine &&
      this.formData.hourlyRateAmount > 0 &&
      this.formData.maxPeople > 0
    );
  }

  onSubmit(): void {
    if (this.isFormValid) {
      this.submitForm.emit(this.formData);
    }
  }

  onCancel(): void {
    this.cancelForm.emit();
  }
}
