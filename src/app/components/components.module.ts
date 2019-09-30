import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomFabComponent} from './custom-fab/custom-fab.component';
import {SalonItemComponent} from './salon-item/salon-item.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {AccordionComponent} from './accordion/accordion.component';
import {AccordionServiceComponent} from './accordion-service/accordion-service.component';
import {MasterItemComponent} from './master-item/master-item.component';
import {CustomSelectComponent} from './custom-select/custom-select.component';

@NgModule({
    declarations: [
        CustomFabComponent,
        SalonItemComponent,
        MainHeaderComponent,
        AccordionComponent,
        AccordionServiceComponent,
        MasterItemComponent,
        CustomSelectComponent
    ],
    imports: [
        CommonModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        CustomFabComponent,
        SalonItemComponent,
        MainHeaderComponent,
        AccordionComponent,
        AccordionServiceComponent,
        MasterItemComponent,
        CustomSelectComponent
    ]
})
export class ComponentsModule {
}
