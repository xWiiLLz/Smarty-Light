import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<div class="col-sm-6"><h3>Liste d'ampoules connectées</h3>
              <lightbulbs-list></lightbulbs-list>
              </div>
              <div class="col-sm-6">
                <router-outlet></router-outlet>
              </div>
              `,
})
export class AppComponent  { name = 'Smarty-light'; }
