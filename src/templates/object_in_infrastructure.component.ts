import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { ObjectService } from './object.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'object-infrastructure',
    templateUrl: './object_in_infrastructure.component.html',
    styleUrls: ['./object_in_infrastructure.component.css']
})

export class ObjectInfrastructureComponent{
    $infraSearchResult: any;
    infraSearchResult: any;
    sortPropInfra: any;
    sortReverseInfra: any;
    actual_id:any;

    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {
        /*this.actual_id = this.service.infra_id;
        this.infraSearchResult = this.service.infraSearchResult;
        console.log(this.service.selectedItemId);
        console.log(this.actual_id);
        if(this._router.url.split('=')[1]) {
            if(this.actual_id!=this._router.url.split('=')[1]) {
                this.actual_id= this.service.infra_id = this._router.url.split('=')[1];
        */
        this.$infraSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInInfraModel(id, 200)
            )
            .subscribe((item) => { this.infraSearchResult = this.service.infraSearchResult = this.sortData(item);
            if(!item[0]){
                this.service.setSearchLabel('NO DATA');
            }
            else{
                this.service.setSearchLabel(item[0]._source.system_name);
            }
        });
        this.sortPropInfra = this.service.sortPropInfra;
        this.sortReverseInfra = this.service.sortReverseInfra;
            //}
        //}


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