export class ElastikaConfig {
    public searchText: string;
    public signedIn: boolean;
    public sortPropResp: string; // set the default sort type
    public sortPropServ: string; // set the default sort type
    public sortPropInfra: string; // set the default sort type
    public sortPropProd: string; // set the default sort type
    public sortReverseResp: boolean;
    public sortReverseServ: boolean;
    public sortReverseInfra: boolean;
    public sortReverseProd: boolean;
    public $servSearchResult: any;
    public $infraSearchResult: any;
    public $prodSearchResult: any;
    public $respSearchResult: any;
    public isFirstTimeOpened: boolean;

    public servResultTotal: number;
    public infraResultTotal: number;
    public prodResult: number;
    public respResultTotal: number;

    public servGetText: any;
    public infraGetText: any;
    public prodGetText: any;
    public respGetText: any;

    public myMsg: string;
    public mySvr: string;

    public $item: any;
    public label: any;
    public query: any;
    public inputAtributes: Object;
    public item: any;

    constructor() {
        this.signedIn = true;
        this.sortPropResp = 'subject_name'; // set the default sort type
        this.sortPropServ = 'service_name'; // set the default sort type
        this.sortPropInfra = 'system_name'; // set the default sort type
        this.sortPropProd = 'service_name'; // set the default sort type
        if(this.signedIn){
            this.searchText = "Start typing something to search...";
        } else{
            this.searchText = "You are not signed in !!!!"
        }
        this.sortReverseResp = false;
        this.sortReverseServ = false;
        this.sortReverseInfra = false;
        this.sortReverseProd = false;
        this.$servSearchResult = null;
        this.$infraSearchResult = null;
        this.$prodSearchResult = null;
        this.$respSearchResult = null;
        this.isFirstTimeOpened = true;

        this.servResultTotal = 0;
        this.infraResultTotal = 0;
        this.prodResult = 0;
        this.respResultTotal = 0;

        this.servGetText = null;
        this.infraGetText = null;
        this.prodGetText = null;
        this.respGetText = null;

        this.myMsg = ''
        this.mySvr = '';

        this.$item = null;
        this.label = null;
        this.inputAtributes = {id: ''};
        this.item = null;
    }

    init() {}

    
}