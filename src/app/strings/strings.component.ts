import { Component, signal, computed, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppOpenCloseComponent } from '../app-open-close/app-open-close.component';
import { StringSearchComponent } from './string-search/string-search.component';
import { StringMethodsComponent } from './string-methods/string-methods.component';

@Component({
  selector: 'app-strings',
  imports: [FormsModule, AppOpenCloseComponent, StringSearchComponent, StringMethodsComponent],
  standalone: true,
  templateUrl: './strings.component.html',
  styleUrl: './strings.component.css',
})
export class StringsComponent {
  calculatedOperation = signal('');
  userInput = signal('');
  position = signal(0);
  string = signal('');
  startPosition = signal(0);
  endPosition = signal(0);
  count = signal(0);
  newString = signal('');

  itemsList: string[] = ['JS String Methods', 'JS String Search'];

  messageReceived(operation: string) {
    this.calculatedOperation.set(operation);
  }

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

  hasLengthAndStringParameter = computed(() => {
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('(length, "string")')) {
      return false;
    }
    return true;
  });

  hasCountParameter = computed(() => {
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('count')) {
      return false;
    }
    return true;
  });

  hasMultipleStringParameters = computed(() => {
    if (!this.calculatedOperation()) {
      return false;
    } else if (!this.calculatedOperation().includes('("old string", "new string")')) {
      return false;
    }
    return true;
  });

  resolvedOperation = computed(() => {
    let method = this.calculatedOperation();
    console.log('resolved operation method: ', method);
    if (method === 'length') {
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

    if (method.includes('(length, "string")')) {
      return (
        'text' + method.replace('length, "string"', `${this.endPosition()}, "${this.string()}"`)
      );
    }

    if (method.includes('(count)')) {
      return 'text.' + method.replace('count', this.count().toString());
    }

    if (method.includes('("old string", "new string")')) {
      return (
        'text.' +
        method.replace(
          '("old string", "new string")',
          `("${this.string()}", "${this.newString()}")`,
        )
      );
    }

    // fallback for methods that don't require parameters
    return 'text.' + method;
  });

  calculatedResult = computed(() => {
    const posNum = Number(this.position());
    const stringValue = String(this.string());
    const startNum = Number(this.startPosition());
    const endNum = Number(this.endPosition());
    const countNum = Number(this.count());
    const newStringValue = String(this.newString());
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
        return this.userInput().substr(startNum, endNum);
      case 'toUpperCase()':
        return this.userInput().toUpperCase();
      case 'toLowerCase()':
        return this.userInput().toLowerCase();
      case 'isWellFormed()':
        return this.userInput().isWellFormed();
      case 'toWellFormed()':
        return this.userInput().toWellFormed();
      case 'trim()':
        return this.userInput().trim();
      case 'trimStart()':
        return this.userInput().trimStart();
      case 'trimEnd()':
        return this.userInput().trimEnd();
      case 'padStart(length, "string")':
        console.log('user input unpadded: ', this.userInput());
        console.log('user input padded: ', this.userInput().padStart(endNum, stringValue));
        return this.userInput().padStart(endNum, stringValue);
      case 'padEnd(length, "string")':
        console.log('user input unpadded: ', this.userInput());
        console.log('user input padded: ', this.userInput().padEnd(endNum, stringValue));
        return this.userInput().padEnd(endNum, stringValue);
      case 'repeat(count)':
        return this.userInput().repeat(countNum);
      case 'replace("old string", "new string")':
        return this.userInput().replace(stringValue, newStringValue);
      case 'replaceAll("old string", "new string")':
        return this.userInput().replaceAll(stringValue, newStringValue);
      case 'split(string)':
        console.log(stringValue);
        console.log(this.userInput().split(stringValue));
        let splitResult = JSON.stringify(this.userInput().split(stringValue));
        console.log('split result: ', splitResult);
        return splitResult;
      case 'indexOf(string)':
        return this.userInput().indexOf(stringValue);
      case 'lastIndexOf(string)':
        return this.userInput().lastIndexOf(stringValue);
      case 'search(string)':
        console.log('searching for: ', stringValue);
        return this.userInput().search(stringValue);
      default:
        return '';
    }
  });
}
