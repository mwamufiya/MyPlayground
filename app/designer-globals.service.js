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
var DesignerGlobalsService = (function () {
    function DesignerGlobalsService(http) {
        this.http = http;
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
    DesignerGlobalsService.prototype.setDraggedOverObject = function (node) {
        this.draggedOverObject = node;
    };
    DesignerGlobalsService.prototype.getDraggedOverObject = function () {
        return this.draggedOverObject;
    };
    DesignerGlobalsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DesignerGlobalsService);
    return DesignerGlobalsService;
}());
exports.DesignerGlobalsService = DesignerGlobalsService;
//# sourceMappingURL=designer-globals.service.js.map