import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CounterModule } from '../../counter.module';
import { CounterService } from '../../services/counter.service';
import { SimpleCounterService } from '../../services/simple-counter.service';

import { CounterDisplayComponent } from './counter-display.component';

describe('counter display component', () => {
    let fixture: ComponentFixture<CounterDisplayComponent>;
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
        fixture = TestBed.createComponent(CounterDisplayComponent);
        rootElement = fixture.nativeElement;
    });

    beforeEach(inject([CounterService], (injectedCounterService: CounterService) => {
        counterService = injectedCounterService;
    }));

    it('displays the current counter value from the injected counter service', () => {
        fixture.detectChanges();

        const counterValueElement = rootElement.querySelector('.counterDisplay');

        expect(counterValueElement).not.toBeNull();

        expect(getTextContext(counterValueElement)).toBe('0');

        counterService.increment();
        fixture.detectChanges();

        expect(getTextContext(counterValueElement)).toBe('1');

        counterService.increment();
        fixture.detectChanges();

        expect(getTextContext(counterValueElement)).toBe('2');

        counterService.decrement();
        fixture.detectChanges();

        expect(getTextContext(counterValueElement)).toBe('1');
    });

});

function getTextContext(element: Element | null): string | undefined {
    return element && element.textContent && element.textContent.trim() || undefined;
}
