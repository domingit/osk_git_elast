import {Component, Input} from '@angular/core';
import { ObjectService } from "templates/object.service";
import { ModalService } from '../modal_window/modal.service';

@Component({
  selector: 'about-body',
  templateUrl: './about.component.html'
})
export class AboutComponent {
signedIn=false;
constructor(private service: ObjectService, private modalserv: ModalService){
  this.service.signn$.subscribe(
                (signn) => {this.signedIn = signn;
                }
    );
}


  private getMeInfo(itemType,itemId): any {
    this.service.navigateToTabLink(itemType,itemId);
  }

  private closeModal(): any {
    this.service.emitSubjectSign(true);
    //this.service.emitSubjectSign(this.signedIn);
  }

}