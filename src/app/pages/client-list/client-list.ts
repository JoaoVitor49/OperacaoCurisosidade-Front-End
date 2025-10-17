import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { Table } from "../../_components/table/table";
import { MainButton } from "../../_components/main-button/main-button";
import { ActionButtonsCell } from "../../_components/action-buttons-cell/action-buttons-cell";
import { StatusCell } from "../../_components/status-cell/status-cell";
import { RouterLink } from '@angular/router';
import { BaseClientListService } from '../../services/base.client-list.service';
import { ClientService } from '../../services/client.service';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { ClientInTable } from '../../models/clientInTable.model';

@Component({
  selector: 'app-client-list',
  imports: [MainButton, ActionButtonsCell, StatusCell, Table, RouterLink],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss'
})
export class ClientList implements AfterViewInit, OnInit {
  protected baseClientService = inject(BaseClientListService);
  private clientService = inject(ClientService);
  tableComponent = viewChild.required(Table)
  
  ngOnInit(): void{
    this.baseClientService.initialize();
  }

  downloadClients(){
    this.clientService.printClientReport().subscribe({
      next: (data) =>{
        this.generatePDF(data);
      },
      error: (err) =>{
        console.error('erro ao imprimir: ', err)
      }
    })
  }

  private generatePDF(clients: ClientInTable[]): void{
    const doc = new jsPDF();
    autoTable(doc,{
      head: [['Nome', 'Email', 'Status']],
      body: clients.map(client => [client.name, client.email, client.isActive ? 'Ativo' : 'Inativo'])
    })
    doc.save('relatorio_clientes.pdf');
  }

  ngAfterViewInit(): void {
    this.baseClientService.setTableComponent(this.tableComponent());
  }
}
