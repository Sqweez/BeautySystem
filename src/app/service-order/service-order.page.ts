import {Component, OnInit} from '@angular/core';
import {Service} from '../models/service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import consts from '../config/consts';
import * as moment from 'moment';
import {ToastService} from '../toast.service';

@Component({
    selector: 'app-service-order',
    templateUrl: './service-order.page.html',
    styleUrls: ['./service-order.page.scss'],
})
export class ServiceOrderPage implements OnInit {

    id: any;
    salon: any;
    salonInfo: any;
    services: any;
    _masters: any;
    masters: any;
    orders: any;
    _dates: any = [];
    dates: any = [];
    customPlaceholder: string = 'Выбор мастера';

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private toast: ToastService) {

    }

    order: Service = <Service>{};

    currentDate;


    onChooseService(event) {
        this.order.service = event.id;
        let currentService = event;
        let masterIds = currentService.masterId;
        this.masters = [];
        masterIds.forEach(item => {
            let index = this._masters.map(i => i.id).indexOf(item);
            if (index > -1) {
                this.masters.push(this._masters[index])
            }
        });
        this._dates = this.getDifference();
    }

    onChooseMaster(event) {
        this.order.masterName = event.name;
        this.order.master = event.id;
        this.customPlaceholder = event.name;
        if (this.order.date) {
            delete this.order.time;
            this._dates = this.getDifference();
            this.filterDates();
        }
    }

    startInitiation() {
        let date = new Date();
        this.currentDate = date.toISOString();
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        // Получаем данные с сервера
        this.httpClient.get(consts.url + 'app.php?action=getSalonInfo&id=' + this.id)
            .subscribe(data => {
                this.salon = data;
                this.salonInfo = this.salon.salon;
                this._dates = this.getDifference();
                this.services = this.salon.services;
                this.orders = this.salon.records;
                this.services = this.services.filter(i => i.masterId);
                this._masters = this.salon.masters;
                this.services = this.services.map(item => {
                    item.desc = `${item.cost} тг, ${item.time} мин`;
                    return item;
                });
            })
    }

    ngOnInit() {
       this.startInitiation();
    }

    onSelectClicked() {
        this.customPlaceholder = 'Выбор мастера';
        this.order = <Service>{};
    }

    getDifference() {
        let start = this.salonInfo.OpenTime;
        let finish = this.salonInfo.CloseTime;
        let startDate = moment(start, 'HH:mm').add(-30, 'minutes').format('HH:mm');
        start = start.split(':').map(i => +i);
        finish = finish.split(':').map(i => +i);
        let openTime = start[0];
        let closeTime = finish[0];
        if (start[1] == 30) {
            openTime += 0.5;
        }
        if (finish[1] == 30) {
            closeTime += 0.5;
        }
        let result = (closeTime - openTime) / 0.5;
        let dates = [];
        for (let i = 0; i <= result; i++) {
            startDate = moment(startDate, 'HH:mm').add(30, 'minutes').format('HH:mm');
            dates.push(startDate);
        }
        return dates;
    }

    chooseTime(item) {
        this.order.time = item;
        document.querySelector('#makeOrder').scrollIntoView({
            behavior: 'smooth'
        });
    }

    filterDates() {
        this.dates = this.filterMethod();
    }

    private filterMethod() {
        let dates = this.getDifference();
        let chosenDate = moment(this.order.date).format('YYYY-MM-DD');
        let orders = this.orders.filter(i => {
            return i.dateZapis == chosenDate && i.masterId == this.order.master && i.priceId == this.order.service;
        });
        let index = this.services.map(i => i.id).indexOf(this.order.service);
        let time = this.services[index].time;
        time = Math.ceil(time / 30);
        if (orders.length === 0) {
            return dates;
        }
        orders.forEach(item => {
            let index = dates.indexOf(item.timeStart);
            dates.splice(index, time);
        });
        let _dates = dates.filter(i => {
            let q = moment(i, 'HH:mm').add(30 * time, 'minutes').format('HH:mm');
            let _index = dates.indexOf(q);
            if (_index > -1) return i;
        });
        return _dates;
    }
    
    makeRecord() {
        if (this.dates.length === 0) {
            this.toast.showToast('Сожалеем, но на данную дату нельзя записаться');
            return;
        }
        if (!this.order.time) {
            this.toast.showToast('Выберите время записи!');
            return;
        }
        let formData = new FormData();
        let user_data = JSON.parse(localStorage.getItem('user_data'));
        let date = moment(this.order.date, "YYYY-MM-DD").format('YYYY-MM-DD');
        formData.append('idSalon', this.salonInfo.id);
        formData.append('master', this.order.master.toString());
        formData.append('price', this.order.service.toString());
        formData.append('clientId', user_data.id);
        formData.append('datepicker', date);
        formData.append('action', 'makeOrder');
        formData.append('time', this.order.time);
        this.httpClient.post(consts.url + 'app.php', formData).subscribe(() => {
            this.toast.showToast('Вы были успешно записаны на услугу!');
            this.order = <Service>{};
            this.startInitiation();
            setTimeout(() => {
                this.router.navigateByUrl('/salon-page/' + this.id);
            }, 2000)
        });
    }

}
