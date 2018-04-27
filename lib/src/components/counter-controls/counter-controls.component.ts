import { Component } from '@angular/core';

import { CounterService } from '../../services/counter.service';

@Component({
    selector: 'counter-controls',
    templateUrl: 'counter-controls.component.html',
    styleUrls: [ 'counter-controls.component.scss' ]
})
export class CounterControlsComponent {

    constructor(private readonly counterService: CounterService) {

    }

    public incrementCounter(): void {
        this.counterService.increment();
    }

    public decrementCounter(): void {
        this.counterService.decrement();
    }

}
