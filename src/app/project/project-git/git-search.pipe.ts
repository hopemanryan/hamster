import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gitSearch'
})
export class GitSearchPipe implements PipeTransform {

  transform(value: any[], searchVal: string): unknown {
    if(searchVal) {
      return value.filter(x => {
        if(x.authorName.toLowerCase().includes(searchVal.toLowerCase())) {
          return true
        }
        let filesExists = false;
        x.files.forEach(y => filesExists = y.toLowerCase().includes(searchVal.toLowerCase()))

        return filesExists;

      })
    } else {
      return value;
    }

  }

}
