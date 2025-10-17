import {  ChangeDetectionStrategy, Component, EventEmitter, inject, input, Output, TemplateRef, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common'; 
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableModel } from '../../models/table.model';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, CommonModule, MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Table {
  columns = input<TableModel[]>([]);
  data = input.required<any[]>();
  totalItems = input<number>();
  paginator = viewChild.required<MatPaginator>(MatPaginator);
  sort = viewChild.required<MatSort>(MatSort);
  paginatorIntl = inject(MatPaginatorIntl)

  pageIndex = 0;
  pageSize = 5;

  rowClickable = input<boolean>(false);
  customTemplate = input<{ [key: string]: TemplateRef<any> }>({});

  @Output() rowClick = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>([]);

  constructor(){    
    this.paginatorIntl.firstPageLabel = '';
    this.paginatorIntl.nextPageLabel = '';
    this.paginatorIntl.previousPageLabel = '';
    this.paginatorIntl.lastPageLabel = '';
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página:';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }
  
  get displayedColumns(): string[] {
    return this.columns().map(col => col.key);
  }

  getValue(item: any, key: string){
    return item[key]
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  pageEvent(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChange.emit(event);
  }
}