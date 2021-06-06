import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pizza } from '../model/product';
import { ProductStoreService } from '../services/product-store.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  cartForm: any;

  public pizzaList: pizza[] = [];

  constructor(
    private store: ProductStoreService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
    this.formInit();
  }

  addToCart(index: number) {
    if (this.pizzaList[index].quantity <= 0) {
      this.openSnackBar('Item Not Avaiable right now! Please try later!');
      return;
    } 
    this.addItem(this.pizzaList[index].code, 1);
    --this.pizzaList[index].quantity;
    this.store.updateCart(this.cartForm.value);
  }

  removeFromCart(index: number) {
    if (this.removeItem(this.pizzaList[index].code)) {
      ++this.pizzaList[index].quantity;
      this.store.updateCart(this.cartForm.value);
    } else {
      this.openSnackBar('Item Not Added in the Cart!');
    } 
  }

  getSelectedQuantity = (code : number) => {
    let index = this.getIndexAndQauntity(code);
    return index >= 0 ? this.getItem().at(this.getIndexAndQauntity(code)).get('quantity')?.value : 0;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
      duration: 1000
    });
  }


  private addItem(code: number, quantity: number) {
    let index = this.getIndexAndQauntity(code);
    if (index >= 0) {
      let quantity = this.getItem().value[index].quantity;
      this.getItem().at(index).get('quantity')?.setValue(++quantity);
    } else {
      this.getItem().push(this.newItem(code, quantity));
    }
  }

  private removeItem(code: number) {
    let index = this.getIndexAndQauntity(code);
    if (index >= 0) {
      let quantity = this.getItem().value[index].quantity;
      this.getItem().at(index).get('quantity')?.setValue(--quantity);
      if (quantity <= 0) {
        this.getItem().removeAt(index);
      }
      return true;
    }
    return false;
  }

  private getIndexAndQauntity = (code: number): number => {
    return this.getItem().controls.findIndex(ctrl => ctrl.get('code')?.value === code);
  }

  private getItem(): FormArray {
    return this.cartForm.get("items") as FormArray
  }

  private newItem(code: number, quantity: number): FormGroup {
    return this.fb.group({
      quantity: quantity,
      code: code
    })
  }

  private formInit(): void {
    this.cartForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  private loadData(): void {
    this.store.getPizzaList().subscribe(data => {
      this.pizzaList = data;
      this.pizzaList.sort((a,b) => (a.code > b.code) ? 1 : -1)
    }, error => {
      console.error(error);
      this.pizzaList = [];
    });
  }

}
