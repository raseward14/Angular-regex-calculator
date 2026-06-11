import { Component, Output, EventEmitter } from '@angular/core';

import type { Flag } from '../../types';

@Component({
  selector: 'app-flags',
  imports: [],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css',
})
export class FlagsComponent {
  flags = [
    { name: 'g', description: 'Global search' },
    { name: 'i', description: 'Case-insensitive search' },
    { name: 'm', description: 'Multi-line search' },
    { name: 's', description: 'Dot matches newline' },
    { name: 'u', description: 'Unicode search' },
    { name: 'y', description: 'Sticky search' },
  ];

  @Output() chosenFlags = new EventEmitter<Flag[]>();
  selectedFlags: Flag[] = [];

  onFlagChange(flag: Flag) {
    this.selectedFlags = this.selectedFlags.includes(flag)
      ? this.selectedFlags.filter((f) => f !== flag)
      : [...this.selectedFlags, flag];
    this.chosenFlags.emit(this.selectedFlags);
  }
}
