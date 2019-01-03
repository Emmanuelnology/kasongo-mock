import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  email: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  register(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch ((error: Error) => {
        console.error(error);
        throw error
      });
  }

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private route: Router ) { }
}
