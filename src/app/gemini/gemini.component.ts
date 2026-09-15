import { Component, inject, input, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI } from '@google/genai';
import { ApiKeyService } from './api-key.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.css',
})
export class Gemini implements OnInit {
  private http = inject(HttpClient);

  apiKey = input.required<string>();
  private ai!: GoogleGenAI;

  userInput = '';
  messages = signal<{ role: string; text: string }[]>([]);
  private documentContent = '';

  ngOnInit() {
    this.ai = new GoogleGenAI({ apiKey: this.apiKey() });

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
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.6-flash',
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
