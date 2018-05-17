import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CounterService } from '../../services/counter.service';

@Component({
    selector: 'counter-display',
    templateUrl: 'counter-display.component.html',
    styleUrls: [ 'counter-display.component.scss' ]
})
export class CounterDisplayComponent {

    public counter: Observable<number>;

    constructor(counterService: CounterService) {
        this.counter = counterService.counter;
    }

}
