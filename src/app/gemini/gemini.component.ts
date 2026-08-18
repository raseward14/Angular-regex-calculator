import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI } from '@google/genai';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.css',
})
export class Gemini {
  private http = inject(HttpClient);

  // Replace with your Google AI Studio key (for rapid prototyping only)
  private ai = new GoogleGenAI({ apiKey: process.env['GEMINI_API_KEY'] });

  userInput = '';
  messages = signal<{ role: string; text: string }[]>([]);
  private documentContent = '';

  ngOnInit() {
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
      // 2. Pass static text context via systemInstruction
      const response = await this.ai.models.generateContent({
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
