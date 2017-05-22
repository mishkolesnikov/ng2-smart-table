import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'input-filter',
  template: `
    <input [(ngModel)]="query"
           [ngClass]="inputClass"
           [formControl]="inputControl"
           class="form-control"
           type="text"
           placeholder="{{ column.title }}" />
  `,
})
export class InputFilterComponent extends DefaultFilter implements OnInit {

  inputControl = new FormControl();

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputControl.valueChanges
      .distinctUntilChanged()
      .debounceTime(this.delay)
      .skip(1)
      .subscribe((value: string) => this.setFilter());
  }
}
