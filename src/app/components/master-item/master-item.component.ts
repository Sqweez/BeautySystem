import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-master-item',
    templateUrl: './master-item.component.html',
    styleUrls: ['./master-item.component.scss'],
})
export class MasterItemComponent implements OnInit {


    @Input()
    imageUrl: string;

    @Input()
    name: string;

    @Input()
    speciality: string;

    constructor() {
    }

    ngOnInit() {
    }

}
