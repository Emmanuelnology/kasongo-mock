import { Component } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPresent } from './services/present-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'official-mock';
  // presents: Observable<IPresent[]>;
  // presentCollection: AngularFirestoreCollection<IPresent>;
  // constructor(afs: AngularFirestore) {
  //   this.presents = afs.collection<IPresent>('presents').valueChanges();
  // }
}
