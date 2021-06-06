import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { pizza } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  constructor() { }

  private pizzaList$: BehaviorSubject<any> = new BehaviorSubject([]);
  private cart$: BehaviorSubject<any> = new BehaviorSubject(null);

  getPizzaList(): Observable<pizza[]> {
    return this.pizzaList$.asObservable().pipe(distinctUntilChanged());
  }

  updatePizzaList(pizzaList: pizza[]) {
    this.pizzaList$.next(pizzaList);
  }
  
  getCart(): Observable<any> {
    return this.cart$.asObservable().pipe(distinctUntilChanged());
  }

  updateCart(cartFormValue: any) {
    this.cart$.next(cartFormValue);
  }

}
