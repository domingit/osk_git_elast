import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { ObjectService } from './object.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'object-service',
    templateUrl: './object_in_service.component.html'
})

export class ObjectServiceComponent{
    $servSearchResult: any;
    servSearchResult: any;
    sortPropServ = '';
    sortReverseServ = false;

    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {
        console.log("TU",this.service.selectedItemId);
        this.$servSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInServModel(id, 200)
            )
            .subscribe((item) => { this.servSearchResult = this.sortData(item);
            if(!item[0]){
                this.service.setSearchLabel('NO DATA');
            }
            else{
                this.service.setSearchLabel(item[0]._source.object_name);
            }
        });
        this.sortPropServ = this.service.sortPropServ;
        this.sortReverseServ = this.service.sortReverseServ;


    }

    private getSearchLabel(): boolean {
        return true;
    }

    private sortData(data,property?, type?) {
        if (property)
            {this.sortPropServ = property;
            this.sortReverseServ = !type;
            this.service.sortPropServ = property;
            this.service.sortReverseServ = !type;
        }
        else {
            property=this.sortPropServ;
            type=!this.sortReverseServ;
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