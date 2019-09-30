import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import consts from '../config/consts';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    salons: any = [];
    masters: any = [];
    response: any;
    filteredMasters: any = [];
    filteredSalons: any = [];
    searchWord;
    chosenSegment = 'salons';
    constructor(private httpClient: HttpClient) {
        this.httpClient.get(consts.url + 'app.php?action=getAll')
            .subscribe(data => {
                this.response = data;
                this.salons = this.response.salons;
                this.salons = this.salons.map(i => {
                    i.gallery = JSON.parse(i.gallery);
                    return i;
                });
                this.filteredSalons = this.salons;
                this.masters = this.response.masters;
                this.filteredMasters = this.masters;
            })
    }

    ngOnInit() {
    }

    segmentChanged(event) {
        console.log(event);
    }
    
    makeFilter() {
        this.filteredSalons = this.salons.filter(item => {
            let original = item.name;
            item.name = item.name.toLowerCase();
            let search = this.searchWord.toLowerCase();
            if (item.name.indexOf(search) !== -1) {
                item.name = original;
                return item;
            }
        });

        this.filteredMasters = this.masters.filter(item => {
            let originalName = item.name;
            let originalProf = item.profession;
            item.name = item.name.toLowerCase();
            item.profession = item.profession.toLowerCase();
            let search = this.searchWord.toLowerCase();
            if (item.name.indexOf(search) !== -1 || item.profession.indexOf(search) !== -1) {
                item.name = originalName;
                item.profession = originalProf;
                return item;
            }
        })

    }
    
}
