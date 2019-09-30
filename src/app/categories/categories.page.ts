import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import consts from '../config/consts';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

    categoryName: string;
    salons: any;
    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('name');
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.http.get(consts.url + 'app.php?action=getCategoryInfo&id=' + id)
            .subscribe(data => {
                this.salons = data;
                this.salons = this.salons.map(i => {
                    i.gallery = JSON.parse(i.gallery);
                    return i;
                })
            })
    }

    ngOnInit() {
    }

}
