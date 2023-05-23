import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  //path: '' indicates 4200 

  { path: '', component:AllProductsComponent },//here all products class name copy paste here
  
//4200/products/viewproducts
{
  path:'viewproducts/:id',component:ViewProductComponent
},

//evide slash nde '/' not required
{
  path:'wishlist',component:WishlistComponent
},


{
  path:'cart',component:CartComponent
}


];
//path: '' -> 4200

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
