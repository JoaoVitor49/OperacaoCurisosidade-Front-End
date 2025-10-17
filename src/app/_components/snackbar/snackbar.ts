import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-snackbar',
  imports: [MatIconModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Snackbar {
  snackBarRef = inject(MatSnackBarRef<Snackbar>);
  data: {message: string, icon: string} = inject(MAT_SNACK_BAR_DATA);
}