import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { ObjectService } from './object.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'object-product',
    templateUrl: './object_in_product.component.html'
})

export class ObjectProductComponent{
    $prodSearchResult: any;
    prodSearchResult: any;
    sortPropProd = '';
    sortReverseProd = false;

    constructor(private _router: Router, private elastic: ElasticSearchService, private service: ObjectService, private route: ActivatedRoute) {
    
        this.$prodSearchResult = this.route
            .queryParams
            .map(params => params.id)
            .flatMap((id) =>
                this.elastic.searchInProdModel(id, 200)
            )
            .subscribe((item) => { this.prodSearchResult = this.sortData(item);
            if(!item[0]){
                this.service.setSearchLabel('NO DATA');
            }
            else{
                this.service.setSearchLabel(item[0]._source.system_name);
            }
            });
        this.sortPropProd = this.service.sortPropProd;
        this.sortReverseProd = this.service.sortReverseProd;


    }

    private getSearchLabel(): boolean {
        return true;
    }

    private sortData(data,property?, type?) {
        if (property)
            {this.sortPropProd = property;
            this.sortReverseProd = !type;
            this.service.sortPropProd = property;
            this.service.sortReverseProd = !type;
        }
        else {
            property=this.sortPropProd;
            type=!this.sortReverseProd;
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