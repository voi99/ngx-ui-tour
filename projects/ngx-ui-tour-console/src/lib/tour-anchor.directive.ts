import {
  TourAnchorDirective,
  TourService,
  IStepOption,
  TourBackdropService,
  TourState
} from 'ngx-ui-tour-core';
import {Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
  selector: '[tourAnchor]',
})
export class TourAnchorConsoleDirective implements OnInit, OnDestroy, TourAnchorDirective {

  @Input() public tourAnchor: string;

  @HostBinding('class.touranchor--is-active')
  public isActive = false;

  constructor(
      private tourService: TourService,
      public element: ElementRef,
      private tourBackdrop: TourBackdropService
  ) {}

  public ngOnInit(): void {
    this.tourService.register(this.tourAnchor, this);
  }

  public ngOnDestroy(): void {
    this.tourService.unregister(this.tourAnchor);
  }

  // noinspection JSUnusedGlobalSymbols
  public showTourStep(step: IStepOption): void {
    this.isActive = true;

    if (step.enableBackdrop) {
      this.tourBackdrop.show(this.element);
    } else {
      this.tourBackdrop.close();
    }

    console.group(step.title);
    console.log(step.content);
    console.log(`${step.placement || 'above'} ${this.tourAnchor}`);
    console.groupEnd();
  }

  public hideTourStep(): void {
    this.isActive = false;
    if (this.tourService.getStatus() === TourState.OFF) {
      this.tourBackdrop.close();
    }
  }
}
