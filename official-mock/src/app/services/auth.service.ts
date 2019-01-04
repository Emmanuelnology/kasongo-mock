import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  famuserCollection: AngularFirestoreCollection;
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, private route: Router) {
    this.famuserCollection = this.afs.collection('famuserInformation');
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch ((error: Error) => {
        console.error(error);
        throw error
      });
  }

  get famuser() {
    return this.afAuth.auth.currentUser;
  }

  // get isLoggedIn(): boolean {
  //   return (this.famuser) ? true: false;
  // }

  logIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch ((error: Error) => {
      console.error(error);
      throw error;
    });
  }

  logOut() {
    return this.afAuth.auth.signOut()
    .then (() => {
      this.route.navigate(['login']);
      }
      )
    .catch ((error: Error) => {
      console.error(error);
      throw error;
    });;
  }
}
