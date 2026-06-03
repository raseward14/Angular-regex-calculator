import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-regex',
  imports: [ReactiveFormsModule],
  templateUrl: './regex.component.html',
  styleUrl: './regex.component.css',
})
export class RegexComponent {
  regexForm = new FormGroup({
    regexControl: new FormControl(''),
    regexPattern: new FormControl(''),
    testStringControl: new FormControl('this is a hard coded test string.')
  }
  )
  regexPattern = '';

  private destroyRef = inject(DestroyRef);

  get regexControlValue() {
    return this.regexForm.get('regexControl')?.value ?? '';
  }

  get testStringValue() {
    return this.regexForm.get('testStringControl')?.value ?? '';
  }

  get regexPatternValue() {
    return this.regexForm.get('regexPattern')?.value ?? '';
  }

  constructor() {
    const subscription = this.regexForm.valueChanges
      .pipe(
        debounceTime(500), // Wait for 500ms of inactivity
        tap(value => {
          console.log('regex changed:', value);
          const pattern = this.regexControlValue;
          if (pattern) {
            try {
              const regex = new RegExp(pattern, 'g');
              const matches = this.testStringValue.match(regex);
              this.regexPattern = matches ? matches.join('') : 'No matches found';
              console.log('Matches found:', this.regexPattern);
            } catch (error) {
              console.error('Invalid regex pattern:', error);
              this.regexPattern = 'Invalid regex pattern';
            }
          } else {
            this.regexPattern = '';
          }
        })
      ).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

}
