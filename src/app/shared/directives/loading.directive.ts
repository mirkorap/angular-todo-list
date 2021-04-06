import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit {
  @Input('appLoading') set loading(value: boolean) {
    this.toggleSpinner(value);
  }

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createSpinnerComponent();
  }

  // TODO: use spinner on service request
  private createSpinnerComponent(): void {
    const factory = this.resolver.resolveComponentFactory(NgxSpinnerComponent);
    const component = this.viewContainer.createComponent(factory);
    component.instance.type = 'pacman';
    component.instance.size = 'medium';
  }

  private toggleSpinner(canShow: boolean): void {
    canShow ? this.ngxSpinner.show() : this.ngxSpinner.hide();
  }
}
