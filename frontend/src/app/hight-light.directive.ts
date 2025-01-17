import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHightLight]',
  standalone: true
})
export class HightLightDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.fontWeight = 'normal';
  }
}
