export class OptionsConfig {

  /*public tabs: any[] = [
    {title: 'Object Info', content: 'Object Info', disabled: false, hidden: false, routerLink:['/object/info']},
    {title: 'Product model', content: 'Product model', disabled: false, hidden: false, routerLink:['/object/prodmodel']},
    {title: 'Service model', content: 'Service model', disabled: false, hidden: false, routerLink:['/object/servmodel']},
    {title: 'Infra model', content: 'Infra model', disabled: false, hidden: false, routerLink:['/object/inframodel']},
    {title: 'Responsibility', content: 'Responsibility', disabled: false, hidden: false, routerLink:['/object/respmodel']},
  ];*/

  indexAliasesModel = [
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

  public defaultIndexAliasesModel: Object = [
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

  public indexAliasesEnabled: any[];
  public allIndexAliases: any[];

    constructor() {  
        this.indexAliasesEnabled = [];
        this.allIndexAliases = [];

        for (var i=0; i<this.indexAliasesModel.length; i++) {
            this.allIndexAliases.push(this.indexAliasesModel[i].type);
        }
        //console.log('*****************indexAliasesModel');
        //console.log(this.allIndexAliases);

    }

}