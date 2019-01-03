import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch ((error: Error) => {
        console.error(error);
        throw error
      });
  }

  constructor(private afAuth: AngularFireAuth, private route: Router ) { }
}
