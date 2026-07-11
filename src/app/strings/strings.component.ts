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
  string = signal('');
  startPosition = signal(0);
  endPosition = signal(0);

  stringMethods = [
    { method: 'length', description: 'property returns the length of a string' },
    {
      method: 'at(position)',
      description:
        'method returns the character at a specific index (position) in a string. Allows negative indexes. Introduced in ES2022.',
    },
    {
      method: 'charAt(position)',
      description:
        'method returns the character at a specific index (position) in a string. Does not allow negative indexes.',
    },
    {
      method: 'charCodeAt(position)',
      description:
        'returns a UTF-16 code (integer between 0 and 65535) of the character at a specific index in a string.',
    },
    {
      method: 'codePointAt(position)',
      description: 'get code point value at the first position in a string.',
    },
    {
      method: 'concat(string)',
      description: 'joins two or more strings. use instead of the plus operator.',
    },
    {
      method: '[position]',
      description:
        'property access. makes strings look like arrays. no char found returns undefined while charAt() returns an empty string. Read only. str[0] = "A" gives no error (but does not work!)',
    },
    {
      method: 'slice(start, end)',
      description:
        'extracts part of a string. returns the extracted part in a new string. zero indexed. (end not included)',
    },
    {
      method: 'substring(start, end)',
      description: 'similar to slice(), but treats start and end values less than 0 as 0.',
    },
    {
      method: 'substr(start, length)',
      description:
        'similar to slice(). Second parameter specifies the length of the extracted part. Deprecated in the latest JavaScript standard. Still officially defined for backward compatibility. Use substring() or slice() instead. If you omit the second paramteter, will slice out the rest of the string. If the first parameter is negative, the position counts from the end of the string.',
    },
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

  hasStartAndLengthPositions = computed(() => {
    console.log('calculated operation: ', this.calculatedOperation());
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('start, length')) {
      return false;
    }
    return true;
  });

  hasStartAndEndPositions = computed(() => {
    console.log('calculated operation: ', this.calculatedOperation());
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('start, end')) {
      return false;
    }
    return true;
  });

  hasPositionParameter = computed(() => {
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('position')) {
      return false;
    }
    return true;
  });

  hasStringParameter = computed(() => {
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('(string)')) {
      return false;
    }
    return true;
  });

  resolvedOperation = computed(() => {
    let method = this.calculatedOperation();

    if (method === 'length') {
      console.log(method);
      return 'text.length';
    }

    if (method.includes('(position)')) {
      return 'text.' + method.replace('position', this.position().toString());
    }

    if (method.includes('(string)')) {
      return 'text.' + method.replace('string', `"${this.string().toString()}"`);
    }

    if (method.includes('(start, end)')) {
      return (
        'text.' + method.replace('start, end', `${this.startPosition()}, ${this.endPosition()}`)
      );
    }

    if (method.includes('(start, length)')) {
      return (
        'text.' + method.replace('start, length', `${this.startPosition()}, ${this.endPosition()}`)
      );
    }

    if (method.includes('[position]')) {
      return 'text' + method.replace('position', this.position().toString());
    }

    return method;
  });

  calculatedResult = computed(() => {
    const posNum = Number(this.position());
    const stringValue = String(this.string());
    const startNum = Number(this.startPosition());
    const endNum = Number(this.endPosition());
    switch (this.calculatedOperation()) {
      case 'length':
        return this.userInput().length;
      case 'at(position)':
        return this.userInput().at(posNum);
      case 'charAt(position)':
        return this.userInput().charAt(posNum);
      case 'charCodeAt(position)':
        return this.userInput().charCodeAt(posNum);
      case 'codePointAt(position)':
        return this.userInput().codePointAt(posNum);
      case '[position]':
        return this.userInput()[posNum];
      case 'concat(string)':
        return this.userInput().concat(stringValue);
      case 'slice(start, end)':
        return this.userInput().slice(startNum, endNum);
      case 'substring(start, end)':
        return this.userInput().substring(startNum, endNum);
      case 'substr(start, length)':
        console.log(this.userInput().substr(startNum, endNum));
        return this.userInput().substr(startNum, endNum);
      default:
        return '';
    }
  });

  onMethodChange(method: StringMethod) {
    if (method.method !== this.calculatedOperation()) {
      this.calculatedOperation.set(method.method);
    } else {
      this.calculatedOperation.set('');
    }
    console.log(this.calculatedOperation());
    console.log('start and end or length parameters: ', this.hasStartAndEndPositions());
    console.log('position parameter: ', this.hasPositionParameter());
    console.log('string parameter: ', this.hasStringParameter());
  }
}
