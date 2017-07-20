import { ElementRef, Renderer, OnDestroy } from "@angular/core";
import { DomAdapter } from "./dom-adapter";
import { DatagridRenderOrganizer } from "./render-organizer";
export declare class DatagridHeaderRenderer implements OnDestroy {
    private el;
    private renderer;
    private domAdapter;
    constructor(el: ElementRef, renderer: Renderer, domAdapter: DomAdapter, organizer: DatagridRenderOrganizer);
    private subscription;
    ngOnDestroy(): void;
    /**
     * Indicates if the column has a strict width, so it doesn't grow or shrink
     */
    strictWidth: number;
    private widthSet;
    private clearWidth();
    computeWidth(): number;
}
