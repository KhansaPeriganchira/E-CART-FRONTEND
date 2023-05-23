import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //first import , // import { BehaviorSubject } from 'rxjs';
  //define searchterm in api and assign an empty behaviour subject in to this
  //this Behaviour subject helps to hold stream of data(here search values)
searchTerm = new BehaviorSubject('')//go to header ts file to apply this


//logic : getcart() enna function undd adu vachu array nde length edukanam , ie assigned to this.
//create a function cartcount()
//in behavior subject always give a value otherwise it doesn't work
//to hold cart item count ,initially cart  item count set as 0
cartitemcount = new BehaviorSubject(0)


  constructor(private http:HttpClient) {
    //first this kaaryam nadakeendad , evide call chaydu ,constructor inside koduthall first thanne call aavumm(bezz constructor execute first)
    //function call time adu trigger aavuga
    this.cartcount()
   }//go to header ts

//set BASEURL to reduce path length , path parannu koduthu avoid '/' after 5000 
  BASE_URL='https://e-cart-tm1l.onrender.com'

  //api call for get all products , this api call is created for allproducts , so in it allproducts ts inject api
  getallproducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }
  viewproduct(id:any){//evide ninnum parameteril id pass chaayanunnd viewproduct tsileek
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }


  //api call for add to wishlist , sitil ulla data eduthittu again request chayyaan so that parameters pass chayyanam ie we requesting to there
//data edukkunnu
  addtowishlist(id:any,title:any,price:any,image:any){

    //body inside aayirikkum about data we are passing , so create body(in post method)
const body={

  id,title,price,image

}
//pass body along with request(ie we passing data)
   return this.http.post(`${this.BASE_URL}/wishlist/add-to-wishlist`,body)

  }

  //get all items from wishlist

  getwishlistitems(){
    return this.http.get(`${this.BASE_URL}/wishlist/get-wishlist`)
  }

  //remove item from wishlist , pass id also in function
  removewishlistitem(id:any){
    //function will return this
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-wishlist-item/${id}`)
  }

  //api call for add to cart
  addtocart(product:any){
    //product ne wishlist lil ninnum eduthitt cartileekk kodukkunnu,ies object of data ne yaan kodukkunne     
    //so product:any ayittu pass cahydu
    const body={

      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity//quantity must mention when add time ie how many time it get added
    
    }


    return this.http.post(`${this.BASE_URL}/cart/add-to-cart`,body)
  }
  

  //get cart items
  getcart(){
    return this.http.get(`${this.BASE_URL}/cart/get-item`)
  }

  //get cartil etra cart items undd kaanaam , cart count /items ennam kittum
  cartcount(){
    this.getcart().subscribe((result:any)=>{//get cart ulla arary edukkum varunna data ne variable result leek koduthu with type any, array of cart items
     //assigning result in to caritemcount using next method becz here we use behavior subject , in 
     // in next method we pass stream of data
      this.cartitemcount.next(result.length);//number of items in cart kittum

    })
  }//this functione call chayyanam to use it so call it in constructor 

//api call to removecartitems
removecartitem(id:any){
  return this.http.delete(`${this.BASE_URL}/cart/remove-item/${id}`)
}

//api call to increment count
incrementcount(id:any){
  return this.http.get(`${this.BASE_URL}/cart/increment-count/${id}`)

}

//api call to decrement count
decrementcount(id:any){
  return this.http.get(`${this.BASE_URL}/cart/decrement-count/${id}`)

}

}
