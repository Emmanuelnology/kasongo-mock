import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface IPresent {
  name: string;
  luckyName: string;
  giftName: string;
  rating: number;
  date: string;
}

export interface IPresentID extends IPresent { id: string; }

@Injectable({
  providedIn: 'root'
})
export class PresentServiceService {
  presents: Observable<IPresent[]>;
  presentCollection: AngularFirestoreCollection<IPresent>;

  constructor(afs: AngularFirestore) {
    this.presentCollection = afs.collection<IPresent>('presents');
    this.presents= this.presentCollection.snapshotChanges()
      .pipe(map(this.includeCollectionID));
  }

  includeCollectionID (docChangeaction) {
    return docChangeaction.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
    });
  }
  
  addPresent (gifts) {
    const present: IPresent = {
      name: gifts.Famname,
      luckyName: gifts.Luckyname,
      giftName: gifts.Gift,
      rating: gifts.rating,
      date: gifts.date,
    };
    this.presentCollection.add(present)
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
    });
  }

  controlError(error: Error) {
    console.log(error);
  }
}
