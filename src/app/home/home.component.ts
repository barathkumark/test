import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ selector: 'home',
templateUrl: 'home.component.html',
styleUrls: ['home.component.scss'] })
export class HomeComponent {

    constructor() { }

    ngOnInit() {
    }
}