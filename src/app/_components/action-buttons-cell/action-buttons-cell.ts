import { Component, EventEmitter, input , Output, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-action-buttons-cell',
  imports: [MatIconModule],
  templateUrl: './action-buttons-cell.html',
  styleUrl: './action-buttons-cell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActionButtonsCell {
  item = input.required<any>();

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}