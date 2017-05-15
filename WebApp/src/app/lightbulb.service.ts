import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Lightbulb } from './lightbulb';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LightbulbService{

    private lightbulbsUrl = 'http://localhost:3000/lights';  // URL du serveur local (API)
    private lightbulbUniqueUrl = 'http://localhost:3000/lights/unique';
    constructor(private http: Http) { }

    getLightbulbs(): Promise<Lightbulb[]>{
        return this.http.get(this.lightbulbsUrl)
                    .toPromise()
                    .then(response => response.json() as Lightbulb[])
                    .catch(this.handleError);
    }

    getLightbulb(id: number): Promise<Lightbulb>{
        return this.http.get(`${this.lightbulbUniqueUrl}/${id}`)
                    .toPromise()
                    .then(response => response.json() as Lightbulb)
                    .catch(this.handleError);
    }

    postLightbulb(id: number, red: number, green: number, blue: number): void{
        console.log("FIRED POST");

        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.lightbulbsUrl,{
            id: id,
            red: red,
            green: green,
            blue: blue
        }, options).toPromise().then(response => console.log(response))
        .catch(this.handleError);   
    }

    private handleError(error: any): Promise<any>{
        console.error('An error as occured', error); 
        return Promise.reject(error.message || error);
    }
}