import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-open-close',
  imports: [],
  templateUrl: './app-open-close.component.html',
  styleUrl: './app-open-close.component.css',
})
export class AppOpenCloseComponent {
  isOpen = signal(true);
  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
