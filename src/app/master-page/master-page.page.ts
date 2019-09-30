import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import consts from '../config/consts';

@Component({
    selector: 'app-master-page',
    templateUrl: './master-page.page.html',
    styleUrls: ['./master-page.page.scss'],
})
export class MasterPagePage implements OnInit {
    
    response: any;
    master: any;
    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.http.get(consts.url + 'app.php?action=getMasterInfo&id=' + id)
            .subscribe(data => {
                this.master = data;
                console.log(this.master);
            })
    }

    ngOnInit() {
    }

}
