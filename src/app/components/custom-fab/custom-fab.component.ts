import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-custom-fab',
    templateUrl: './custom-fab.component.html',
    styleUrls: ['./custom-fab.component.scss'],
})
export class CustomFabComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navToOrderPage() {
       // this.router.navigateByUrl('/service-order');
    }

}
