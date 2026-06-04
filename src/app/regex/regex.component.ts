import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-regex',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './regex.component.html',
  styleUrl: './regex.component.css',
})
export class RegexComponent {
  regexForm = new FormGroup({
    regexControl: new FormControl(''),
    testStringControl: new FormControl('this is a hard coded test string.')
  }
  )
  regexPattern = signal<string>('');

  private destroyRef = inject(DestroyRef);

  get regexControlValue() {
    return this.regexForm.get('regexControl')?.value ?? '';
  }

  get testStringValue() {
    return this.regexForm.get('testStringControl')?.value ?? '';
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
              this.regexPattern.set(matches ? matches.join('\n') : 'No matches found');
              console.log('Matches found:', this.regexPattern);
            } catch (error) {
              console.error('Invalid regex pattern:', error);
              this.regexPattern.set('Invalid regex pattern');
            }
          } else {
            this.regexPattern.set('');
          }
        })
      ).subscribe({
        next: (value) => {
          console.log('value changed: ', value);
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

}
