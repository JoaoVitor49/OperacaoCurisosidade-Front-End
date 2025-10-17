import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss'
})

export class DeleteDialog {
  matDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteDialog>);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}