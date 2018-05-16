import { Observable } from 'rxjs';

export abstract class CounterService {

    public abstract get counter(): Observable<number>;

    public abstract increment(): void;

    public abstract decrement(): void;

}
