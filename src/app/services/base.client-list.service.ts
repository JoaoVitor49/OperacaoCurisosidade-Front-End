import { inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from './client.service';
import { SnackbarService } from './snackbar.service';
import { TableModel } from '../models/table.model';
import { ClientInTable } from '../models/clientInTable.model';
import { Dialog } from '../_components/dialog/dialog';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from './search.service';
import { filter } from 'rxjs';
import { SortService } from './sort.service';
import { Sort } from '@angular/material/sort';
import { Table } from '../_components/table/table';
import { DeleteDialog } from '../_components/delete-dialog/delete-dialog';

@Injectable({
  providedIn: 'root'
})
export class BaseClientListService {
  private dialog = inject(MatDialog);
  private clientService = inject(ClientService);
  private snackbarService = inject(SnackbarService);
  private searchService = inject(SearchService);
  private sortService = inject(SortService);

  clients = signal<ClientInTable[]>([]);
  totalClients = signal(0);
  currentPage = signal(1);
  pageSize = signal(5);

  tableComponent: Table | null = null;

  readonly columns: TableModel[] = [
    { key: 'name', label: 'NOME', sortable: true },
    { key: 'email', label: 'EMAIL', sortable: true },
    { key: 'isActive', label: 'STATUS', sortable: true },
    { key: 'actions', label: 'AÇÃO', sortable: false }
  ]

  initialize(): void {
    this.sortService.clearSort();
    this.resetPagination();
    this.loadClients();
    this.search();
  }

  setTableComponent(tableComponent: Table): void {
    this.tableComponent = tableComponent;
  }

  search(): void {
    this.searchService.debouncedSearchTerm$.pipe(
      filter(term => term.length > 2 || term.length === 0 && this.searchService.hasSearched())
    )
      .subscribe(() => {
        this.resetPagination();
        this.loadClients();
      })
  }

  private resetPagination(): void {
    this.currentPage.set(1);
    if(this.tableComponent){
      this.tableComponent.paginator().firstPage();
    }
  }

  loadClients() {
    const search = this.searchService.getSearchTerm();
    const page = this.currentPage();
    const size = this.pageSize();
    const sort = this.sortService.getSortColumn();
    const direction = this.sortService.getSortDirection();

    this.clientService.getAllClients(page, size, search, sort, direction).subscribe({
      next: (data) => {
        this.clients.set(data.results);
        this.totalClients.set(data.total);
      },
      error: (error) => {
        this.snackbarService.showError('Erro ao carregar clientes.');
        console.log(error)
      }
    })
  }

  editClient(item: ClientInTable) {
    this.clientService.getClientById(item.id).subscribe({
      next: (data) => {
        const dialogRef = this.dialog.open(Dialog, {
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadClients();
          }
        })
      },
      error: (error) => {
        this.snackbarService.showError('Erro ao carregar dados do cliente.');
        console.log('Erro ao carregar dados do cliente', error);
      }
    })
  }

  deleteClient(item: ClientInTable) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: item.name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(item.id).subscribe({
          next: () => {
            this.snackbarService.showSuccess('Cliente deletado com sucesso!');
            this.loadClients();
          },
          error: (error) => {
            this.snackbarService.showError('Erro ao deletar cliente. Tente novamente.');
            console.error('Erro ao deletar cliente', error);
          }
        });
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadClients();
  }

  onSortChange(sort: Sort): void{
    this.sortService.setSortData(sort);
    this.resetPagination();
    this.loadClients();
  }

}
