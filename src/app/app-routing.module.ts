import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ObjectInfoComponent }  from '../templates/object_info.component';
import {ObjectServiceComponent} from '../templates/object_in_service.component';
import {ObjectResponsibilityComponent} from '../templates/object_in_responsibility.component';
import {ObjectProductComponent} from '../templates/object_in_product.component';
import {ObjectInfrastructureComponent} from '../templates/object_in_infrastructure.component';
import {ObjectBodyComponent} from '../templates/object.component';
import {Object1BodyComponent} from '../templates/object1.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',component: Object1BodyComponent},
  { path: 'object/info',component: ObjectInfoComponent },
  { path: 'object/servmodel',component: ObjectServiceComponent },
  { path: 'object/respmodel',component: ObjectResponsibilityComponent},
  { path: 'object/prodmodel',component: ObjectProductComponent },
  { path: 'object/inframodel',component: ObjectInfrastructureComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
