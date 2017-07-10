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
  authz : any;

  constructor(public http: Http, private elastic: ElasticSearchService, private objectService: ObjectService, private kc: KeycloakService) {
    this.searchText = this.objectService.searchText;
    this.signedIn = this.objectService.signedIn;
    this.indexAliasesModel = this.setIndices(['default']);
    //console.log(localStorage.getItem("ES_index_aliases"));
    /*if(localStorage.getItem("ES_index_aliases")!='null' && localStorage.getItem("ES_index_aliases")!='undefined'){
        this.indexAliasesModel = this.elastic.indexAliasesModel = JSON.parse(localStorage.getItem("ES_index_aliases"));
    } else {
        this.indexAliasesModel = this.setIndices(['default']);
    }*/
  }
  ngOnInit(){
      //console.log("user Info  ", this.kc.getUserInfo());
      this.authz = this.kc.getUserInfo();
      if (this.authz){
          this.signedIn=!this.authz.loggedIn;
          //console.log("sign  ", this.signedIn);
          this.objectService.signedIn = this.signedIn;
          this.objectService.emitSubjectSign(this.signedIn);
          this.objectService.emitSubjectAuth(this.authz);
          //console.log("sign on init ",this.objectService.signedIn);
          //console.log(this.authz);
      }
  }

  logout() {
    this.kc.logout();
  }

  setIndices(index){
        return this.elastic.setIndices(index);;
    }


  toggleState() {
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
  }

  getMeInfo = function () {
        //console.log("getMeInfo");
        this.updateGetUrl('00000865');
        this.id = '00000865';
        this.initializeInfoTab();
  }

    signIn = function(){
        //console.log("signIn");
        this.kc.auth.authz.login();
        //auth.authz.login();
    }

    signOut = function(){
        //console.log("signOut");
        this.kc.signOut({redirectUri: this.objectService.logout_redirect_uri});
        //this.kc.auth.authz.logout({redirectUri: this.objectService.logout_redirect_uri});
        //auth.authz.logout({redirectUri: myConfig.logout_redirect_uri});
    }

    navigateHome(){
      this.objectService.navigateToHome();
    }


}
