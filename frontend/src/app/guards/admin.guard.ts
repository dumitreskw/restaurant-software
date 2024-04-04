import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isAdmin();
};
