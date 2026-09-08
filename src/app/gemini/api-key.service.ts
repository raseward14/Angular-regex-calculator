// api-key.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiKeyService {
  private readonly STORAGE_KEY = 'GEMINI_API_KEY';

  apiKey = signal<string>(localStorage.getItem(this.STORAGE_KEY) ?? '');

  setKey(key: string) {
    this.apiKey.set(key);
    localStorage.setItem(this.STORAGE_KEY, key);
  }

  clearKey() {
    this.apiKey.set('');
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
