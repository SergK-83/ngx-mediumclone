import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[userAvatarDefault]'
})
export class UserAvatarDefaultDirective {
  @Input() defaultUrl = 'assets/smile.jpg';

  constructor(private elem: ElementRef) {}

  @HostListener('error') onError(): void {
    this.elem.nativeElement.src = this.defaultUrl;
  }
}
