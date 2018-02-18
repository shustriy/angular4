import { Injectable } from '@angular/core';
import { createStore } from 'redux';
import { combineReducers } from 'redux'
import * as Immutable from 'immutable';

import * as CounterActions from './counter.actions';

@Injectable()
export class AppStore {

  private appStore: any;

  constructor() {

    let counterReducer = (state: number = 0, action) => {
      console.log('counterReducer', action, state);
      switch (action.type) {
        case CounterActions.INCREMENT:
          console.log('INC');
          return ++state;
        case CounterActions.DECREMENT:
          console.log('DEC');
          return --state;
        case CounterActions.INCREMENT_ODD:
          console.log('INC_ODD');
          return (state % 2 != 0) ? ++state : state;
        default:
          console.log('DEFAULT');
          return state;
      }
    };

    this.appStore = createStore(counterReducer);
  }

  get store() {
    return this.appStore;
  }

  public getNumber() {
    return this.appStore.getState();
  }

}