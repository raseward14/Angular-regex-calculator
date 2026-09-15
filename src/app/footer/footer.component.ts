import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gemini } from '../gemini/gemini.component';

import { ApiKeyService } from '../gemini/api-key.service';

@Component({
  selector: 'app-footer',
  imports: [Gemini, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true,
})
export class FooterComponent implements OnInit {
  private apiKeyService = inject(ApiKeyService);

  storedKey = signal<string>('');
  keyInput = '';

  ngOnInit() {
    this.storedKey.set(this.apiKeyService.apiKey());
  }

  submitKey() {
    this.apiKeyService.setKey(this.keyInput);
    this.storedKey.set(this.keyInput.trim());
    this.keyInput = '';
  }

  clearKey() {
    this.apiKeyService.clearKey();
    this.storedKey.set('');
  }
}
