import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
// //to display in html apge result lulla data is stored in result , create a variable in class
//to hold wishlist data
  allwishlistitem:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {

    //page open timil itself wishlist leek added items display chayaynam ngonInitil koduthu

  this.api.getwishlistitems().subscribe((result:any)=>{
    console.log(result);
    //to display in html apge result lulla data is stored in result , create a variable in class
    this.allwishlistitem=result//assign array of items
  },
  (result:any)=>{//data not present
    console.log(result.error);
    
  }
  
  )
    
  }
  //before this create event in btn click function call with id pass chayaynam(wish.id)then only corresponding id varumbboll delete cahyya] of trash in html file
  //remove chayyanulla function
  removewishlistitem(id:any){
//id pass chaydiittu adinagath data undeengill next what to do subscribe il parannu koduthuu
    this.api.removewishlistitem(id).subscribe((result:any)=>{
       console.log(result);
       this.allwishlistitem=result//remove chaydadinu after ulla array assigned to here , array after removing items assigned to this
       alert("Product Removed")
      
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  addtocart(product:any){
    //add quantity
  Object.assign(product,{quantity:1})
  
  
    console.log(product);
    this.api.addtocart(product).subscribe((result:any)=>{
      this.api.cartcount()//btn clicickil addto cart code ann product ne add chayyunnad ,nammal craete chayda 
      //count function call chayda add chayyumbbo thanne cartile count change aavuum.

      //cartileek add chayyan koduthal pinne that product wishlistil ninnum remove aavanm so call removewishlistitem function ne call chayyuu here .
      //wishlist item when added to cart then taht item must removed from wishlist
      this.removewishlistitem(product.id)//product.id nn kodukka , evide vannad product aan(object) adinde id edukka
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
    
  }


}
