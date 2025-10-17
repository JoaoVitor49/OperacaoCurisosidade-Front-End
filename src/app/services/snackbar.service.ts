import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../_components/snackbar/snackbar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  showSuccess(message: string) {
    this.snackbar.openFromComponent(Snackbar, {
      data: { message: message, icon: 'check_circle' },
      duration: 3000,
      panelClass: 'success-snackbar',
      verticalPosition: 'top'
    });
  }

  showError(message: string) {
    this.snackbar.openFromComponent(Snackbar, {
      data: { message: message, icon: 'dangerous' },
      duration: 3000,
      panelClass: 'error-snackbar',
      verticalPosition: 'top'
    });
  }

  showWarning(message: string) {
    this.snackbar.openFromComponent(Snackbar, {
      data: { message: message, icon: 'warning' },
      duration: 3000,
      panelClass: 'warning-snackbar',
      verticalPosition: 'top'
    });
  }
}
