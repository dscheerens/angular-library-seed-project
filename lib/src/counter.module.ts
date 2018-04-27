import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CounterControlsComponent } from './components/counter-controls/counter-controls.component';
import { CounterDisplayComponent } from './components/counter-display/counter-display.component';
import { CounterService } from './services/counter.service';
import { TimedCounterService } from './services/timed-counter.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CounterControlsComponent,
        CounterDisplayComponent
    ],
    exports: [
        CounterControlsComponent,
        CounterDisplayComponent
    ],
    providers: [
        { provide: CounterService, useClass: TimedCounterService }
    ]
})
export class CounterModule {

}
