import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../_services';
import { User , UserDashboard} from '../_models';

@Component({selector: 'user', templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    userDashboard!: UserDashboard[];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll()
            .subscribe(userDashboard => this.userDashboard = userDashboard.message.user_data);
    }

    deleteUser(id: string) {
        const user = this.userDashboard.find(x => x.id === id);
        if (!user) return;
        user.isDeleting = true;
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.userDashboard = this.userDashboard.filter(x => x.id !== id));
            
    }
}