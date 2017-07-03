import {Component, Input} from '@angular/core';
import { ObjectService } from "templates/object.service";

@Component({
  selector: 'about-body',
  templateUrl: './about.component.html'
})
export class AboutComponent {

constructor(private service: ObjectService){}


  private getMeInfo(itemType,itemId): any {
    this.service.navigateToTabLink(itemType,itemId);
  }

}