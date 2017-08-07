import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from "rxjs";

@Injectable()
export class ObjectService {
    public selectedItemId;
    public label;
    public query;
    public _type;
    public infra_id;
    public infraSearchResult;
    public respSearchResult;
    public resp_id;
    public prodSearchResult;
    public prod_id;
    public servSearchResult;
    public serv_id;
    public signedIn;
    public searchText='';
    public account_url: 'https://idp.orange.sk/auth/realms/orange/account/?referrer=elastika';
    public logout_redirect_uri: 'https://elastika.fe.sun.orange.sk/elastika/app/index.html';
    public ES_uri: 'https://localhost';

    private _signSubject = new Subject<boolean>();
    public signn$ = this._signSubject.asObservable();
    public emitSubjectSign = (signn: boolean) => this._signSubject.next(signn);

    private _authSubject = new Subject<any>();
    public auth$ = this._authSubject.asObservable();
    public emitSubjectAuth = (auth: any) => this._authSubject.next(auth);

    private _modalSubject = new Subject<any>();
    public modal$ = this._modalSubject.asObservable();
    public emitSubjectModal = (modal: any) => this._modalSubject.next(modal);

    private _searchSubject = new Subject<any>();
    public searchName$ = this._searchSubject.asObservable();
    public emitSubjectSearch = (searchName: any) => this._searchSubject.next(searchName);


    private _typeSubject = new Subject<string>();
    public type$ = this._typeSubject.asObservable();
    public emitSubject = (type: string) => this._typeSubject.next(type);

    private _titleSubject = new Subject<string>();
    public title$ = this._titleSubject.asObservable();
    public emitSubjectTitle = (title: string) => this._titleSubject.next(title);

    public sortPropResp = 'subject_name';
    public sortPropServ = 'service_name';
    public sortPropInfra = 'system_name';
    public sortPropProd = 'service_name';
    public sortReverseResp = false;
    public sortReverseServ = false;
    public sortReverseInfra = false;
    public sortReverseProd = false;

    public navigateTitle = {
        Vendor:'/object/respmodel',
        System:'/object/servmodel',
        Service:'/object/servmodel',
        Process:'/object/servmodel',
        Process_interface:'/object/servmodel',
        Product:'/object/prodmodel',
        Archive_TV_channel:'/object/servmodel',
        Tel__number:'/object/servmodel',
        IVR_number:'/object/servmodel',
        NPVR:'/object/servmodel',
        Radio_channel:'/object/servmodel',
        SMS_number:'/object/servmodel',
        TV_channel:'/object/servmodel',
        VOD:'/object/servmodel',
        Server:'/object/inframodel',
        Business_term:''
    }

    public tabs = [
        {title: 'Object Info', content: 'Object Info', disabled: false, hidden: false, active:false, routerLink:'/object/info', queryParams: {id: this.selectedItemId}},
        {title: 'Product model', content: 'Product model', disabled: false, hidden: false, active:false, routerLink:'/object/prodmodel', queryParams: {id: this.selectedItemId}},
        {title: 'Service model', content: 'Service model', disabled: false, hidden: false, active:false, routerLink:'/object/servmodel', queryParams: {id: this.selectedItemId}},
        {title: 'Infra model', content: 'Infra model', disabled: false, hidden: false, active:false, routerLink:'/object/inframodel', queryParams: {id: this.selectedItemId}},
        {title: 'Responsibility', content: 'Responsibility', disabled: false, hidden: false, active:false, routerLink:'/object/respmodel', queryParams: {id: this.selectedItemId}},
    ];

    public indexAliasesModel = [
      {type: "alias_systems", value : true, name: "System"},
      {type: "alias_services", value: true, name: "Service"},
      {type: "alias_products", value: true, name: "Product"},
      {type: "alias_information_carriers", value: true, name: "Infocarrier"},
      {type: "alias_servers", value: true, name: "Server"},
      {type: "alias_people", value: true, name: "Person"},
      {type: "alias_vendors", value: true, name: "Vendor"},
      {type: "alias_consist_depend_objects", value: false, name: "Infra"},
      {type: "alias_processes", value: false, name: "Process"},
      {type: "alias_process_interfaces", value: false, name: "Process intf."},
      {type: "alias_business_terms", value: false, name: "Business term"}
  ];

  public tabsConfig = {
      Person:['Object Info', 'Responsibility'],
      Process:['Object Info', 'Product model', 'Service model', 'Infra model', 'Responsibility'],
      System:['Object Info', 'Service model', 'Infra model', 'Responsibility']
  }

    constructor(private _router: Router, @Inject(DOCUMENT) private document: any){
        if (this.signedIn != true || this.signedIn != true)
        {
            this.signedIn = true;
        }

        if(this.signedIn){
            this.searchText = "Start typing something to search...";
        } else{
            this.searchText = "You are not signed in !!!!"
        }
    }

    public getPlaceholder(signed) {
        if(signed){
            this.searchText = "Start typing something to search...";
        } else{
            this.searchText = "You are not signed in !!!!"
        }
        return this.searchText;
    }

    public sortByProperty(property, asc) {
        return function (x, y) {
            if (asc) {
                return ((x._source[property] === y._source[property]) ? 0 : ((x._source[property] > y._source[property]) ? 1 : -1));
            }
            else {
                return ((x._source[property] === y._source[property]) ? 0 : ((x._source[property] < y._source[property]) ? 1 : -1));
            }
        };
    };


    public navigateToTab(itemType,itemId,itemName?): any  {
        if(itemName){
            this.emitSubjectSearch(itemName);
        }
        this._router.navigate([this.navigateTitle[itemType.replace(' ','_')]], {queryParams: {id: itemId}});
    }

    public navigateToTabLink(tabLink,itemId,itemName?): any  {
        if(itemName){
            this.emitSubjectSearch(itemName);
        }
        this._router.navigate([tabLink], {queryParams: {id: itemId}});
    }

    public navigateToHome(): any  {
        this._router.navigate(['/main']);
    }

    public navigateToPage(page): any  {
        this._router.navigate([page]);
    }

    public navigateToOutPage(page): any  {
        this._router.ngOnDestroy();
        if(page='account') {
            this.document.location.href ='https://idp.orange.sk/auth/realms/orange/account/?referrer=elastika';
        }
    }

    public updateGetUrl(systemId, itemName?): any {
        if(itemName){
            this.emitSubjectSearch(itemName);
        }
        this._router.navigate([this._router.url.split('?')[0]], {queryParams: {id: systemId}});
    }

    public getSearchLabel(): boolean {
        if(this._router.url == "/main") {
          this.label=null;
          return false;}
        else {
            return this.label;
        }
    }

    public setSearchLabel(val): any {
        this.label=val;
        this.query = val;;
    }

    public filterTabs(type: string) {
        const allowedTabs = this.tabsConfig[type];
        return allowedTabs ? this.tabs.map(
            (tab) => ({ ...tab, hidden: !allowedTabs.includes(tab.title) })
        ) : this.tabs
    }
}