import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-regex',
  imports: [FormsModule],
  templateUrl: './regex.component.html',
  styleUrl: './regex.component.css',
})
export class RegexComponent {
  regex = '';
  testString = 'this is a hard coded test string';
}
