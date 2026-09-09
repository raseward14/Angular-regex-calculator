import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

import { FlagsComponent } from './flags/flags.component';
import { CharactersComponent } from './characters/characters.component';

import type { Flag } from '../types';

@Component({
  selector: 'app-regex',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, FlagsComponent, CharactersComponent],
  templateUrl: './regex.component.html',
  styleUrl: './regex.component.css',
})
export class RegexComponent {
  regexForm = new FormGroup({
    regexControl: new FormControl(''),
    testStringControl: new FormControl('this is a hard coded test string.'),
  });

  matchingPatterns = signal<string>('');
  chosenFlags = signal<string>('');

  private destroyRef = inject(DestroyRef);

  get regexControlValue() {
    return this.regexForm.get('regexControl')?.value ?? '';
  }

  get testStringControlValue() {
    return this.regexForm.get('testStringControl')?.value ?? '';
  }

  constructor() {
    const subscription = this.regexForm.valueChanges
      .pipe(
        debounceTime(500), // Wait for 500ms of inactivity
        tap((value) => {
          const pattern = this.regexControlValue;
          const testString = this.testStringControlValue;
          console.log('regexControlValue: ', pattern);
          console.log('testStringControlValue: ', testString.split('\n'));
          if (pattern) {
            try {
              const currentFlags = this.chosenFlags();
              const isMultiline = currentFlags.includes('m');

              const regex = new RegExp(pattern, currentFlags);
              let matches;

              isMultiline
                ? (matches = this.regexForm.controls.testStringControl.value?.match(regex))
                : (matches = this.regexForm.controls.testStringControl.value
                    ?.split('\n')[0]
                    ?.match(regex));

              console.log(isMultiline, currentFlags, 'matches: ', matches);

              this.matchingPatterns.set(matches ? matches.join('\n') : 'No matches found');
              // console.log('Matches found:', this.matchingPatterns);
            } catch (error) {
              this.matchingPatterns.set('Invalid regex pattern');
            }
          } else {
            this.matchingPatterns.set('');
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
    // Handle the chosen flags as needed
    this.chosenFlags.set(chosenFlags.map((flag: Flag) => flag.name).join(''));

    // manually trigger ta form value evaluation so the regex recalculates immediately when a user checks or unchecks a box
    this.regexForm.updateValueAndValidity();
  }
}
