import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { Table } from '../../_components/table/table';
import { MainButton } from "../../_components/main-button/main-button";
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../_components/dialog/dialog';
import { ActionButtonsCell } from "../../_components/action-buttons-cell/action-buttons-cell";
import { StatusCell } from "../../_components/status-cell/status-cell";
import { BaseClientListService } from '../../services/base.client-list.service';

@Component({
  selector: 'app-register',
  imports: [MainButton, ActionButtonsCell, StatusCell, Table],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements AfterViewInit, OnInit {
  private dialog = inject(MatDialog);
  protected baseClientService = inject(BaseClientListService);
  tableComponent = viewChild.required(Table)

  ngOnInit(): void {
    this.baseClientService.initialize(); 
  }

  openDialog() {
    const dialogRef = this.dialog.open(Dialog)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseClientService.loadClients();
      }
    });
  }

  ngAfterViewInit(): void {
    this.baseClientService.setTableComponent(this.tableComponent());
  }
}
