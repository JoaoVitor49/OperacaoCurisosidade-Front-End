import { Component, inject, OnDestroy } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthButton } from "../../_components/auth-button/auth-button";
import { finalize, Subscription, timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserRegister } from '../../models/userRegister.model';

@Component({
  selector: 'app-sign-up',
  imports: [MatInputModule, ReactiveFormsModule, AuthButton, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})

export class SignUp implements OnDestroy {
  signUpForm: FormGroup;
  isLoading = false;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackbarService = inject(SnackbarService);
  private timer: Subscription | undefined;

  constructor() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.signUpForm.invalid){
      this.snackbarService.showWarning('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true;
    const user: UserRegister = this.signUpForm.value;

    this.authService.register(user).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response) => {
        this.snackbarService.showSuccess('Registro bem-sucedido! Redirecionando para o login...');
        const source = timer(3000);
        this.timer = source.subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.snackbarService.showError('Erro ao registrar. Tente novamente.');
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
}
