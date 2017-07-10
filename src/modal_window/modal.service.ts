import { Injectable, Inject } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class ModalService {

    public visible: any;
    public visibleAnimate = false;
    visibleChange: Subject<any> = new Subject<any>();

    constructor(){
        this.visible = false;
    }

    public show(): void {
     this.visible = true;
     this.visibleChange.next(this.visible);
    /*this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);*/
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public close(): void {
    //console.log("close");
      //this.hide();
      this.visible = false;
      this.visibleChange.next(this.visible);
      //console.log(this.visible);
  }
    
}