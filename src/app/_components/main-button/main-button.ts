import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.html',
  styleUrl: './main-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainButton {
  label = input.required<string>();
}