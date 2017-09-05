import {Component, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';

@Component({
  selector: 'ngbd-buttons-checkbox',
  templateUrl: './buttons_checkbox.html'
})
export class NgbdButtonsCheckbox implements DoCheck {

  @Input() indexAliasesModel: any;
  @Output() indexAliasesModelChange: EventEmitter<any> = new EventEmitter();

  constructor(private elastic: ElasticSearchService){}

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

  onClick(index) {
    this.elastic.saveCookies();
  }
}
