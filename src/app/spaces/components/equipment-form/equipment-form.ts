import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipment } from '../../models/equipment.model';

export interface EquipmentFormData {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-equipment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment-form.html',
  styleUrl: './equipment-form.css',
})
export class EquipmentForm implements OnInit {
  @Input() equipment: Equipment | null = null;
  @Input() isEditMode: boolean = false;
  @Output() submitForm = new EventEmitter<EquipmentFormData>();
  @Output() cancelForm = new EventEmitter<void>();

  formData: EquipmentFormData = {
    name: '',
    quantity: 1
  };

  ngOnInit(): void {
    if (this.equipment && this.isEditMode) {
      this.formData = {
        name: this.equipment.name,
        quantity: this.equipment.quantity
      };
    }
  }

  get isFormValid(): boolean {
    return !!(this.formData.name && this.formData.quantity > 0);
  }

  onSubmit(): void {
    if (this.isFormValid) {
      this.submitForm.emit(this.formData);
      if (!this.isEditMode) {
        this.formData = { name: '', quantity: 1 };
      }
    }
  }

  onCancel(): void {
    this.cancelForm.emit();
  }
}
