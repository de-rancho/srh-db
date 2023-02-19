import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(text: string, search): string {
    const pattern = search
        .replace(/[\-\[\]\/{}()*+?.\\^$|]/g, '\\$&')
        .split(' ')
        .filter(t => t.length > 0)
        .join('|');
    const regex = new RegExp(pattern, 'gi');
    // console.log(text, search);
    return search ? text.replace(regex, match => `<b class="highlight">${match}</b>`) : text;
  }
}
