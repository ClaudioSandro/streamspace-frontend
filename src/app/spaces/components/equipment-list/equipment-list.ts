import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipment } from '../../models/equipment.model';
import { EquipmentForm, EquipmentFormData } from '../equipment-form/equipment-form';

@Component({
  selector: 'app-equipment-list',
  imports: [CommonModule, EquipmentForm],
  templateUrl: './equipment-list.html',
  styleUrl: './equipment-list.css',
})
export class EquipmentList {
  @Input() equipmentList: Equipment[] = [];
  @Input() canEdit: boolean = false;
  @Output() addEquipment = new EventEmitter<EquipmentFormData>();
  @Output() updateEquipment = new EventEmitter<{ equipment: Equipment; data: EquipmentFormData }>();
  @Output() deleteEquipment = new EventEmitter<Equipment>();

  editingEquipment: Equipment | null = null;

  onAddEquipment(data: EquipmentFormData): void {
    this.addEquipment.emit(data);
  }

  onEditClick(equipment: Equipment): void {
    this.editingEquipment = equipment;
  }

  onUpdateEquipment(data: EquipmentFormData): void {
    if (this.editingEquipment) {
      this.updateEquipment.emit({ equipment: this.editingEquipment, data });
      this.editingEquipment = null;
    }
  }

  onCancelEdit(): void {
    this.editingEquipment = null;
  }

  onDeleteClick(equipment: Equipment): void {
    if (confirm(`¿Estás seguro de eliminar "${equipment.name}"?`)) {
      this.deleteEquipment.emit(equipment);
    }
  }
}
