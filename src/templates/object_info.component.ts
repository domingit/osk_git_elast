import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'object-info',
    templateUrl: './object_info.component.html'
})

@Injectable()

export class ObjectInfoComponent{
    $items: any;
    item: any;
    sortPropResp = '';
    sortReverseResp = false;
    navigateTitle: any;        
;

    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {
    
        this.$items = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.getObjectById(id)
            )
            .subscribe((item) => { this.item = item;
             //   console.log("resp item     ", item._type);
            if(!item[0]){
                this.service.setSearchLabel('NO DATA');
            }
            else{
                this.service.setSearchLabel(item[0]._source.name);
            }
             });
        this.sortPropResp = this.service.sortPropResp;
        this.sortReverseResp = this.service.sortReverseResp;


    }

    private getSearchLabel(): boolean {
        return true;
    }

    private navigateToTab(itemType,itemId): any  {
        this.service.navigateToTab(itemType,itemId);
    }

    private navigateToTabLink(tabLink,itemId): any  {
        this.service.navigateToTabLink(tabLink,itemId);
    }

    private navigateToPage(page): any  {
        this.service.navigateToPage(page);
    }
}