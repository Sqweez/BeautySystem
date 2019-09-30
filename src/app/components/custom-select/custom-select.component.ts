import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss'],
})



export class CustomSelectComponent implements OnInit {

    @Input()
    customPlaceholder: string;

    @Input()
    services: any;

    @Output() chosen = new EventEmitter<string>();

    @Output() select = new EventEmitter<any>();

    isVisible = false;
    isChoosen = false;

    constructor() {
    }

    setValue(name) {
        this.isChoosen = true;
        this.chosen.emit(name);
        this.customPlaceholder = name.name;
        this.isVisible = false;
    }

    ngOnInit() {
    }

    toggleClass() {
        this.isVisible = !this.isVisible;

        if(this.isVisible) {
            this.select.emit();
        }
    }


}
