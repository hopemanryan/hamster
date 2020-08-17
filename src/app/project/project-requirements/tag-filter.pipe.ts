import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dependFilter'
})
export class TagFilterPipe implements PipeTransform {

  transform(value: {name: string, version: string}[], searchVal: string): unknown {
    if(searchVal) {
      return value.filter(x => x.name.includes(searchVal) || x.version.includes(searchVal))
    }
    return value
  }

}
