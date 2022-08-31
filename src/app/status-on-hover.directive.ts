import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[statusOnHover]'
})
export class StatusOnHoverDirective implements OnInit{

  @Input() status!:boolean;
  private color!: String;
  private cursor!: String;

  constructor(
    public el: ElementRef
  ) { }

  ngOnInit(): void {
    this.color = this.status ? "#b5ff78" : "#ff4d4d";
    this.cursor = this.status ? "pointer" : "not-allowed";
  }
  

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.color;
    this.el.nativeElement.style.cursor = this.cursor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = "";
    this.el.nativeElement.style.cursor = "";
  }
}
