import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service'

interface DecodedToken{
  exp: number;
}

export const authGuard: CanActivateFn = (route, state) => {
  const snackbarService = inject(SnackbarService);
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if (!token) {
    snackbarService.showWarning('Você precisa estar logado para acessar essa página.');
    router.navigate(['/login']);
    return false;
  }
  
  try{
    const decodedToken = jwtDecode<DecodedToken>(token);
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;

    if(isTokenExpired){
      localStorage.removeItem('token');
      snackbarService.showWarning('Sua sessão expirou. Por favor, faça login novamente.');
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
  catch(error){
    localStorage.removeItem('token');
    snackbarService.showError('Token inválido. Por favor, faça login novamente.');
    router.navigate(['/login']);
    return false;
  }
}