import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Route} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import consts from '../config/consts';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';
import {logWarnings} from 'protractor/built/driverProviders';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
    selector: 'app-salon-page',
    templateUrl: './salon-page.page.html',
    styleUrls: ['./salon-page.page.scss'],
})
export class SalonPagePage implements OnInit {

    id: any;
    salon: any = [];
    response: any;
    categories: any = [];
    workTime: any = {};
    masters: any = [];
    daysInRussian = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ];

    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private callNumber: CallNumber) {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        /*
        * Getting data about `Salon`
        * */
        this.http.get(consts.url + 'app.php?action=getSalonInfo&id=' + this.id)
            .subscribe(data => {
                this.response = data;
                this.salon = this.response.salon;
                this.salon.gallery = JSON.parse(this.salon.gallery);
                this.categories =this.response.categories;
                this.masters =this.response.masters;
                /*
                * Modernize workTime
                * START
                * */
                this.salon.OpenTime = this.salon.OpenTime.slice(0, -3);
                this.salon.CloseTime = this.salon.CloseTime.slice(0, -3);
                let t = new Date().getDay();
                t = t == 0 ? 6 : t - 1;
                let today = this.daysInRussian.splice(t, 1);
                this.workTime.dayName = today[0];
                let workTime = `c ${this.salon.OpenTime} до ${this.salon.CloseTime}`;
                this.workTime.workTime = workTime;
                let otherDays = [];
                this.daysInRussian.forEach((item) => {
                    otherDays.push({dayName: item, workTime: workTime})
                });
                this.workTime.days = otherDays;
                this.masters = this.masters.map(item => {
                    item.speciality = item.profession;
                    item.imageUrl = item.img;
                    return item;
                })
            });
    }

    ngOnInit() {
    }

    async callPhone() {
        await this.callNumber.callNumber(this.salon.phone, true);
    }
}
