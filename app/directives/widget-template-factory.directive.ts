import { Directive, OnInit, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {WidgetFactory} from '../widgets/widget-factory';

@Directive({
    selector: '[widgetFactory]',
    inputs: ['widgetConfig']
})

export class WidgetTemplateFactory implements OnInit{
    widgetConfig:any;

    constructor( private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainerRef:ViewContainerRef){

    }
    ngOnInit(){
        this.widgetConfig = this.widgetConfig;
        let componentFactory = new WidgetFactory().getWidgetFactory(this.componentFactoryResolver, this.widgetConfig.type);
        return this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
    }
}

