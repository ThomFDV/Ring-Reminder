import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    private url = 'https://5daf64b2f2946f001481d76e.mockapi.io/ring';

    constructor(private http: HttpClient) { }

    getRings(): Observable<any> {
        return this.http.get(this.url);
    }

    addRingToday(position: number, date: Date): any {
        return this.http.post(this.url, {
            number: position,
            createdAt: date
        });
    }
}
