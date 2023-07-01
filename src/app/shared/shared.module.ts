import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    SearchPipe
  ],
  exports : [
    FilterPipe,
    SearchPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
