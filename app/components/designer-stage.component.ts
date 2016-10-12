import { Component, ViewChild, ComponentFactoryResolver, ClassDefinition,
    ComponentFactory, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { Widget} from './widgets/widget.component'
import { DesignerToolsMenu} from './designer-tools-menu.component'
import { WidgetFactory} from './widgets/widget-factory';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { WidgetDrop } from '../interfaces/widget-drop.interface'
import { WidgetConfig } from '../interfaces/widgetJSON.interface';

/*****Entry Components****** */
import { BoxWidget} from './widgets/box.component';
import { ImageWidget } from './widgets/image.component';
import { VideoWidget} from './widgets/video.component';
import { TextboxWidget } from './widgets/textbox.component';

@Component({
  selector: 'designer-stage',
  templateUrl: './app/components/designer-stage.component.html',
  styleUrls: ['./app/components/designer-stage.component.css'],
  entryComponents:[ImageWidget, VideoWidget, BoxWidget, TextboxWidget]
})
export class DesignerStageComponent extends Widget{
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    childWidgets:Array<JSON>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService,
        private router: Router){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
            super.setBackgroundColor('white');
    }

    childModified(event:WidgetDrop){     
        //Loop through all items being added and add.
        for(let item of event.items){
            //get the proper widgetType
            let widgetType:string;
            let widgetConfig:WidgetConfig;
            //get the widget Config based on the type of item being added.
            //TODO: this should probably be moved to some sort of factory.
            switch(item.constructor.name){
                case "DesignerToolsMenu":
                    widgetConfig = (item as DesignerToolsMenu).widgetConfig as WidgetConfig;
                    break;
                case "Widget":
                    break;
            }
            let componentFactory = new WidgetFactory().createWidget(this.componentFactoryResolver, widgetConfig.type);
            let ref = this.container.createComponent(componentFactory);
            this.designerGlobals.setSelectedComponent(ref.instance, event.items.length? true : false);
            super.addChild(ref, widgetConfig);
        }
    }
}