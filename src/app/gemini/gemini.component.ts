import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI } from '@google/genai';
import { ApiKeyService } from './api-key.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.css',
})
export class Gemini {
  private http = inject(HttpClient);
  private apiKeyService = inject(ApiKeyService);
  private ai: GoogleGenAI | null = null;

  userInput = '';
  messages = signal<{ role: string; text: string }[]>([]);
  private documentContent = '';

  private getClient(): GoogleGenAI {
    if (!this.ai) {
      const key = this.apiKeyService.apiKey();
      if (!key) throw new Error('No API key set');
      this.ai = new GoogleGenAI({ apiKey: key });
    }
    return this.ai;
  }

  ngOnInit() {
    console.log('Gemini component initialized', this.ai);
    // 1. Fetch your local static resource (e.g., public/assets/doc.txt or doc.json)
    this.http
      .get('assets/static-data.json', { responseType: 'json' })
      .subscribe((content: any) => (this.documentContent = content.stringMethods));
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const query = this.userInput;
    this.messages.update((m) => [...m, { role: 'User', text: query }]);
    this.userInput = '';

    try {
      const response = await this.getClient().models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          systemInstruction: `You are a helpful assistant answering questions about this document:\n\n${this.documentContent}`,
        },
      });
      this.messages.update((m) => [...m, { role: 'AI', text: response.text || '' }]);
    } catch (err) {
      console.error(err);
    }
  }
}
