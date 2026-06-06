import { Component } from '@angular/core';

type Flag = {
  name: string;
  description: string;
}

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
    { name: 'y', description: 'Sticky search' }
  ];

  selectedFlags: Flag[] = [];

  onFlagChange(flag: Flag) {
    this.selectedFlags = this.selectedFlags.includes(flag) ? this.selectedFlags.filter(f => f !== flag)
      : [...this.selectedFlags, flag];
    console.log('Selected flags:', this.selectedFlags.map(flag => flag.name).join(', '));
  }
}
