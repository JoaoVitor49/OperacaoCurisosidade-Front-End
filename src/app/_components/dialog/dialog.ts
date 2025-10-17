import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientService } from '../../services/client.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatIconModule, MatCheckboxModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Dialog {
  clientForm: FormGroup;
  isEditMode: boolean;
  
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private snackbarService = inject(SnackbarService);
  private dialogRef = inject(MatDialogRef<Dialog>);
  private matDialogData = inject(MAT_DIALOG_DATA);

  constructor() {
    this.isEditMode = !!this.matDialogData;

    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.maxLength(200)]],
      others: ['', [Validators.maxLength(300)]],
      interests: ['', [Validators.required, Validators.maxLength(300)]],
      feelings: ['', [Validators.required, Validators.maxLength(300)]],
      values: ['', [Validators.required, Validators.maxLength(300)]],
      isActive: [true]
    });

    if (this.isEditMode) {
      this.clientForm.patchValue(this.matDialogData);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.snackbarService.showWarning('Por favor, preencha o formulário corretamente.');
      return;
    }

    const serviceCall = this.isEditMode
      ? this.clientService.updateClient(this.matDialogData.id, this.clientForm.value)
      : this.clientService.createClient(this.clientForm.value);

    const successMessage = this.isEditMode ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!';
    const errorMessage = this.isEditMode ? 'Erro ao atualizar cliente. Tente novamente.' : 'Erro ao criar cliente. Tente novamente.';
    const errorLog = this.isEditMode ? 'Erro ao atualizar cliente' : 'Erro ao criar cliente';

    serviceCall.subscribe({
      next: () => {
        this.snackbarService.showSuccess(successMessage);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.snackbarService.showError(errorMessage);
        console.error(errorLog, error);
      }
    });
  }
}