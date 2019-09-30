import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-accordion-service',
    templateUrl: './accordion-service.component.html',
    styleUrls: ['./accordion-service.component.scss'],
})
export class AccordionServiceComponent implements OnInit {

    @Input()
    imageUrl: string;

    @Input()
    serviceName: string;

    @Input()
    servicesNames: any;

    public isMenuOpen = false;

    constructor() {
    }

    ngOnInit() {
    }

    public toggleAccordion(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

}
