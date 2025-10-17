import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogInTable } from '../../models/logInTable.model';
import { LogService } from '../../services/log.service';
import { TableModel } from '../../models/table.model';
import { Table } from "../../_components/table/table";
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from '../../services/search.service';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LogDialog } from '../../_components/log-dialog/log-dialog';

@Component({
  selector: 'app-log-list',
  imports: [RouterLink, Table],
  templateUrl: './log-list.html',
  styleUrl: './log-list.scss'
})
export class LogList implements OnInit {
  logService = inject(LogService);
  searchService = inject(SearchService);
  logs = signal<LogInTable[]>([]);
  totalLogs = signal<number>(0);
  tableComponent = viewChild.required(Table);
  dialog = inject(MatDialog);

  currentPage = signal(1);
  pageSize = signal(5);

  columns: TableModel[] = [
    { key: 'timeDate', label: 'DATA E HORA', format: 'date', formatArgs: 'dd/MM/yyyy HH:mm:ss', sortable: false },
    { key: 'userEmail', label: 'USUÁRIO', sortable: false },
    { key: 'action', label: 'AÇÃO', sortable: false }
  ]
  
  ngOnInit(): void {
    this.loadLogs();
    this.search();
  }

  search(): void{
    this.searchService.debouncedSearchTerm$.pipe(
      filter(term => term.length > 2 || (term.length === 0 && this.searchService.hasSearched()))
    )
    .subscribe(() => {
      this.resetPagination();
      this.loadLogs();
    });
  }

  loadLogs(): void {
    const page = this.currentPage();
    const limit = this.pageSize();
    const search = this.searchService.getSearchTerm();

    this.logService.getAllLogs(page, limit, search).subscribe(data => {
      this.logs.set(data.results);
      this.totalLogs.set(data.total);
    });
  }

  private resetPagination(): void {
    this.currentPage.set(1);
    this.tableComponent().paginator().firstPage();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadLogs();
  }

  onRowClick(item: LogInTable): void {
    this.logService.getLogById(item.id).subscribe(log => {
      this.dialog.open(LogDialog, {
        data: log
      })
    })
  }
}
