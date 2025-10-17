import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-boxes',
  imports: [MatCardModule],
  templateUrl: './boxes.html',
  styleUrl: './boxes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Boxes {
  label = input.required<string>();
  value = input.required<number>();
}