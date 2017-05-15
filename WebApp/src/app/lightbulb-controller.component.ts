import { Component, Input, OnInit }    from "@angular/core";
import { ActivatedRoute, Params }       from '@angular/router';
import { Location }     from '@angular/common';
import { Lightbulb }         from './lightbulb';
import { LightbulbService }  from './lightbulb.service';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'lightbulb-controller',
    templateUrl: './lightbulb-controller.component.html',
    styleUrls: ['./lightbulb-controller.component.css']
})

export class LightbulbControllerComponent implements OnInit {
    constructor(
        private lightbulbService: LightbulbService,
        private route: ActivatedRoute,
        private location: Location
    ){}
    ngOnInit(): void{
        this.getLightbulb();
    }
    @Input() lightbulb: Lightbulb;
    goBack(): void{
        this.location.back();
    }
    

    getLightbulb(): void{
        this.route.params
        .switchMap((params: Params) => this.lightbulbService.getLightbulb(+params['id']))
        .subscribe(lightbulb => this.lightbulb = lightbulb)
            setTimeout(() =>
            {
                this.getLightbulb();
            },
            2000);
    }
    onChange(newValue: number) {
        this.lightbulbService.postLightbulb(this.lightbulb.id, this.lightbulb.red, this.lightbulb.green, this.lightbulb.blue);
    }
}