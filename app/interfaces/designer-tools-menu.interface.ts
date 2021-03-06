import { WidgetConfig } from '../widgets/widget.interface'

export interface DesignerToolsMenuInterface{
    value:string;
    label:string;
    title:string;
    isActive:boolean;
    click:string;
    icon:string;
    isRoot:boolean;
    draggable:boolean;
    widgetConfig?:WidgetConfig;
    children:Array<DesignerToolsMenuInterface>;
}