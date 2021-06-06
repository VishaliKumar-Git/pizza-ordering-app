import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutModalComponent } from '../checkout-modal/checkout-modal.component';
import { ProductStoreService } from '../services/product-store.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  cartForm: any;
  addedCartItems: number = 0;

  constructor(private prdService: ProductService,
    private store: ProductStoreService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
    this.subscribeCart();
  }

  openDialog(): void {
    if (this.cartForm && this.cartForm.items && this.cartForm.items.length > 0) {
      const dialogRef = this.dialog.open(CheckoutModalComponent, {
        data: { cartForm: this.cartForm }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  private subscribeCart(): void {
    this.store.getCart().subscribe(data => {
      this.cartForm = data;
      this.addedCartItems = data?.items ? data.items.length : 0;
    });
  }

  /**
   * Loading Products list from Json and updating the store
   */
  private loadData(): void {
    this.prdService.getproducts().subscribe(data => {
      this.store.updatePizzaList(data.products);
    }, error => {
      console.error(error);
    });
  }

}
