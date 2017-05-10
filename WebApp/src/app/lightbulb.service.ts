import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Lightbulb } from './lightbulb';
@Injectable()

export class LightbulbService{

    private lightbulbsUrl = 'http://localhost:3000/lights';  // URL to web api

    constructor(private http: Http) { }

    getLightbulbs(): Promise<Lightbulb[]>{
        return this.http.get(this.lightbulbsUrl)
                    .toPromise()
                    .then(response => response.json() as Lightbulb[])
                    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any>{
        console.error('An error as occured', error); 
        return Promise.reject(error.message || error);
    }
}