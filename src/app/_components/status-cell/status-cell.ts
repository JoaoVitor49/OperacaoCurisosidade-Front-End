import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'app-status-cell',
  imports: [StatusPipe],
  templateUrl: './status-cell.html',
  styleUrl: './status-cell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StatusCell {
  status = input.required<boolean>();
}