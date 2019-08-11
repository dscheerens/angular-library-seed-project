import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CounterService } from './counter.service';

@Injectable()
export class SimpleCounterService implements CounterService {
    private readonly counterSubject = new BehaviorSubject(0);

    public get counter(): Observable<number> {
        return this.counterSubject.asObservable();
    }

    public increment(): void {
        this.counterSubject.next(this.counterSubject.value + 1);
    }

    public decrement(): void {
        this.counterSubject.next(this.counterSubject.value - 1);
    }
}
