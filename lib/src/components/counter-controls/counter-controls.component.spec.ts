import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { CounterModule } from '../../counter.module';
import { CounterService } from '../../services/counter.service';
import { SimpleCounterService } from '../../services/simple-counter.service';

import { CounterControlsComponent } from './counter-controls.component';

describe('counter controls component', () => {
    let fixture: ComponentFixture<CounterControlsComponent>;
    let rootElement: Element;
    let counterService: CounterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CounterModule
            ],
            providers: [
                { provide: CounterService, useClass: SimpleCounterService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CounterControlsComponent);
        rootElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    beforeEach(inject([CounterService], (injectedCounterService: CounterService) => {
        counterService = injectedCounterService;
    }));

    it('increments the counter when clicking the (+) button', async(() => {
        const incrementCounterButton = <HTMLElement> rootElement.querySelector('.counterControl--increment');

        expect(incrementCounterButton).not.toBeNull();

        let expectedCounterValue = 0;

        counterService.counter.pipe(take(5))
            .subscribe((counterValue) => {
                expect(counterValue).toBe(expectedCounterValue);

                expectedCounterValue++;
                incrementCounterButton.click();
            });
    }));

    it('decrements the counter when clicking the (-) button', async(() => {
        const decrementCounterButton = <HTMLElement> rootElement.querySelector('.counterControl--decrement');

        expect(decrementCounterButton).not.toBeNull();

        let expectedCounterValue = 0;

        counterService.counter.pipe(take(5))
            .subscribe((counterValue) => {
                expect(counterValue).toBe(expectedCounterValue);

                expectedCounterValue--;
                decrementCounterButton.click();
            });
    }));
});
