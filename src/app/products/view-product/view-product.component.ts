import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

productId: string=''//getting whole data using id assign id to a variable
product:any={}//in console result appear in object format, so parameter is created in object format
  //VIEW PRODUCT click chayyumbbo corresponding id complete details varaan inject ActivatedRoute, page open time datas come - ngOnit
  constructor(private viewactivatedRoute:ActivatedRoute ,private api:ApiService){}
  ngOnInit(): void {

    //getting id using activated routes
    //viewactivatedRoute(using activated route obtain data in params ).subscribe(say what next)
    this.viewactivatedRoute.params.subscribe((data:any)=>{
      console.log(data.id);//to get id only data.id
      this.productId=data.id;//1
      
    })

    ////api il id passed as parameter paass chaydu koduthaalle evide this.product id(that id edukkan saadikkkuga) we can  use passed product id
    this.api.viewproduct(this.productId).subscribe((result:any)=>{
      console.log(result);//in console result apperar in object format
      this.product=result;//to implement this in html result passed to a parameter
      
    },
    (result:any)=>{//data varatha case
      console.log(result.error);//backendil result inside we set chayda kaaryam workaaavum ies data not present case catch block 
      
    }
    )
}

addtowishlist(){

  //data destructure chaydu kodukka
  const {id,title,price,image}= this.product//view chayda product nee yan add chayyunnad wishlisleekk , viewed product details contain inside products
  //api call , parameter pass chayyunnu , data comes subscribil kodukkunnu
  this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  }
  
  )//go to html of this create a btn click event function  call laaan this work chayyenddadd 
}

addtocart(product:any){
  //add quantity
Object.assign(product,{quantity:1})


  console.log(product);
  this.api.addtocart(product).subscribe((result:any)=>{
    this.api.cartcount()//btn clicickil addto cart code ann product ne add chayyunnad ,nammal craete chayda 
    //count function call chayda add chayyumbbo thanne cartile count change aavuum.
    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  }
  )
  
}


}


