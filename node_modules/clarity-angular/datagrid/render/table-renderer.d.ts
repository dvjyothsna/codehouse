import { ElementRef, Renderer, OnDestroy } from "@angular/core";
import { DatagridRenderOrganizer } from "./render-organizer";
export declare class DatagridTableRenderer implements OnDestroy {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer, organizer: DatagridRenderOrganizer);
    private subscription;
    ngOnDestroy(): void;
    private tableMode(on);
}
