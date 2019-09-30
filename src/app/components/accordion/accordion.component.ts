import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

    @Input()
    name: string;

    @Input()
    time: string;

    @Input()
    days: any;
    public isMenuOpen = false;

    constructor() {
    }

    ngOnInit() {
    }

    public toggleAccordion(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

}
