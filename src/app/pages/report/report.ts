import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableModel } from '../../models/table.model';
import { Table } from "../../_components/table/table";

@Component({
  selector: 'app-report',
  imports: [Table],
  templateUrl: './report.html',
  styleUrl: './report.scss'
})
export class Report {
  private router = inject(Router)

  reportColumns: TableModel[] = [
    { key: 'nameList', label: 'NOME', sortable: false }
  ];

  data: ReportTable[] = [
    { nameList: 'Lista de Usuarios', route: '/clientList' },
    { nameList: 'Lista de Logs', route: '/logList' }
  ];

  total = this.data.length;
  
  navigateToReport(item: ReportTable) {
    this.router.navigate([item.route]);
  }
}
