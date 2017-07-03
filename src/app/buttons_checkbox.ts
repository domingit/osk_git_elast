import {Component, Input, Output, EventEmitter, DoCheck} from '@angular/core';

@Component({
  selector: 'ngbd-buttons-checkbox',
  templateUrl: './buttons_checkbox.html'
})
export class NgbdButtonsCheckbox implements DoCheck {

  @Input() indexAliasesModel: any;
  //@Output() indexAliasesModelChange = new EventEmitter<any>();
  @Output() indexAliasesModelChange: EventEmitter<any> = new EventEmitter();

  constructor(){}

  ngDoCheck() {
    this.indexAliasesModelChange.next(this.indexAliasesModel);
    var countSelectIndex = 0;
    for (var i=0; i<this.indexAliasesModel.length; i++) {
            if(this.indexAliasesModel[i].value) {
              countSelectIndex =+1;
              break;
            }
        }
  }

}