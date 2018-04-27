import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CounterModule, TimedCounterServiceConfiguration } from 'example-module'; // tslint:disable-line:no-implicit-dependencies

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CounterModule
    ],
    providers: [
        { provide: TimedCounterServiceConfiguration, useValue: { autoIncrementInterval: 1000 } }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
