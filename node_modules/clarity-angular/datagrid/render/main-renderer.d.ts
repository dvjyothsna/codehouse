import { QueryList, AfterContentInit, AfterViewInit, OnDestroy } from "@angular/core";
import { DatagridRenderOrganizer } from "./render-organizer";
import { DatagridHeaderRenderer } from "./header-renderer";
import { DatagridRowRenderer } from "./row-renderer";
export declare class DatagridMainRenderer implements AfterContentInit, AfterViewInit, OnDestroy {
    private organizer;
    constructor(organizer: DatagridRenderOrganizer);
    headers: QueryList<DatagridHeaderRenderer>;
    rows: QueryList<DatagridRowRenderer>;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    private _subscriptions;
    ngOnDestroy(): void;
    /**
     * Makes each header compute its width.
     */
    private computeHeadersWidth();
    /**
     * Indicates if we want to re-compute columns width. This should only happen:
     * 1) When headers change, with columns being added or removed
     * 2) When rows are lazily loaded for the first time
     */
    private columnsSizesStable;
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    private stabilizeColumns();
}
