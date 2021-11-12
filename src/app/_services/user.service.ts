import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, UserDashboard } from '@app/_models';

const baseUrl = `${environment.curdApiUrl}/`;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    // getAll(params: any) {
    //     // return this.http.get<UserDashboard[]>(baseUrl);
    //     return this.http.post<UserDashboard[]>(baseUrl, params);
    // }

    // create(params: any) {
    //     return this.http.post(baseUrl, params);
    // }

    // update(id: string, params: any) {
    //     return this.http.put(`${baseUrl}/${id}`, params);
    // }

        // getById(id: string) {
    //     return this.http.get<UserDashboard>(`${baseUrl}/${id}`);
    // }

    // delete(id: string) {
    //     return this.http.delete(`${baseUrl}/${id}`);
    // }
    
    getAll() {
        return this.http.post<any>(`${baseUrl}`, { schema_name: "angular_crud_test", action: 'get' })
            .pipe(map(data => {
                return data;
            }));
    }

    create(user_name: string, user_email: string) {
        return this.http.post<any>(`${baseUrl}`, { schema_name: "angular_crud_test", user_name, user_email, action: 'add' })
            .pipe(map(data => {
                return data;
            }));
    }

    update(user_id: string, user_name: string, user_email: string) {
        return this.http.post<any>(`${baseUrl}`, { schema_name: "angular_crud_test", user_id, user_name, user_email, action: 'edit' })
            .pipe(map(data => {
                return data;
            }));
    }

    delete(user_id: string) {
        return this.http.post<any>(`${baseUrl}`, { schema_name: "angular_crud_test", user_id, action: 'delete' })
            .pipe(map(data => {
                return data;
            }));
    }
    
}