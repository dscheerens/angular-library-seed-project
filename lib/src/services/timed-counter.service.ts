import { Injectable } from '@angular/core';

import { Subscription, interval } from 'rxjs';

import { TimedCounterServiceConfiguration } from '../models/timed-counter-service-configuration.model';
import { SimpleCounterService } from './simple-counter.service';

@Injectable()
export class TimedCounterService extends SimpleCounterService {

    private autoIncrementSubscription: Subscription | undefined;

    constructor(private readonly configuration: TimedCounterServiceConfiguration) {
        super();

        this.start();
    }

    public start(): void {
        if (!this.autoIncrementSubscription) {
            this.autoIncrementSubscription = interval(this.configuration.autoIncrementInterval)
                .subscribe(() => this.increment());
        }
    }

    public stop(): void {
        if (this.autoIncrementSubscription) {
            this.autoIncrementSubscription.unsubscribe();
            this.autoIncrementSubscription = undefined;
        }
    }

}
