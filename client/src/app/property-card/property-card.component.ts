import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property:any = null;
  @Output() eventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  deletePropertyBtnClick(id) {
    this.eventEmitter.emit(id);
  }

}
