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
  ];
}
