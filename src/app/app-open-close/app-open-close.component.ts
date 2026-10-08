import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'app-open-close',
  imports: [],
  templateUrl: './app-open-close.component.html',
  styleUrl: './app-open-close.component.css',
})
export class AppOpenCloseComponent {
  isOpen = signal(true);
  @Input() section: string = '';

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
