import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { first } from 'rxjs/operators';

import { TimedCounterServiceConfiguration } from '../models/timed-counter-service-configuration.model';
import { CounterService } from './counter.service';
import { TimedCounterService } from './timed-counter.service';

const TIMED_COUNTER_SERVICE_CONFIGURATION: TimedCounterServiceConfiguration = {
    autoIncrementInterval: 2500
};

describe('timed counter service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: TimedCounterServiceConfiguration, useValue: TIMED_COUNTER_SERVICE_CONFIGURATION },
                { provide: CounterService, useClass: TimedCounterService }
            ]
        }).compileComponents();
    });

    it('automatically increments the counter over time', fakeAsync(inject([CounterService], (counterService: TimedCounterService) => {

        counterService.counter.pipe(first()).subscribe((value) => {
            expect(value).toBe(0);
        });

        tick(1000);

        counterService.counter.pipe(first()).subscribe((value) => {
            expect(value).toBe(0);
        });

        tick(1000);

        counterService.counter.pipe(first()).subscribe((value) => {
            expect(value).toBe(0);
        });

        tick(1000);

        counterService.counter.pipe(first()).subscribe((value) => {
            expect(value).toBe(1);
        });

        tick(1000);

        counterService.counter.pipe(first()).subscribe((value) => {
            expect(value).toBe(1);
        });

        counterService.stop();

    })));

});
