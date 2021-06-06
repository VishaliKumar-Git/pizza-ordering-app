import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pizza } from '../model/product';
import { ProductStoreService } from '../services/product-store.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  itemArr: any[] = [];
  pizzaList : pizza[]= [];

  constructor(
    public dialogRef: MatDialogRef<CheckoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: ProductStoreService) { }

  ngOnInit(): void {
    this.itemArr = this.data.cartForm.items;
    this.loadData();
  }

  getTotalAmount = () => {
    let sum = 0;
    this.itemArr.forEach((obj: any)=> {
      sum = sum + (obj.quantity * obj.item.price);
    }); 
    return sum;
  }

  private loadData(): void {
    this.store.getPizzaList().subscribe(data => {
      this.pizzaList = data;
      if(this.pizzaList && this.itemArr) {
        this.itemArr.forEach((obj: any)=> {
          obj.item = this.getPizzaObj(obj.code);
        });
      }
    });
  }

  getPizzaObj = (code: number) => {
    return this.pizzaList.find(obj => obj.code === code);
  }

}
