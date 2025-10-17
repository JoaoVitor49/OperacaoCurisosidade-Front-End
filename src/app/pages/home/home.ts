import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Boxes } from '../../_components/boxes/boxes';
import { Table } from '../../_components/table/table';
import { StatusCell } from "../../_components/status-cell/status-cell";
import { TableModel } from '../../models/table.model';
import { ClientService } from '../../services/client.service';
import { ClientInTable } from '../../models/clientInTable.model';
import { PageEvent } from '@angular/material/paginator';
import { filter, forkJoin } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { SearchService } from '../../services/search.service';
import { Sort } from '@angular/material/sort';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-home',
  imports: [Boxes, StatusCell, Table],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  clients = signal<ClientInTable[]>([]);
  totalClients = signal(0);
  lastMonthClients = signal(0);
  inactiveClients = signal(0);
  
  private clientService = inject(ClientService);
  private snackbarService = inject(SnackbarService);
  private searchService = inject(SearchService);
  private sortService = inject(SortService);
  tableComponent = viewChild.required(Table)
  
  activeFilter = signal<'total' | 'lastMonth' | 'inactives'>('total');
  currentPage = signal(1);
  pageSize = signal(5);
  totalPaginator = signal(0);

  sortColumns = signal<string>('');
  sortDirection = signal<boolean>(false); 

  dashboardColumns: TableModel[] = [
    { key: 'name', label: 'NOME', sortable: true },
    { key: 'email', label: 'EMAIL', sortable: true },
    { key: 'registerDate', label: 'DATA DE CADASTRO', format: 'date', formatArgs: 'dd/MM/yyyy', sortable: true },
    { key: 'isActive', label: 'STATUS', sortable: true }
  ];

  ngOnInit(): void {
    this.sortService.clearSort();
    this.loadStats();
    this.fetchClients();
    this.search();
  }

  search(): void{
    this.searchService.debouncedSearchTerm$.pipe(
      filter(term => term.length > 2 || term.length === 0 && this.searchService.hasSearched())
    )
    .subscribe(() => { 
      this.resetPagination();
      this.applyFilter('total');
    })
  }

  loadStats(): void {
    forkJoin({
      lastMonth: this.clientService.getClientsByLastMonth(),
      inactives: this.clientService.getClientsInactives()
    }).subscribe({
        next: ({ lastMonth, inactives }) => {
            this.lastMonthClients.set(lastMonth.total);
            this.inactiveClients.set(inactives.total);
        },
        error: (err) => {
          this.snackbarService.showError('Falha ao carregar estatísticas.');
          console.log(err);
        }
    });
  }

  fetchClients(): void {
    const page = this.currentPage();
    const size = this.pageSize();
    const filter = this.activeFilter();
    const search = this.searchService.getSearchTerm();
    const sortColumn = this.sortService.getSortColumn();
    const sortDirection = this.sortService.getSortDirection();

    const serviceMap = {
      total: this.clientService.getTotalClients(page, size, search, sortColumn, sortDirection),
      lastMonth: this.clientService.getClientsByLastMonth(page, size, sortColumn, sortDirection),
      inactives: this.clientService.getClientsInactives(page, size, sortColumn, sortDirection)
    };

    const serviceCall = serviceMap[filter];

    serviceCall.subscribe({
      next: data => {
        this.clients.set(data.results);
        this.totalPaginator.set(data.total);
        if (filter === 'total' && search.length === 0) {
          this.totalClients.set(data.total);
        }
      },
      error: (err) => {
        this.snackbarService.showError('Falha ao carregar a lista de clientes.');
        console.log(err);
      }
    });
  }

  applyFilter(filter: 'total' | 'lastMonth' | 'inactives'): void {
    this.activeFilter.set(filter);
    this.resetPagination();
    this.fetchClients();
  }

  private resetPagination(): void {
    this.currentPage.set(1);
    this.tableComponent().paginator().firstPage();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.fetchClients();
  }

  onSortChange(sort: Sort): void{
    this.sortService.setSortData(sort);
    this.resetPagination();
    this.fetchClients();
  }
}