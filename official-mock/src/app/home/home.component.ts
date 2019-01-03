import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface User {
  uid: string;
  email: string;
  photoURL: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  famuser;
  famuserCollection: AngularFirestoreCollection<User>;
  fams: Observable<User[]>;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
      this.famuser = this.authService.famuser;
      this.famuserCollection = this.afs.collection<User>('fams',
        (ref) => ref
        .where('userID', '==', this.authService.famuser.uid)
        .orderBy('name', 'asc')
        );
        this.fams = this.famuserCollection.valueChanges();
        {
  }
}
  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
  }

}
