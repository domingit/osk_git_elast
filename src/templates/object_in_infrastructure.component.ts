import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { ObjectService } from './object.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'object-infrastructure',
    templateUrl: './object_in_infrastructure.component.html'
})

export class ObjectInfrastructureComponent{
    $infraSearchResult: any;
    infraSearchResult: any;
    sortPropInfra: any;
    sortReverseInfra: any;
    actual_id:any;
    infraText:any;
    countData = 200;
    moreData=false;
    id:any;

    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {


        this.$infraSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInInfraModel(id, this.countData)
            )
            .subscribe((item) => { this.infraSearchResult = this.service.infraSearchResult = this.sortData(item);
            this.id=this._router.url.split('=')[1];
            if(this.countData < elastic.infraTotal)
                {this.moreData=true;
                this.infraText='>>> Get all ' + elastic.infraTotal + ' results (Warning: Hundreds results can slow down your browser!)';}
            else{
                this.moreData=false;
                this.infraText='>>> Get all ' + elastic.infraTotal + ' results ...';
            }
            if(!item[0]){
                this.service.setSearchLabel('NO DATA');
            }
            else{
                this.service.setSearchLabel(item[0]._source.system_name);

            }
        });
        this.sortPropInfra = this.service.sortPropInfra;
        this.sortReverseInfra = this.service.sortReverseInfra;


    }

    private getMoreData() {
        this.infraText='Loading ...';
        this.$infraSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInInfraModel(id, 10000)
            )
            .subscribe((item) => { this.infraSearchResult = this.service.infraSearchResult = this.sortData(item);
            this.moreData=false;
            
        });

    }

    private getSearchLabel(): boolean {
        return true;
    }

    private sortData(data,property?, type?) {
        if (property)
            {this.sortPropInfra = property;
            this.sortReverseInfra = !type;
            this.service.sortPropInfra = property;
            this.service.sortReverseInfra = !type;
        }
        else {
            property=this.sortPropInfra;
            type=!this.sortReverseInfra;
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