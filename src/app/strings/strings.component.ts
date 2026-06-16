import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { StringMethod } from '../types';

@Component({
  selector: 'app-strings',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './strings.component.html',
  styleUrl: './strings.component.css',
})
export class StringsComponent {
  userInput = signal('');
  calculatedOperation = signal('');
  stringMethods = [
    { method: 'length', description: 'property returns the length of a string' },
    {
      method: 'at(position)',
      description:
        'method returns the character at a specific index (position) in a string. Allows negative indexes.',
    },
    {
      method: 'chatAt(position)',
      description:
        'method returns the character at a specific index (position) in a string. Does not allow negative indexes.',
    },
  ];

  calculatedResult = computed(() => {
    return this.userInput().length;
  });

  onMethodChange(method: StringMethod) {
    console.log(method.method);
    if (method.method !== this.calculatedOperation()) {
      this.calculatedOperation.set(method.method);
    } else {
      this.calculatedOperation.set('');
    }
    console.log(this.calculatedOperation());
  }
}
