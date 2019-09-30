import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-salon-item',
  templateUrl: './salon-item.component.html',
  styleUrls: ['./salon-item.component.scss'],
})
export class SalonItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input()
    salonName: string;
  @Input()
    salonDescription: string;
  @Input()
    salonImage: string;
  @Input()
    id: string;

}
