import { Directive, 
    ElementRef, 
    Input, 
    HostListener, 
    ComponentFactoryResolver, 
    ComponentFactory, 
    ComponentRef,
    EmbeddedViewRef,
    TemplateRef,
EventEmitter, Output } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MakeDroppable} from './make-droppable.directive';
import { TextWidget } from './text-widget.component';
import { DesignerGlobalsService } from './designer-globals.service';

@Directive({
    selector: '[designerDroppable]',
    inputs: ['designerDroppable'],
    outputs: ['widgetAdded']
})

export class DesignerDroppable extends MakeDroppable{
    //childModified = new EventEmitter();
    el: null;
    draggOverHelper: Node;          //Dom element displayed when something is dragged over
    prvDraggedOverEl: Element       //Previously draged over element
    prvInsertionPoint: boolean      //insert item before or afte item being dragged over
    widgetAdded = new EventEmitter();
    reqInsertionPoint:Number;

    constructor(
        el: ElementRef,
        private viewContainer: ViewContainerRef,
        //public templateRef: TemplateRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver,
        private designerGlobals: DesignerGlobalsService
        ){
        super(el);
    }
    @HostListener('dragover', ['$event']) ondragover(event){
        if(this.isElligable(event)){
            super.ondragover(event);
            this.addDragOverHelper(event);
        }
        //Return false to prevent event propogation
        return false;
    }
    @HostListener('dragleave', ['$event']) ondragleave(event){
        super.ondragleave(event);
        this.removeDragOverHelper();
        return false;
    }
    @HostListener('drop', ['$event']) onDrop(event){
        super.ondrop(event);
        //Only add an child if a it meets our elligability rules
        if(this.isElligable(event))
            this.addWidget(event, this.designerGlobals.getDraggedWidgetJSON());

        this.removeDragOverHelper();
        //Return false to prevent event propogation
        return false;
    }
    //Notify parent that a new child has been added
    addWidget(event, widgetConfig: JSON){
        //get the index position of the current item to pass it along.
        //let index = Array.from(this.prvDraggedOverEl.parentNode.childNodes).indexOf(this.prvDraggedOverEl);
        console.clear();
        console.log(`Requested Index: ${this.reqInsertionPoint}`);
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el,
            insertionPoint: this.reqInsertionPoint,
            widgetConfig: widgetConfig            
        });
        //console.log(this.childModified);
    }
    getEl():ElementRef{
        return super.getEl();
    }
    isElligable(event){
        let isValid = true;
        //Do not allow an item to be dropped on itself to increse add a new child
        let draggedEventPath = this.designerGlobals.getDraggedObject();
        if(draggedEventPath[0]===event.path[0])
            isValid = false;

        //Do not allow a parent to be dragged into child elements
        if(event.path.length > draggedEventPath.length){
            let arr = [];

            //Compare the Event.path array to determine if the "Drop" container is a child of the item currently being dragged
            //This is not the most efficient approach, and should be reviewed. However given that the Drop.Event doesn't contain the "dragg" item it needs to be obtained somehow
            if(draggedEventPath[0]===event.path[(event.path.length - draggedEventPath.length)-1])
                arr = event.path.splice(0, (event.path.length - draggedEventPath.length)+1).reverse();  //Since any item being dragged into a child would be defined higher in the Event.path array, we reverse the array to make the query faster;
            else
                arr = event.path;

            for(let i=0; i<arr.length; i++){
                if(arr[i] === draggedEventPath[0]){
                    isValid = false;
                    return;
                }
            }
        }
        return isValid;
    }
    //Helper method to display a helper dom element when something is being dragged over.
    addDragOverHelper(event){
        //do nothing if we're already displaying an item
        
        let dropCont = super.getEl();
        let dropEl = dropCont.nativeElement as Element;
        //get the position of the Drop Element
        //let dropIndex = dropCont.nativeElement.parentNode.children().indexOf(dropCont.nativeElement); 

        //Get the position of the current item being dragged on
        let children = Array.from(dropCont.nativeElement.parentNode.childNodes as Array<Node>); 
        let position = children.indexOf(dropCont.nativeElement);                     
        children = null;

        //insert a temporary copy of the "Dragged" element to insert it.
        
        let draggedOverEl = document.elementFromPoint(event.clientX, event.clientY);
        let parentNode = draggedOverEl.parentNode as Element; 
        let validNonTextNodes = Array.from(parentNode.childNodes).filter(n => n.nodeType == 1);
        //Determine if we're inserting before or after the currently dragged over object
        let insertAfter = this.isInsertionPointAfter(draggedOverEl, event.clientX, event.clientY);
        //do nothing if the current Helper is still avlid based on mouse position 
        //Else, remove the previous one, and update the new position.
        
        //If the item currently being dragged over is teh drop target, then we must adjust where the helper is shown


        /*if(this.prvDraggedOverEl === draggedOverEl && insertAfter == this.prvInsertionPoint){
            console.log('no creating new helper');
            return;
        }else{*/
            this.removeDragOverHelper();
            this.prvInsertionPoint = insertAfter;
            this.prvDraggedOverEl = (draggedOverEl===dropEl)? dropEl : draggedOverEl;
        //}

        //Create the placeholderItem
        this.draggOverHelper = document.createElement(`hr`);

        if(insertAfter==false){
            let targetEl = draggedOverEl;
            //if the item is being dragged over the current drop zone, 
            //find the first child of this container and insert it before it.
            if(draggedOverEl === dropEl){
                dropEl.insertBefore(this.draggOverHelper, dropEl.childNodes[0] as Element);
                this.reqInsertionPoint = 0;    
            }else{
                parentNode.insertBefore(this.draggOverHelper, targetEl);
                this.reqInsertionPoint = validNonTextNodes.indexOf(targetEl);
            }

        }else{
            //IF there is no next sibling, then we must append this item as the last child in the parent container
            //ELSE we must get the next sibling in order to user "node.InsertBeore()" method
            let targetEl = dropEl;
            if(draggedOverEl === dropEl){
                dropEl.appendChild(this.draggOverHelper);
            }else{
                let lastSibling = draggedOverEl.nextSibling;
                if(lastSibling==null){
                    parentNode.appendChild(this.draggOverHelper);
                }else{
                    parentNode.insertBefore(this.draggOverHelper, lastSibling);
                    this.reqInsertionPoint = validNonTextNodes.indexOf(lastSibling);
                }
            }
        }
    }
    removeDragOverHelper(){
        if(this.draggOverHelper) {
            this.draggOverHelper.parentNode.removeChild(this.draggOverHelper);
            this.draggOverHelper = null;
        }
    }
    //Returns the "After or before" based on the position of the 
    isInsertionPointAfter(el:Element, eventX:Number, eventY:Number):boolean{
        let rect = el.getBoundingClientRect();
        let insertionPoint = true;
        //We will only insert before if the 'X' is to the left of the horizontal center
        //AND the 'y' is above the vertical center.
        if((eventX < rect.left+(rect.width/2)) && (eventY < rect.top+(rect.height/2)))
                insertionPoint = false;
        return insertionPoint;
    }
    /*addWidget(textWidget: { new(): TextWidget }): ComponentRef<TextWidget>{
        //this.viewContainer.
        let dialogComponentFactory = 
            this.componentFactoryResolver.resolveComponentFactory(textWidget);
        
        let tw = this.componentFactoryResolver.resolveComponentFactory(textWidget);
        
        //

        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory, this.viewContainer.length);
        //this.viewContainer.createEmbeddedView();
        //let tw = TemplateRef<{new(): TextWidget}>;
        //let dialogComponentRef = this.viewContainer.createEmbeddedView(@Query(textWidget));

        return dialogComponentRef;
    }*/
}