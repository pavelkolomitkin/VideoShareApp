import {Component, Input, OnInit} from '@angular/core';

import * as _ from 'underscore';

@Component({
  selector: 'app-form-field-error-list',
  templateUrl: './form-field-error-list.component.html',
  styleUrls: ['./form-field-error-list.component.css']
})
export class FormFieldErrorListComponent implements OnInit {

  @Input('errors') errorStore: Object;

  @Input('field') fieldName: string;

  _ = _;

  constructor() { }

  ngOnInit() {
  }

}
