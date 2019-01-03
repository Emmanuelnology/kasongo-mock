import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'official-mock';
  presents: Observable<any[]>;
  constructor(afs: AngularFirestore) {
    this.presents = afs.collection('presents').valueChanges();
  }
}
