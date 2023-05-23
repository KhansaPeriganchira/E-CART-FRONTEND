import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{


  allProducts:any=[]//array yaayittu oru variable create chaydu
searchTerm:string=''//define empty searchterm to assign result


  constructor(private api:ApiService){}
//api ll define chayda funtion define/call  chayyanam, pinne page ope chayyunna timil thanne page open timil thanne allproducts page display chayyanam
//for that function defined inside ngOnInit , impliements ngOnInit kodukka inside class , quick fix it


ngOnInit(): void {

  //function nde call inside this koduthu
  this.api.getallproducts().subscribe((result:any)=>{///result il data varunnadaan ,result type :any
    console.log(result);//just console logil varrunndo check chayyan front-endil allproducts page inspect chayya array of 20 products displayed there
    this.allProducts = result//allProducts enna variableek result lulla array of data asssign aayee
  })

  //api il craete chayda searchterm value assigned to here
    this.api.searchTerm.subscribe((result:any)=>{//api le searchtermil data present annel subscribe enddu chayyanam ennu parannu kodukkunnu , data resultil varunnu
    //then data assigned to empty variable of string type created above in class
    this.searchTerm=result
    console.log(this.searchTerm);//now kodukkunna kaaaryangal in header(topil search chayyummbo ) and allproduct sil ninnum stream of data console il varaan thudangi
//*go to all products html file where *ngFor il  filter:searchTerm:'title' ennu kodukka.
  })
 
  
  
}
//just data pass chaydaal madee , page open chayyumbbo vendaa so ngOnInit koduthilla
addtocart(product:any){
  //to check this fun workin or not we console product
  console.log(product);//product details varunnd , vere page lott pass avvunnd and edil ninnum nammukk required data ne cart pagil display cahyyikkanam 
  //quantity not present now in console we have to add it
  //there is a method ***assign***  (used to add key value pair to alredy existing object) to add a key value(ayyittu object leek add cahyyan) to object
  
  // btn clickil quantity add chayya , add quantity
  //asign is a method consist 2 parameters target(object to which copied to),source(pass chayyendda kaaryam)
//{quantity:1} -> quantity always passed as 1 , initially set as 1
  Object.assign(product,{quantity:1})//now we click add to cart btn icon in allproducts , console it we get quantity as 1.


  console.log(product);

  //api call chayyunnu , api ninnum edukunnu addtocart()fun ne , adilulla values edukaan product ennea object ne pass cahayyuga  ,adil values present then subscribe 
  this.api.addtocart(product).subscribe((result:any)=>{

    //call cartcount() function created in api here before alert
    this.api.cartcount()//btn clicickil addto cart nde code ann (product cartileek ne add chayyunnad) ,nammal craete chayda 
    //count function call chayda add chayyumbbo thanne cartile count change aavuum.
    alert(result)//result kittiyall alert msg varum backendil nammal set chayda resultil lee message in frontene allproduct pagil as alert
  },
  (result:any)=>{
    alert(result.error)
  }
  )
  
}

addtowishlist(product:any){

  //data destructure chaydu kodukka
  const {id,title,price,image}=product//view chayda product nee yan add chayyunnad wishlisleekk , viewed product details contain inside products
  //api call , parameter pass chayyunnu , data comes subscribil kodukkunnu
  this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  }
  
  )//go to html of this create a btn click event function  call laaan this work chayyenddadd 
}

  

}
