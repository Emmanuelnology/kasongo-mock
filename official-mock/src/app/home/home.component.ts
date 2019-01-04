import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IPresent, PresentServiceService, IPresentID, User } from '../services/present-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  presents: Observable<IPresent[]>;
  famuser;
  presentCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore, private presentService: PresentServiceService, private authService: AuthService) {
    this.presents= this.presentService.presents;
    this.famuser = this.authService.famuser;
  //     this.presentCollection = this.afs.collection<IPresent>('presents',
  //       (ref) => ref
  //       .where('userID', '==', this.authService.famuser.uid)
  //       .orderBy('name', 'asc')
  //       );
  //       this.presents = this.presentCollection.valueChanges();
  //       {
  // }
}
  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
  }

}
