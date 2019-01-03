import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { first, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, 
    private firebaseAuth: AngularFireAuth)
    { }
    public canActivate(): Observable<boolean> {
      return this.firebaseAuth.authState.pipe(
        map(
          (famuser) => {
            if (famuser) {
              return true ;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          },
        ),
        first(),
      )
  }
}
