import { Category } from './models/Category.js';
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

questions = [];
/*** @type {Category[]} */
categories = [];
/*** @type {Category} */
activeCategory = null;
}

export const AppState = createObservableProxy(new ObservableAppState())