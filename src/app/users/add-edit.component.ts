import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineAll, first } from 'rxjs/operators';

import { UserService } from '../_services';
// import { MustMatch } from '../_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        // private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;


        this.form = this.formBuilder.group({
            user_name: ['', Validators.required],
            user_email: ['', [Validators.required, Validators.email]],
        });

        if (!this.isAddMode) {
            this.userService.getAll()
            .subscribe((data) => {
                if (data && data.result == 'success') {
                    this.form.patchValue( data.message.user_data.find(x => x.id == this.id));
                }
                else {
                    console.log(data)
                }
            })
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onAddSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.userService.create(this.f.user_name.value, this.f.user_email.value)
            .subscribe((data) => {
                if (data && data.result == 'success') {
                    // this.alertService.success('User added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                }
                else {
                    console.log(data)
                }
            })
            .add(() => this.loading = false);
    }

    private updateUser() {
        this.userService.update(this.id, this.f.user_name.value, this.f.user_email.value).subscribe((data) => {
            if (data && data.result == 'success') {
                // this.alertService.success('User updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            }
            else {
                console.log(data)
            }
        })
        .add(() => this.loading = false);
    }
}