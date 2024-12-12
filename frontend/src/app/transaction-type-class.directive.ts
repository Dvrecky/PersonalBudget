import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTransactionTypeClass]',
  standalone: true
})
export class TransactionTypeClassDirective implements OnChanges{
  @Input() transactionType!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {

    this.renderer.removeClass(this.el.nativeElement, 'expense');
    this.renderer.removeClass(this.el.nativeElement, 'income');

    if (this.transactionType === 'expense') {
      this.renderer.addClass(this.el.nativeElement, 'expense');
    } else if (this.transactionType === 'income') {
      this.renderer.addClass(this.el.nativeElement, 'income');
    }
  }

}
