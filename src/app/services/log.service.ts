import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LogInTable } from '../models/logInTable.model';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../models/paginatedResponse.model';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly apiUrl = environment.apiUrl + '/Log';

  constructor(private http: HttpClient) {}

  getAllLogs(page: number = 1, limit: number = 5, search: string = ''): Observable<PaginatedResponse<LogInTable>> {
    return this.http.get<({total: number, logs: LogInTable[]})>(`${this.apiUrl}?page=${page}&limit=${limit}&searchTerm=${search}`)
    .pipe(map(response => ({ total: response.total, results: response.logs })));
  }

  getLogById(id: number): Observable<Log>{
    return this.http.get<Log>(`${this.apiUrl}/${id}`);
  }
}
