import { Injectable, signal } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sortColumn = signal<string>('')
  private sortDirection = signal<boolean>(false);

  getSortColumn(): string{
    return this.sortColumn();
  }

  getSortDirection(): boolean{
    return this.sortDirection();
  }

  setSortData(sort: Sort): void{
    this.sortColumn.set(sort.active);
    this.sortDirection.set(sort.direction === 'desc' );
  }
  
  clearSort(): void{
    this.sortColumn.set('');
    this.sortDirection.set(false);
  }
}
