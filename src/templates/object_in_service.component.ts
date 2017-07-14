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
    countData = 200;
    moreData = false;
    servText:any;
    id:any;


    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {
        this.$servSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInServModel(id, this.countData)
            )
            .subscribe((item) => { this.servSearchResult = this.sortData(item);
            this.id=this._router.url.split('=')[1];
            if(this.countData < elastic.servTotal)
                {this.moreData=true;
                this.servText='>>> Get all ' + elastic.servTotal + ' results (Warning: Hundreds results can slow down your browser!)';}
            else{
                this.moreData=false;
                this.servText='>>> Get all ' + elastic.servTotal + ' results ...';
            }
            if(!item[0]){
            }
            else{
                this.service.setSearchLabel(item[0]._source.object_name);
        }
        });
        this.sortPropServ = this.service.sortPropServ;
        this.sortReverseServ = this.service.sortReverseServ;


    }

    private getMoreData() {
        this.servText='Loading ...';
        this.$servSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInServModel(id, this.countData)
            )
            .subscribe((item) => { this.servSearchResult = this.service.servSearchResult =  this.sortData(item);
            this.moreData=false;
            
        });
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

    private navigateToTabLink(tabLink,itemId, itemName?): any  {
        this.service.navigateToTabLink(tabLink,itemId, itemName);
    }

    private navigateToPage(page): any  {
        this.service.navigateToPage(page);
    }

    private updateGetUrl(systemId, itemName?): any {
        this.service.updateGetUrl(systemId, itemName);
    }
}