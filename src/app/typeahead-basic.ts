import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from "templates/object.service";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: 'ngbd-typeahead-template',
  templateUrl: './typeahead-basic.html',
  styleUrls: ['./typeahead-basic.css']
})
export class NgbdTypeaheadTemplate {

  model: any;
  searching = false;
  searchFailed = false;
  $respSearchResult: any;
  respSearchResult: any;
  //signedIn:any;
  signedIn = true;
  id: any;
  sub: any;
  searchText: any;
  indexLength: number;
  searchName: any;

  constructor(private route: ActivatedRoute, private _router: Router, private locationStrategy: LocationStrategy, private elastic: ElasticSearchService, private objectService: ObjectService) {
    this.searchText = this.objectService.searchText;
    //this.signedIn = objectService.signedIn;
    //console.log("typeahead sign  ", this.signedIn);
    this._router.events
      .subscribe(
      (url: any) => {
        let _ruta = "";
        url.url.split("/").forEach(element => {
          if (element !== "" && _ruta === "")
          { _ruta = "/" + element; }
        });
      });

      this.objectService.signn$.subscribe(
                (signn) => {this.signedIn = signn;
                  this.searchText = this.objectService.getPlaceholder(signn);
                }
            );

      /*this.objectService.searchName$.subscribe(
                (searchName) => {this.searchName = searchName;
                }
      );*/
      
      this.objectService.searchName$.subscribe(
                (searchName) => {this.model = searchName;
                  this.searchName = searchName;
                }
            );

  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => {
      this.indexLength =  this.elastic.setAllowedIndices().length;
      if(this.indexLength==0){
        alert('You do not have selected any index. You must choose at least one in Settings');
      }
      else{
        this.searching = true;
        //console.log("citam");
      }
    })
      .switchMap(term => 
     term.length < 2 || this.indexLength == 0 ? []
        : this.elastic.suggest(term)
          .do(() => {this.searchFailed = false
          })
          .catch(() => {
            this.searchFailed = true;
            //console.log("chyba");
            return Observable.of([]);
          }))
      .do(() => {this.searching = false
      //console.log("nacitane");
    });


  /*formatter = (x: { _source: any }) => 
    x._source.name;*/

    formatter = (x: { _source: any }) =>
    this.searchName;  
  


  selectedItem(item) {
    this.objectService.emitSubjectSearch(item.item._source.name);
    this.objectService.selectedItemId = item.item._id;
    this.objectService.emitSubject(item.item._type);
    //console.log(item);

    if(this._router.url=='/main'){
      this._router.navigate(['object/info'], {queryParams: {id: item.item._id}});
    }
    else {
      this._router.navigate([this._router.url.split('?')[0]], {queryParams: {id: item.item._id}});
    }

  }

}
