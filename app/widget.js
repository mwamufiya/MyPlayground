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
var Widget = (function () {
    function Widget(componentFactoryResolver, viewContainer) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainer = viewContainer;
        this.isActive = false;
    }
    Widget.prototype.onclick = function (event) {
        this.viewContainer.element.nativeElement.classList.add('activeWidget');
        console.log('hello');
    };
    Widget.prototype.getChildren = function () {
        return this.children;
    };
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Widget.prototype, "onclick", null);
    Widget = __decorate([
        core_1.Component({
            selector: '[widget]',
            templateUrl: 'widget.component.html',
            styles: ["\n    :host{\n        display: flex;\n        border: 1px solid #CCC;\n        border-radius:3px;\n        padding:.25em;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
    ], Widget);
    return Widget;
}());
exports.Widget = Widget;
//# sourceMappingURL=widget.js.map