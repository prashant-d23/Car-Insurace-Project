import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: string[], searchTerm:string): any {
    if(searchTerm === ''){
      console.log("worked")
      return value;
    }else{
      console.log('else')
      value = value.filter((val:string) => val.includes(searchTerm))
      return value;
    }
  }

}
