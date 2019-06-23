import { Component, Input } from '@angular/core';
import {Observable} from 'rxjs';

import { AppStore } from '../services/app.store';
import * as CounterActions from '../services/counter.actions';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  public number: number;

  constructor(
    protected appStore: AppStore
  ) {
    //console.log('constructor', this.appStore.store);
    this.number = 0;
    this.appStore.store.subscribe(() => {
      this.number = this.appStore.getNumber();
      //console.log('subscribe', this.appStore.store.getState());
    });
    this.appStore.state$.subscribe((data) => console.log('s1'));
    this.appStore.state$.subscribe((data) => console.log('s2'));
  }

  public onIncrement() {
    //console.log('onIncrement', this.appStore.store.getState());

    this.appStore.store.dispatch({ type: CounterActions.INCREMENT });
  }

  public onIncrementOdd() {
    console.log('onIncrementOdd', this.appStore.store.getState());
    this.appStore.store.dispatch({ type: CounterActions.INCREMENT_ODD });
  }

  public onIncrementAsync() {
    console.log('onIncrementAsync', this.appStore.store.getState());
    setTimeout(() => this.appStore.store.dispatch({ type: CounterActions.INCREMENT }), 1000);
  }

  public onDecrement() {
    console.log('onDecrement', this.appStore.store.getState());
    let number: number = this.appStore.getNumber();
    if (number>0) {
      this.appStore.store.dispatch({ type: CounterActions.DECREMENT });
    }
  }
}
