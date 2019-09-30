import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import consts from '../config/consts';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: any = [];
    pastOrderHistory: any = [];
    currentOrderHistory: any = [];
    constructor(private router: Router, private httpClient: HttpClient, private navController: NavController) {
        this.user = JSON.parse(localStorage.getItem('user_data'));
        const today: any = new Date().setHours(0, 0, 0, 0);
        this.httpClient.get(consts.url + `app.php?action=orderHistory&id=${this.user.id}`)
            .subscribe(data => {
                console.log(today);
                const orderHistory: any = data;
                orderHistory.forEach(i => {
                    let dateZapis: any = Date.parse(i.dateZapis);
                    console.log(dateZapis);
                    if (dateZapis < today) {
                        this.pastOrderHistory.push(i);
                    }
                    else {
                        this.currentOrderHistory.push(i);
                    }
                });
                /*this.pastOrderHistory = this.pastOrderHistory.map(item => {
                    console.log(Date.parse(item.dateZapis))
                    item.dateZapis = item.dateZapis.split('-').reverse().join('.');
                    return item;
                });*/
                console.log(this.pastOrderHistory);
            })
    }

    ngOnInit() {
    }

    navBack() {
        this.navController.back();
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/register']);
    }

}
