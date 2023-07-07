import { CanActivateFn } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = LoginService.getLoginStatus();
  const isAdmin = LoginService.getIsAdmin();

  if (isLoggedIn) {
    if (isAdmin) {
      return true;
    } else {
      console.log('Access denied: User is not an admin');
      return false;
    }
  } else {
    // Handle non-logged in users
    console.log('Access denied: User is not logged in');
    return false;
  }
};
