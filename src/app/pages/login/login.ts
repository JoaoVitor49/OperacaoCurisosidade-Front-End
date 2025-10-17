import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthButton } from "../../_components/auth-button/auth-button";
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserLogin } from '../../models/userLogin.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, AuthButton, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackbarService = inject(SnackbarService);
  
  loginForm: FormGroup;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if(this.loginForm.invalid) {
      this.snackbarService.showWarning('Por favor, preencha o formulário corretamente.');
      return;
    }

    this.isLoading = true;
    const user: UserLogin = this.loginForm.value;

    this.authService.login(user).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Login realizado com sucesso!');
      },
      error: (err) => {
        this.snackbarService.showError('Falha no login. Verifique suas credenciais.');
        console.log('Erro no login:', err);
      }
    });
  }
}
