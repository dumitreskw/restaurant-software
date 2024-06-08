import { CanActivateFn } from '@angular/router';

export const introGuard: CanActivateFn = (route, state) => {
  return true;
};
