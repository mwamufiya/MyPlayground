/***************INSTRUCTIONS****************
 * 
 * The following should be considered when modifying the tools menu.
 * 
 * If you're adding a new tool type (Image, TextBox, Video)
 * 
 *      - It is NOT sufficient to simply add it in this JSON file.
 *      - The corresponding Classes must be modified/added in the following files.
 *              - app/components/widget/widget-page.component.ts Entry Components
 *                  - the entry components must be updated to include your new widget type
 *                  - Only Classes of type DesignerToolsMenu & classes that extend Widget are currently supported.
 *                      - To increase support, expand the switch statement in the "childModified" method
 *                  - This is required by Angular 2 
 *              - app/components/widgets/[toolType].component.ts needs to be added to
 *                  - this holds the logic for your new behavior
 *              - app/components/widgets/widget-factory.ts
 *                  - the "factoryMap" must be updated to reflect how the factory will map your text value to an Object  
 * 
 * 
 * */
export const MAIN_MENU = [
        {
            "value":"basic",
            "label":"Basic",
            "isActive": true,
            "children":[
                {
                    "value":"text",
                    "label": "Text",
                    "title": "Text Box",
                    "children":[
                        {
                            "value":"textboxwidget",
                            "label": "Text",
                            "title": "Text Box",
                            "isActive": true,
                            "draggable": true,
                            "icon": "text_fields",
                            "widgetConfig":{
                                "widgetType": "textboxwidget"
                            }
                        },
                        {
                            "value":"heading",
                            "label": "Heading",
                            "title": "Heading",
                            "isActive": false,
                            "draggable": true,
                            "icon": "header icon",
                            "widgetConfig":{
                                "widgetType": "heading"
                            }
                        },
                        {
                            "value":"imagewidget",
                            "label": "Image",
                            "isActive": true,
                            "draggable": true,
                            "icon": "photo_size_select_actual",
                            "widgetConfig":{
                                "widgetType": "imagewidget"
                            }
                        }
                    ]
                },
                {
                    "value":"container",
                    "label": "Container",
                    "title": "Container",
                    "children":[
                        {
                            "value":"boxwidget",
                            "label": "Box",
                            "title": "Box",
                            "icon": "picture_in_picture_alt",
                            "isActive": true,
                            "draggable": true,
                            "widgetConfig":{
                                "widgetType": "boxwidget"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "value":"media",
            "label":"Media",
            "isActive": true,
            "children":[
                {
                    "value":"videowidget",
                    "label": "Video",
                    "title": "Video",
                    "isActive": true,
                    "draggable": true,
                    "icon": "video_library",
                    "widgetConfig":{
                        "widgetType": "videowidget"
                    }
                },
                {
                    "value":"videowidget",
                    "label": "YoutTube",
                    "title": "YoutTube",
                    "isActive": false,
                    "draggable": true,
                    "icon": "youtube play icon",
                    "widgetConfig":{
                        "widgetType": "videowidget",
                        "source":"youtube"
                    }
                },
                {
                    "value":"videowidget",
                    "label": "Vimeo",
                    "title": "Vimeo",
                    "isActive": false,
                    "draggable": true,
                    "icon": "vimeo square icon",
                    "widgetConfig":{
                        "widgetType": "videowidget",
                        "source":"vimeo"
                    }
                }
            ]
        },
        {
            "value":"datasource",
            "label":"Data",
            "isActive": true,
            "children":[
                {
                    "value":"REST",
                    "label": "REST",
                    "title": "Rest",
                    "icon": "storage",
                    "isActive": true,
                    "draggable": true,
                    "widgetConfig":{
                        "widgetType": "dataviewwidget"
                    }
                },
                                {
                    "value":"externaldata",
                    "label": "External",
                    "title": "External",
                    "isActive": false,
                    "draggable": true,
                    "widgetConfig":{
                        "widgetType": "externaldatasource"
                    }
                }
            ]
        },
        {
            "value":"gallery",
            "label":"Gallery",
            "isActive": false,
            "children":[
                {
                    "value":"slideshow",
                    "label": "SlideShow",
                    "title": "SlideShow",
                    "isActive": false,
                    "draggable": true,
                    "widgetConfig":{
                        "widgetType": "slideshow"
                    }
                }
            ]
        },
        {
            "value":"forms",
            "label":"Forms",
            "isActive": true,
            "children":[
                {
                    "value":"formwidget",
                    "label": "Basic",
                    "title": "Basic Form",
                    "isActive": true,
                    "icon": "playlist_add_check",
                    "draggable": true,
                    "widgetConfig":{
                        "widgetType": "formwidget"
                    }
                }
            ]
        }
];