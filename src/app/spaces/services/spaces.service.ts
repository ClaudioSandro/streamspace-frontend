import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductionSpace, ImageUploadResponse } from '../models/production-space.model';
import { CreateSpaceRequest } from '../models/create-space-request.model';
import { UpdateSpaceRequest } from '../models/update-space-request.model';

@Injectable({
  providedIn: 'root',
})
export class SpacesService {
  private readonly apiUrl = `${environment.apiUrl}/production-spaces`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductionSpace[]> {
    console.log('[SpacesService] Fetching all spaces from:', this.apiUrl);
    return this.http.get<ProductionSpace[]>(this.apiUrl).pipe(
      tap((response) => {
        console.log('[SpacesService] Raw response:', response);
      }),
      timeout(10000),
      catchError((error) => {
        console.error('[SpacesService] Error fetching spaces:', error);
        throw error;
      })
    );
  }

  getById(spaceId: number): Observable<ProductionSpace> {
    return this.http.get<ProductionSpace>(`${this.apiUrl}/${spaceId}`);
  }

  create(request: CreateSpaceRequest): Observable<ProductionSpace> {
    return this.http.post<ProductionSpace>(this.apiUrl, request);
  }

  update(spaceId: number, request: UpdateSpaceRequest): Observable<ProductionSpace> {
    return this.http.put<ProductionSpace>(`${this.apiUrl}/${spaceId}`, request);
  }

  delete(spaceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${spaceId}`);
  }

  // Image management methods
  uploadImage(spaceId: number, file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageUploadResponse>(`${this.apiUrl}/${spaceId}/image`, formData);
  }

  updateImage(spaceId: number, file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put<ImageUploadResponse>(`${this.apiUrl}/${spaceId}/image`, formData);
  }

  deleteImage(spaceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${spaceId}/image`);
  }
}
