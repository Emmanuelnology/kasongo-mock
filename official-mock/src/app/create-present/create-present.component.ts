import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPresent, PresentServiceService, IPresentID } from '../services/present-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-present',
  templateUrl: './create-present.component.html',
  styleUrls: ['./create-present.component.css']
})
export class CreatePresentComponent implements OnInit {
  presents: Observable<IPresent[]>;
  disabledAdding: boolean;
  syncedReadingNow: Observable<IPresentID>;
  readingNow: IPresentID;
  famuser;

  constructor(private presentService: PresentServiceService, private router: Router, private authService: AuthService) {
    this.presents= this.presentService.presents;
    this.famuser = this.authService.famuser;
   }

   addPresent(presentTitle: HTMLInputElement) {
    if (presentTitle.value) {
      const present: IPresent = {
        name: presentTitle.value,
        // luckyName: presentTitle.value,
        // giftName: presentTitle.value,
        // rating: presentTitle.valueAsNumber,
        // date: presentTitle.value,
        isSelected: false
      };
      this.disabledAdding = true;
      
      this.presentService.addPresent(present).then(
        () => {
          presentTitle.value='';
          this.disabledAdding = false;
        }
      );
    } }
  //  addPresent(presentTitle: HTMLInputElement) {
  //   if (presentTitle.value) {
  //     this.presentService.addPresent(presentTitle.value);
  //     };
  //     this.disabledAdding = true;
  //   }

  deletePresent(present: IPresentID) {
    this.presentService.deletePresent(present);
  }

  update(present: IPresentID) {
    this.presentService.updatePresent(present);
  }

  syncronise(id: string) {
    this.syncedReadingNow = this.presentService.syncronise(id);
  }

  get(id: string) {
    this.presentService.get(id).subscribe((data) => {
      this.readingNow = data;
    });
  }

  // onSubmit (gift) {
  //   this.presentService.addPresent(gift);
  // }

  ngOnInit() {
  }

}
