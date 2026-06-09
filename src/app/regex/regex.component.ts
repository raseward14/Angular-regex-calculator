import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

import { FlagsComponent } from '../flags/flags.component';

import type { Flag } from '../types';

@Component({
  selector: 'app-regex',
  imports: [ReactiveFormsModule, FormsModule, FlagsComponent],
  templateUrl: './regex.component.html',
  styleUrl: './regex.component.css',
})
export class RegexComponent {
  regexForm = new FormGroup({
    regexControl: new FormControl(''),
    testStringControl: new FormControl('this is a hard coded test string.'),
  });
  regexPattern = signal<string>('');
  chosenFlags = signal<string>('');

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
        tap((value) => {
          console.log('regex changed:', value);
          const pattern = this.regexControlValue;
          if (pattern) {
            try {
              const currentFlags = this.chosenFlags();

              const regex = new RegExp(pattern, currentFlags);
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
        }),
      )
      .subscribe({
        next: (value) => {
          console.log('value changed: ', value);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onChosenFlags(chosenFlags: any) {
    console.log('Chosen flags changed:', chosenFlags);
    // Handle the chosen flags as needed
    this.chosenFlags.set(chosenFlags.map((flag: Flag) => flag.name).join(''));
    console.log(this.chosenFlags());

    // manually trigger ta form value evaluation so the regex recalculates immediately when a user checks or unchecks a box
    this.regexForm.updateValueAndValidity();
  }
}
