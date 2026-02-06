import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Quotation {
  _id?: string;
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  requirementDescription: string;
  budget: number;
  status?: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: string;
  updatedAt?: string;
}

interface QuotationResponse {
  message: string;
  quotation?: Quotation;
  quotations?: Quotation[];
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private apiUrl = `${environment.apiBaseUrl}/quotations`;

  constructor(private http: HttpClient) {}

  createQuotation(data: Quotation): Observable<QuotationResponse> {
    return this.http.post<QuotationResponse>(this.apiUrl, data);
  }

  getMyQuotations(): Observable<QuotationResponse> {
    return this.http.get<QuotationResponse>(`${this.apiUrl}/my-quotations`);
  }

  getQuotation(id: string): Observable<{ quotation: Quotation }> {
    return this.http.get<{ quotation: Quotation }>(`${this.apiUrl}/${id}`);
  }

  getAllQuotations(): Observable<QuotationResponse> {
    return this.http.get<QuotationResponse>(this.apiUrl);
  }

  updateQuotationStatus(id: string, status: string): Observable<QuotationResponse> {
    return this.http.patch<QuotationResponse>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteQuotation(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
