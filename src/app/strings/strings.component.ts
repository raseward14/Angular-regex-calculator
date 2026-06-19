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
  position = signal(0);
  resolvedOperation = signal('');

  hasParameters = computed(() => {
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('position')) {
      return false;
    }

    return true;
  });

  stringMethods = [
    { method: 'length', description: 'property returns the length of a string' },
    {
      method: 'at(position)',
      description:
        'method returns the character at a specific index (position) in a string. Allows negative indexes.',
    },
    {
      method: 'charAt(position)',
      description:
        'method returns the character at a specific index (position) in a string. Does not allow negative indexes.',
    },
    {
      method: 'charCodeAt()',
      description: 'returns the code of the character at a specific index in a string.',
    },
    {
      method: 'codePointAt()',
      description: 'get code point value at the first position in a string.',
    },
    { method: 'concat()', description: 'use instead of the plus operator.' },
    {
      method: '[]',
      description:
        'property access. makes strings look like arrays. no char found returns undefined while charAt() returns an empty string. Read only.',
    },
    { method: 'slice()', description: '' },
    { method: 'substring()', description: '' },
    { method: 'substr()', description: '' },
    { method: 'toUpperCase()', description: '' },
    { method: 'toLowerCase()', description: '' },
    { method: 'isWellFormatted()', description: '' },
    { method: 'toWellFormatted()', description: '' },
    { method: 'trim()', description: '' },
    { method: 'trimStart()', description: '' },
    { method: 'trimEnd()', description: '' },
    { method: 'padStart()', description: '' },
    { method: 'padEnd()', description: '' },
    { method: 'repeat()', description: '' },
    { method: 'replace()', description: '' },
    { method: 'replaceAll()', description: '' },
    { method: 'split()', description: '' },
  ];

  calculatedResult = computed(() => {
    switch (this.calculatedOperation()) {
      case 'length':
        return this.userInput().length;
      default:
        return '0';
    }
  });

  onMethodChange(method: StringMethod) {
    if (method.method !== this.calculatedOperation()) {
      this.calculatedOperation.set(method.method);
    } else {
      this.calculatedOperation.set('');
    }
    console.log(this.calculatedOperation());
    console.log(this.hasParameters());
  }
}
