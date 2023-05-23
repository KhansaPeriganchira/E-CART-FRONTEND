import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  showPaypal:boolean=false;
  showSuccess:boolean = false;
//html pagileek dispaly chaayyaan
totalprice:number=0//create a variable to store grandtotal , initial price set as 0
allcartitems:any=[]//array ayyittu type assigned beczz result items type array aan
paymentstatus:boolean=false;
offerstatus:boolean=false;
//offer btn click chayyumbooyaan true aavendee
discountstatus:boolean=true;


//defined as class variable eggile html lil interpolate chayyan saadikku
username:string=''
housenumber:string=''
street:string=''
pincode:string=''
state:string=''

public payPalConfig?: IPayPalConfig;

//import { ReactiveFormsModule } from '@angular/forms'; , imort this in productmodule to use FormBuilder , for  form validation .
//FormBuilder -> dependency injection chaydu
  constructor(private api:ApiService ,private cartFB:FormBuilder){}

addressform=this.cartFB.group({
  username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
  street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]

})

  ngOnInit(): void {
    
    this.initConfig();

 
   this.api.getcart().subscribe((result:any)=>{
    console.log(result);//cart nde pagil console chayyumbbo add aaya products kittum
    this.allcartitems=result;//edine depend chaydu iterate chayyippikenddad *ngFor  , html pagileek display cahayyan

    //call get cart total price
    this.getcarttotal()
    console.log(this.totalprice);
    
//to see cartcount when items added to cart
    this.api.cartcount()
//     //function is called whenn cart items getting time in cart pagil call getcarttotal
// this.getcarttotal()

    
   },
   (result:any)=>{
    console.log(result.error);
    
   }
   )
  }




// ngOnInit() inside kodukkendda nammukk just trashil click chayyumbbo item delete ayaaal madee

  removecartitem(id:any){//id pass chaayanam , id koduthaale edu item ne delete chayyendee nn ariyuu
    this.api.removecartitem(id).subscribe((result:any)=>{//angane oru value vanna next enddu chayyum subscribe ennittu resultil kodukka value
     console.log(result);
     alert("deleted item from cart")
     
      this.allcartitems=result//remaining cart items after deletion assigned to here 
  
      //cart count set api lulla cartcount() ne called to decrement cart count while deleting item
      this.api.cartcount()
      //cartile items delete cahyyumbbo total decrement chayyan we call this function
      this.getcarttotal()
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }//this function call chayyuga cart html trash btn click event aayittu


  //function to get cart grand total
getcarttotal(){
  //last aan total kitta so variable to store that 
  let total=0
  //cart inside products now consist in allcartitems(array)
  this.allcartitems.forEach((item:any)=>{//each item kaanam so use foreach() method a variable taken item (all come to this)
    //each item have grandtotal  , sum=sum+i format (total)
    total=total+item.grandTotal//total  , just calulate chaydu kittunnad totalil varum ,or  total += item.grandTotal //total
    //totalprice lekku assing chydu total nee, to string interpolate in html page
    this.totalprice=Math.ceil(total)//to remove decimal and give rounded value use Math.ceil()
  })

}//this function ne call in getcart() function call ,bez grandtotal is needed at the same time items added to the cartil dislay chayyumbool


incrementcount(id:any){
  this.api.incrementcount(id).subscribe((result:any)=>{
    this.allcartitems=result;//updated + remaining edileek varum
    this.api.cartcount()
 this.getcarttotal()

  },
  (result:any)=>{
    alert(result.error)
  }
  
  )

}


decrementcount(id:any){
  this.api.decrementcount(id).subscribe((result:any)=>{
    this.allcartitems=result;//updated + remaining edileek varum
    this.api.cartcount()
 this.getcarttotal()

  },
  (result:any)=>{
    alert(result.error)
  }
  
  )
}

  submitform(){
    if(this.addressform.valid)
    {
      this.paymentstatus=true
      //form valid aayaal btn clickil , paymentstatus  appo true aayitt set chayyuga, paymentstatus true aavunna case il complete form hide aavanam(appo form nde div il !paymentstatus ennu kodukka)
       console.log(this.addressform);
       //"" -> empty string
       this.username=this.addressform.value.username||""
       this.housenumber=this.addressform.value.housenumber||""
       this.street=this.addressform.value.street||""
       this.pincode=this.addressform.value.pincode||""
       this.state=this.addressform.value.state||""

    }
    else{
      alert('Please provide valid details')
    }
  }
  offers(){//offer btn click chayyummboo true aavanam appo only discount images dispaly chaydaal madee
    
    
    this.offerstatus=true//value ne true aaki set chaydu
    this.discountstatus=false
  }

  discounts(value:any)
  {
this.totalprice=Math.ceil(this.totalprice*(100-value)/100)

this.discountstatus=true
  }

  makepayment(){
    this.showPaypal=true
  }
  
  modalclose(){
    //modal close chayuuna time all reset aavum
    this.addressform.reset()
this.showPaypal=false
this.showSuccess=false
this.paymentstatus=false
  }
  


  //paypal 
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      //any kodukka
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  



}

