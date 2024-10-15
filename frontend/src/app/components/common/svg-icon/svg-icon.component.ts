import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: `<svg [attr.viewBox]="viewBox"><use [attr.href]="iconUrl"></use></svg>`,
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent {
  @Input() iconUrl!: string;
  @Input() viewBox: string = '0 0 33 35'; // Default viewBox
}