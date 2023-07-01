import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: string[], searchTerm:string): string[] {
    if(searchTerm == ''){
      return value;
    }else{
      value = value.filter((val:string) => val.includes(searchTerm))
      return value;
    }
  }

}
