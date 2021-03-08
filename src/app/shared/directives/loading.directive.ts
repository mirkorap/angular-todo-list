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
  @Input('appLoading') loading = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(NgxSpinnerComponent);
    const component = this.viewContainer.createComponent(factory);
    component.instance.fullScreen = false;
    component.instance.type = 'pacman';
    component.instance.size = 'medium';
    this.loading && this.ngxSpinner.show();
  }
}
