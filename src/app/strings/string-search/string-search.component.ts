import { Component, signal, output } from '@angular/core';

import type { StringSearch } from '../../types';

@Component({
  selector: 'app-string-search',
  imports: [],
  templateUrl: './string-search.component.html',
  styleUrl: './string-search.component.css',
})
export class StringSearchComponent {
  setOperation = output<string>();
  calculatedOperation = signal('');

  stringSearches = [
    {
      search: 'indexOf(string)',
      description:
        'returns the index (position) of the first occurrence of the specified text in a string, or it returns -1 if the string is not found.',
    },
    {
      search: 'lastIndexOf(string)',
      description:
        'returns the index (position) of the last occurrence of the specified text in a string, or it returns -1 if the string is not found.',
    },
    {
      search: 'search(string)',
      description:
        'searches a string for a string (or a regular expression) and returns the position of the match.',
    },
  ];

  onMethodChange(search: StringSearch) {
    if (search.search !== this.calculatedOperation()) {
      this.calculatedOperation.set(search.search);
      this.setOperation.emit(this.calculatedOperation());
    } else {
      this.calculatedOperation.set('');
      this.setOperation.emit(this.calculatedOperation());
    }
    console.log(this.calculatedOperation());
  }
}
