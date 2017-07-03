import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ObjectService } from "templates/object.service";

@Component({
    selector: 'main-body',
    templateUrl: './object1.component.html'
})

export class Object1BodyComponent{
    private head_title:string;
    isIn = false;   // store state


    isFirstTimeOpened = true;
    constructor(private objectService: ObjectService){
    }

    private getSearchLabel(): boolean {
        return this.objectService.getSearchLabel();
        //return false;
    }

}