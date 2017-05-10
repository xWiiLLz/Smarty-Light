import { Component, Input, OnInit } from '@angular/core';
import { Lightbulb }    from './lightbulb';
import { LightbulbService } from './lightbulb.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'lightbulbs-list',
    templateUrl: './lightbulbs-list.component.html',
    styleUrls: ['./lightbulbs-list.component.css']
})

export class LightbulbsListComponent implements OnInit {
    constructor(private lightbulbService: LightbulbService){}
    
    lightbulbs: Lightbulb[];
    getLightbulbs(): void{
        this.lightbulbService.getLightbulbs().then(lightbulbs => {
            this.lightbulbs = lightbulbs;
            setTimeout(() => 
            {
                this.getLightbulbs();
            },
            2000);
        });
        
        
    }
    ngOnInit(): void{
        this.getLightbulbs();
    }
}