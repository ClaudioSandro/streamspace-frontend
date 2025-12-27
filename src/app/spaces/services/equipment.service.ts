import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Equipment } from '../models/equipment.model';
import { CreateEquipmentRequest, UpdateEquipmentRequest } from '../models/create-equipment-request.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private readonly apiUrl = `${environment.apiUrl}/production-spaces`;

  constructor(private http: HttpClient) {}

  getBySpaceId(spaceId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/${spaceId}/equipment`);
  }

  create(spaceId: number, request: CreateEquipmentRequest): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.apiUrl}/${spaceId}/equipment`, request);
  }

  update(spaceId: number, equipmentId: number, request: UpdateEquipmentRequest): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/${spaceId}/equipment/${equipmentId}`, request);
  }

  delete(spaceId: number, equipmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${spaceId}/equipment/${equipmentId}`);
  }
}
