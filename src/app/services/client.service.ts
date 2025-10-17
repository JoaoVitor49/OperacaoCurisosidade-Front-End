import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { PaginatedResponse } from '../models/paginatedResponse.model';
import { ClientInTable } from '../models/clientInTable.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly apiUrl = environment.apiUrl + '/Client';

  constructor(private http: HttpClient) { }

  getAllClients(page: number = 1, limit: number = 5, search: string = '', sortColumn: string = '', sortDescending: boolean = false): Observable<PaginatedResponse<ClientInTable>> {
    return this.http.get<({ total: number, clients: ClientInTable[] })>(`${this.apiUrl}?limit=${limit}&page=${page}&searchTerm=${search}&sortBy=${sortColumn}&SortDescending=${sortDescending}`)
      .pipe(map(response => ({ total: response.total, results: response.clients })));
  }

  getTotalClients(page: number = 1, limit: number = 5, search: string = '', sortColumn: string = '', sortDescending: boolean = false): Observable<PaginatedResponse<ClientInTable>> {
    return this.http.get<({ total: number, clients: ClientInTable[] })>(`${this.apiUrl}/stats/total?limit=${limit}&page=${page}&searchTerm=${search}&sortBy=${sortColumn}&SortDescending=${sortDescending}`)
      .pipe(map(response => ({ total: response.total, results: response.clients })));
  }

  getClientsByLastMonth(page: number = 1, limit: number = 5, sortColumn: string = '', sortDescending: boolean = false): Observable<PaginatedResponse<ClientInTable>> {
    return this.http.get<({ total: number, clients: ClientInTable[] })>(`${this.apiUrl}/stats/lastMonth?limit=${limit}&page=${page}&sortBy=${sortColumn}&SortDescending=${sortDescending}`)
      .pipe(map(response => ({ total: response.total, results: response.clients })));
  }

  getClientsInactives(page: number = 1, limit: number = 5, sortColumn: string = '', sortDescending: boolean = false): Observable<PaginatedResponse<ClientInTable>> {
    return this.http.get<({ total: number, clients: ClientInTable[] })>(`${this.apiUrl}/stats/inactive?limit=${limit}&page=${page}&sortBy=${sortColumn}&SortDescending=${sortDescending}`)
      .pipe(map(response => ({ total: response.total, results: response.clients })));
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  printClientReport(): Observable<ClientInTable[]> {
    return this.http.get<ClientInTable[]>(`${this.apiUrl}/print`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
