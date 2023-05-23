import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {



  //allproducts enna arrayaan o/p aayittu return chayyunnad , so  any of array kodukka  , any[]
  //searchterm -> enter chayyunna values
  //propertyName - > eddu category vechittu search chayyunand , here we use title (adilaan product name ullad)
  transform(allProducts:any[],searchTerm:string,propertyName:string): any[] {
    
    const result:any[]=[];//create an empty array 

    if(!allProducts || searchTerm=='' || propertyName=='')//propertyName=='' (null)
    {//edenngilum kaaryam empty yaanengill
      return allProducts//user search chayyuuna onnum array illatha case display all products stored in database
    }

    //allProducts all data taken to a variable (here item) and check searching item present in that  variable

    //trim(to remove white space) , lowercase or uppercase conversion chayyananm - when searching time and item present in data

    allProducts.forEach((item:any)=>{//allproducts enna array nagathee complete products forEach() vaacchu nookunnu
      //item thil check chayyanam propertyname ->product name ne trim chayaynmm,trim,convert to lowercase ,includesil user enter chayyunna serach term unddonn nookaanm ,also search chayyaunna product neeyum trim chayya,convert to lowercase
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
      {//check propertyName content same as that of user entered search item
        
        //annengill oru variable leek kodukkendad that item thee 
        result.push(item)//item is pished to the created empty arary result

      }
  })

    return result;//then go to allproduct html page leek poovva allProducts ind e koode
  }

}

