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
        'returns the index (position) of the first occurrence of a string in a string, or it returns -1 if the string is not found.',
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
