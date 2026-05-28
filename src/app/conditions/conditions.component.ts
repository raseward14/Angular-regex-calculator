import { Component } from '@angular/core';

type regexObject = {
  id: number,
  description: string
}

@Component({
  selector: 'app-conditions.component',
  imports: [],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.css',
})
export class ConditionsComponent {
  regexConditions: regexObject[] = [
    {
      id: 0,
      description: 'Includes any digit 0-9'
    },
    {
      id: 1,
      description: 'Any whitespace character (spaces, tabs, line breaks)'
    },
    {
      id: 2,
      description: 'Any alphanumeric character plus underscore (equivalent to [a-zA-Z0-9_])'
    }
  ]
}
