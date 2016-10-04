"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var DesignerGlobalsService = (function () {
    function DesignerGlobalsService(http) {
        var _this = this;
        this.http = http;
        //We need to create a 'Hot' observable to allow for subscription to occur at different intervals
        this.selItemList = [];
        this._selItemObservable = new Observable_1.Observable(function (observer) {
            _this.selItemObserver = observer;
        }).share();
    }
    DesignerGlobalsService.prototype.getDraggedObject = function () {
        return this.draggedObject;
    };
    DesignerGlobalsService.prototype.setDraggedObject = function (obj) {
        this.draggedObject = obj;
    };
    DesignerGlobalsService.prototype.getDraggedWidgetType = function () {
        return this.draggedWidgetType;
    };
    DesignerGlobalsService.prototype.setDraggedWidgetType = function (type) {
        this.draggedWidgetType = type || 'text';
    };
    DesignerGlobalsService.prototype.setDraggedWidgetJSON = function (json) {
        this.draggedWidgetConfig = json;
    };
    DesignerGlobalsService.prototype.getDraggedWidgetJSON = function () {
        return this.draggedWidgetConfig;
    };
    //this may be needed if the native "elementFromPoint" turns out to not be sufficient.
    /*setDraggedOverObject(node:Node){
        this.draggedOverObject = node;
    }
    getDraggedOverObject():Node{
        return this.draggedOverObject;
    }*/
    //if "Append" is specified it means this item should be added to the list of items.
    DesignerGlobalsService.prototype.setSelectedComponent = function (widget, append) {
        //If the item being added already exists in the selected list do nothing
        var alreadyExists = (this.selItemList.indexOf(widget) == -1) ? false : true;
        if ((alreadyExists == true && append == true)
            || (this.selItemList.length == 1 && alreadyExists == true))
            return;
        //clear the existing list of items by default, otherwiwse we will append a value.    
        if (append == true)
            this.selItemList.push(widget);
        else
            this.selItemList = [widget];
        this.selItemObserver.next(this.selItemList);
    };
    DesignerGlobalsService.prototype.getSelectedItemsObservable = function () {
        return this._selItemObservable;
    };
    DesignerGlobalsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DesignerGlobalsService);
    return DesignerGlobalsService;
}());
exports.DesignerGlobalsService = DesignerGlobalsService;
//# sourceMappingURL=designer-globals.service.js.map