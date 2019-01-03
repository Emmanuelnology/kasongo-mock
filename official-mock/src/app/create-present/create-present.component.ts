import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPresent, PresentServiceService, IPresentID } from '../services/present-service.service';

@Component({
  selector: 'app-create-present',
  templateUrl: './create-present.component.html',
  styleUrls: ['./create-present.component.css']
})
export class CreatePresentComponent implements OnInit {
  presents: Observable<IPresent[]>;
  disabledAdding: boolean;

  constructor(private presentService: PresentServiceService) {
    this.presents= this.presentService.presents;
   }

   add(presentTitle: HTMLInputElement) {
    if (presentTitle.value) {
      this.presentService.addPresent(presentTitle.value);
      };
      this.disabledAdding = true;
    }

  delete(present: IPresentID) {
    this.presentService.deletePresent(present);
  }

  update (present: IPresentID) {
    this.presentService.updatePresent(present);
  }

  // sync(id: string) {
  //   this.syncedReadingNow = this.bookService.sync(id);
  // }

  get(id: string) {
    this.presentService.get(id).subscribe((data) => {
    });
  }

  onSubmit (presentForm) {
    this.presentService.addPresent(presentForm);
  }

  ngOnInit() {
  }

}
