import { Component } from '@angular/core';
import { Gemini } from '../gemini/gemini.component';

@Component({
  selector: 'app-footer',
  imports: [Gemini],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true,
})
export class FooterComponent {}
