import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import {NgbdButtonsCheckbox} from './buttons_checkbox';
import { ElasticSearchService } from '../elastic/elasticsearch.service';
import { ObjectService } from "templates/object.service";
import { unescape } from "querystring";

import { AuthHttp } from 'angular2-jwt';
import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  navCollapsed = false;
  isIn = false;   // store state
  signedIn = true;
  searchText='';
  indexAliasesModel : any;

  constructor(public http: Http, private elastic: ElasticSearchService, private objectService: ObjectService, private kc: KeycloakService) {
    this.searchText = this.objectService.searchText;
    this.signedIn = this.objectService.signedIn;

    if(localStorage.getItem("ES_index_aliases") !== undefined){
        this.indexAliasesModel = this.elastic.indexAliasesModel = JSON.parse(localStorage.getItem("ES_index_aliases"));
    } else {
        this.setIndices(['default']);
    }
  }
  ngOnInit(){
  }

  logout() {
    this.kc.logout();
  }

  login() {
    this.kc.login();
  }

  /*ngOnChanges(indexAliasesModel) {
      console.log("changes");
      console.log(indexAliasesModel);
  }*/

  setIndices(index){
        this.elastic.setIndices(index);
    }

  onChange(atribut){
    /*console.log(atribut);
    this.helpvalue = this.elastic.suggest(this.filter, this.indexAlowed());
    console.log(this.optionsModel);*/
  }

  toggleState() {
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
  }

    /*setSearchLabel (val) {
        console.log("setSearchLabel");
        this.config.query = val;
        this.config.label = val;
    };*/

    /*getSearchLabel = function () {
        /*console.log("getSearchLabel");*/
        /*return this.config.label;
    };*/

  getMeInfo = function () {
        console.log("getMeInfo");
        this.updateGetUrl('00000865');
        this.id = '00000865';
        this.initializeInfoTab();
  }

    signIn = function(){
        console.log("signIn");
        //auth.authz.login();
    }

    signOut (){
        console.log("signOut");
        //auth.authz.logout({redirectUri: myConfig.logout_redirect_uri});
    }

    accountInfo(){
        console.log("accountInfo");
	//window.location.href = config.account_url;
    }


}
