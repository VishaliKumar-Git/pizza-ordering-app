import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pizza } from '../model/product';
import { ProductStoreService } from '../services/product-store.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  pizzaList: pizza[] = [];
  pizzaListStoreObj: pizza[] = [];

  constructor(private store: ProductStoreService,
    private prdService: ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  addItem(code: number, pizzaObj: pizza) {
    if(this.getIndex(code) === -1) {
      this.pizzaListStoreObj.push(pizzaObj);
      this.store.updatePizzaList(this.pizzaListStoreObj);
      this.openSnackBar('Item added in the menu list!');
    } else {
      this.openSnackBar('Item already added in the menu list!');
      return;
    }
  }

  removeItem(code: number) {
    let index = this.getIndex(code);
    if(index >= 0) {
      this.pizzaListStoreObj.splice(index, 1);
      this.store.updatePizzaList(this.pizzaListStoreObj);
      this.openSnackBar('Item removed from the menu list!');
    } else {
      this.openSnackBar('Item not available in the menu list!');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
      duration: 1000
    });
  }

  getIndex = (code: number) => {
    console.log(this.pizzaListStoreObj.findIndex(obj => obj.code === code))
    return this.pizzaListStoreObj.findIndex(obj => obj.code === code); 
  }

  private loadData(): void {
    this.prdService.getproducts().subscribe(data => {
      this.pizzaList = data.products;
    }, error => {
      console.error(error);
      this.pizzaList = [];
    });

    this.store.getPizzaList().subscribe(data => {
      this.pizzaListStoreObj = data;
    }, error => {
      console.error(error);
      this.pizzaListStoreObj = [];
    });
  }
}
