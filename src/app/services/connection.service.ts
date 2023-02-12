import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Degree } from '../model/degree';
import { Module } from '../model/module';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {

    constructor(private http: HttpClient) {
    }

    getDegreeById(id: number): Observable<Degree> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const url = environment.API_URL + 'getDegreeById/' + id;
        return this.http.get<Degree>(url, {headers: httpHeaders});
    }

    getAllDegrees(): Observable<Degree[]> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const url = environment.API_URL + 'getAllDegrees';
        return this.http.get<Degree[]>(url, {headers: httpHeaders});
    }

    getAllModules(): Observable<Module[]> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const url = environment.API_URL + 'getAllModules';
        return this.http.get<Module[]>(url, {headers: httpHeaders});
    }

    addNewDegree(): Observable<any> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const url = environment.API_URL + 'getAllModules';
        return this.http.get<Module[]>(url, {headers: httpHeaders});
    }
}
