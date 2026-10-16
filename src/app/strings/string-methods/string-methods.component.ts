import { Component, signal, computed, output } from '@angular/core';

import type { StringMethod } from '../../types';

@Component({
  selector: 'app-string-methods',
  imports: [],
  templateUrl: './string-methods.component.html',
  styleUrl: './string-methods.component.css',
})
export class StringMethodsComponent {
  setOperation = output<string>();
  calculatedOperation = signal('');

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
    { method: 'toUpperCase()', description: 'A string is converted to upper case.' },
    { method: 'toLowerCase()', description: 'A string is converted to lower case.' },
    {
      method: 'isWellFormed()',
      description:
        'returns true if a string is well formed. Otherwise it returns false. A string is not well formed if it contains lone surrogates. In UTF-16 encoding, characters are represented using 16-bit code units. Some characters are represented using two code units, called a surrogate pair. A lone surrogate is a code unit that is not part of a valid surrogate pair. Valid Pair: \uD83D\uDE00 correctly combines a high and a low surrogate to render the Grinning Face emoji (😀). Lone Surrogate: \uD83D or \uDE00 printed completely on its own, or two high surrogates next to each other like \uD83D\uD83D',
    },
    { method: 'toWellFormed()', description: 'converts a string to well formed.' },
    { method: 'trim()', description: 'removes whitespace from both ends of a string.' },
    { method: 'trimStart()', description: 'removes whitespace from the beginning of a string.' },
    { method: 'trimEnd()', description: 'removes whitespace from the end of a string.' },
    {
      method: 'padStart(length, "string")',
      description: 'pads a string with another string at the beginning.',
    },
    {
      method: 'padEnd(length, "string")',
      description: 'pads a string with another string at the end.',
    },
    {
      method: 'repeat(count)',
      description:
        'repeats the string a specified number of times. Does not change the original string, instead creates a new string.',
    },
    {
      method: 'replace("old string", "new string")',
      description:
        'replaces a specified value with another value in a string. Only replace the first occurrence of the specified value. Returns a new string, does not change the original string.',
    },
    {
      method: 'replaceAll("old string", "new string")',
      description: 'replaces all occurrences of a specified value with another value in a string.',
    },
    { method: 'split(string)', description: 'splits a string into an array of substrings.' },
  ];

  onMethodChange(method: StringMethod) {
    if (method.method !== this.calculatedOperation()) {
      this.calculatedOperation.set(method.method);
      this.setOperation.emit(this.calculatedOperation());
    } else {
      this.calculatedOperation.set('');
      this.setOperation.emit(this.calculatedOperation());
    }
    console.log(this.calculatedOperation());
  }
}
