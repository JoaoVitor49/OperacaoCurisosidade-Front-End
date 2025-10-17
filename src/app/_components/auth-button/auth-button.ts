import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-auth-button',
  imports: [],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthButton {
  label = input.required<string>();
  isLoading = input<boolean>();
  loadingLabel = input<string>('');
}