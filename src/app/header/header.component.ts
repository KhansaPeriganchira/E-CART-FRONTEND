import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
//type cahyyumbboll event koduthu keyup , (keyup)="search($event)" 

cartitem:number=0

//api le search term edukkan inject chaydu api nee here
constructor(private api:ApiService){}

  ngOnInit(): void {//start chayyunmbbol thanne work aaavan ngonit il koduthu
    
    //apile  cartitemcount edukkunnu from api service ninnu , that value comes to data 
  this.api.cartitemcount.subscribe((data:any)=>{
    //initially header component zero , product add chayyunnadinanausarichh 

    console.log(data);//7  , initially header component cartcount = 0 (set initially) 
    this.cartitem=data// used for string interpolate in html 
  })

  }

  search(event:any){
    //event ne just console chaydaal keyboardeventsil targetil aanu inputform ullad , so inside type chayyunnad kittaan -> event.target.value
   //typed content display event in console
    console.log(event.target.value);

    //to assign new values to the behaviour subject below way koduthaadd
    this.api.searchTerm.next(event.target.value);//stream of data(event.target.value => header il user search chyuunna values) is passsed in next() method of behaviour subject as parameter.
    //behaviour subject next enna methodil endaano pass chayyanullad adu kodukkaa , go to allproducts ts file
    
}

}
