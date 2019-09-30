import {Component, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import consts from '../config/consts';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [
        trigger('scrollState', [
            state('startPos', style({
                transform: 'rotate(-90deg)',
                marginLeft: '0'
            })),
            state('scrollStart', style({
                opacity: 0
            })),
            transition('startPos => scrollStart', animate('600ms ease-out')),
            transition('scrollStart => startPos', animate('600ms ease-out'))
        ]),
        trigger('scrollStateHeader', [
            state('startPos', style({})),
            state('scrollStart', style({
                backgroundColor: '#2e2e2e',
            })),
            transition('startPos => scrollStart', animate('300ms ease-out')),
            transition('scrollStart => startPos', animate('300ms ease-out'))
        ]),
        trigger('scrollStateHeaderTitle', [
            state('startPos', style({
                opacity: 0,
                transform: 'translateY(-50vh)'
            })),
            state('scrollStart', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('startPos => scrollStart', animate('300ms ease-out')),
            transition('scrollStart => startPos', animate('300ms ease-out'))
        ])
    ]
})

export class HomePage {

    categories;
    newSalons;
    headerImage: string = '';
    constructor(private http: HttpClient, private router: Router) {
        this.http.get(consts.url + 'app.php?action=getCategories')
            .subscribe(data => {
            this.categories = data;
        });

        this.http.get(consts.url + 'app.php?action=getHeader')
            .subscribe(data => {
                const any: any = data;
                console.log(any)
                this.headerImage = 'http://beauty.bfgroup.kz/upload_dir/' + any.image;
            });
        
        this.http.get(consts.url + 'app.php?action=getNewSalons')
            .subscribe(data => {
                this.newSalons = data;
                this.newSalons = this.newSalons.map(i => {
                    i.gallery = JSON.parse(i.gallery);
                    return i;
                })
            })
    }

    sliderOptions = {
        slidesPerView: 2.5
    };

    position: string = 'startPos';

    logScrollStart(event) {
        if (event.detail.scrollTop == 0) {
            this.position = 'startPos';
        }
        else {
            this.position = 'scrollStart';
        }
    }

    navToSearch() {
        console.log(123);
        this.router.navigateByUrl('/search');
    }
}


