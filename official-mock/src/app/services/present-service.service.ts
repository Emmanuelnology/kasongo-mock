import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Timestamp, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface IPresent {
  name: string;
  // luckyName: string;
  // giftName: string;
  // image: string
  // rating: number;
  // date: string;
  // letterSending: boolean;
  // userID: string;
  isSelected: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL: string;
}

export interface IPresentID extends IPresent { id: string; }

@Injectable({
  providedIn: 'root'
})
export class PresentServiceService {
  presents: Observable<IPresent[]>;
  presentCollection: AngularFirestoreCollection<IPresent>;
  famuser;

  constructor(afs: AngularFirestore) {
    this.presentCollection = afs.collection<IPresent>('presents',(reference) => {
      return reference.where('isSelected', '==', true);
    });
    this.presents= this.presentCollection.snapshotChanges()
      .pipe(map(this.includeCollectionID));
  }

//   constructor (private authService: AuthService, private afs: AngularFirestore) {
//     this.famuser = this.authService.famuser;
//     console.log(this.authService.famuser);
//     this.presentCollection = this.afs.collection<IPresent>('presents', (reference) => {
//       return reference
//       .where('userID', '==', this.authService.famuser.uid);

//   });
//   this.presents = this.presentCollection.snapshotChanges()
//   .pipe(map(this.includeCollectionID));
// }

  includeCollectionID (docChangeaction) {
    return docChangeaction.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
    });
  }
  
  addPresent (gifts) {
    // const present: IPresent = {
    //   name: gifts.Famname,
    //   luckyName: gifts.Luckyname,
    //   giftName: gifts.Gift,
    //   rating: gifts.rating,
    //   date: gifts.date,
    //   isSelected: false
    // };
    return this.presentCollection.add(gifts)
    .catch(this.controlError);;
  }

  deletePresent (present: IPresentID) {
    this.presentCollection.doc(present.id)
    .delete();
  }

  syncronise(id: string) {
    return this.presentCollection.doc(id)
      .valueChanges() as Observable<IPresentID>;
  }

  get(id: string) {
    return this.presentCollection.doc(id).get()
      .pipe(map(
        (payload) => {
          return {id: id, ...payload.data()} as IPresentID;
      }));
  }

  updatePresent (present: IPresentID) {
    this.presentCollection.doc(present.id).update({
      isSelected: present.isSelected
    });
  }

  // upload(presentTotal) {
  //   return this.presentCollection.add(presentTotal);
  // }


  controlError(error: Error) {
    console.log(error);
  }
}
