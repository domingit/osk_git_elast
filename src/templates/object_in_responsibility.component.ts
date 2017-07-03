import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { ObjectService } from './object.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'object-responsibility',
    templateUrl: './object_in_responsibility.component.html'
})

export class ObjectResponsibilityComponent {
    $respSearchResult: any; 
    respSearchResult: any;
    sortReverseResp: any;
    sortPropResp:any;

    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {
        this.respSearchResult = this.service.respSearchResult;

        this.$respSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInRespModel(id, 200)
            )
            .subscribe((item) => { 
                this.respSearchResult = this.service.respSearchResult = this.sortData(item);
                if(!item[0]){
                    this.service.setSearchLabel('NO DATA');
                }
                else{
                    this.service.setSearchLabel(item[0]._source.subject_name);
                }
             });
        this.sortPropResp = this.service.sortPropResp;
        this.sortReverseResp = this.service.sortReverseResp;
    }

    private getSearchLabel(): boolean {
        return this.service.getSearchLabel();
    }

    private sortData(data,property?, type?) {
        if (property)
            {this.sortPropResp = property;
            this.sortReverseResp = !type;
            this.service.sortPropResp = property;
            this.service.sortReverseResp = !type;
        }
        else {
            property=this.sortPropResp;
            type=!this.sortReverseResp;
        }
        return data.sort(this.service.sortByProperty(property, type));
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

    private updateGetUrl(systemId): any {
        this.service.updateGetUrl(systemId);
    }


}