import { Component } from '@angular/core';

@Component({
  selector: 'app-characters',
  imports: [],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  characters = [
    { character: '//', meaning: 'regular expression - exact match default' },
    { character: '*', meaning: '0 or more (preceding)' },
    { character: '+', meaning: '1 or more (preceding)' },
    { character: '?', meaning: 'optional (preceding)' },
    { character: '.', meaning: 'matches anything (except line break)' },
    { character: '\\', meaning: 'escape regex syntax for character after' },
    { character: '\\w', meaning: 'word characters, equivalent to [a-zA-Z0-9_]' },
    { character: '\\W', meaning: 'non word characters' },
    { character: '\\s', meaning: 'white space' },
    { character: '\\S', meaning: 'non white space' },
    { character: '\\d', meaning: 'numeric digit' },
    { character: '\\D', meaning: 'non numeric digit' },
    { character: '{}', meaning: 'minimum & maximum length' },
    { character: '{4}', meaning: '4 word characters in a row' },
    { character: '{4,}', meaning: '4 word characters in a row or more' },
    { character: '{4,5}', meaning: 'string between 4 and 5 characters long' },
    { character: '()', meaning: 'character grouping' },
    { character: '[]', meaning: 'list characters to match' },
    { character: '^', meaning: 'match the beginning of the chunk' },
    { character: '$', meaning: 'match the end of the chunk' },
    { character: '(?<=at)', meaning: 'positive look behind (cursor at end of string)' },
    { character: '(?<!at)', meaning: 'negative look behind (cursor at end of string)' },
    { character: '(?=at)', meaning: 'positive look ahead (cursor at beginning of string)' },
    { character: '(?!at)', meaning: 'negative look ahead (cursor at beginning of string)' },
    { character: '(?:)', meaning: 'non capture group' },
  ];
}
