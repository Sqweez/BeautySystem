import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {

    constructor(public router: Router, private navController: NavController) {
    }

    ngOnInit() {
    }

    navigateToProfile() {
        this.router.navigateByUrl('/profile');
    }

    navigateToHome() {
        this.router.navigateByUrl('/home');
    }

    navBack() {
        this.navController.back();
    }

}
