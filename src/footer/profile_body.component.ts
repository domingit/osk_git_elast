import {Component, Input} from '@angular/core';
import { ObjectService } from "templates/object.service";

@Component({
  selector: 'profile-body',
  templateUrl: './profile_body.component.html'
})
export class ProfBodyComponent {
  signedIn:any;
  page:any;

  constructor(private service: ObjectService){
    this.signedIn = this.service.signedIn;
    this.page=this.service.account_url;
  }

  private accountInfo(): any {
    console.log();
    this.service.navigateToOutPage('account');
  }

}