import { EventEmitter } from "@angular/core";
import { Comparator } from "./interfaces/comparator";
import { Sort } from "./providers/sort";
import { DatagridFilterRegistrar } from "./utils/datagrid-filter-registrar";
import { FiltersProvider } from "./providers/filters";
import { DatagridStringFilterImpl } from "./built-in/filters/datagrid-string-filter-impl";
import { SortOrder } from "./interfaces/sort-order";
export declare class DatagridColumn extends DatagridFilterRegistrar<DatagridStringFilterImpl> {
    private _sort;
    constructor(_sort: Sort, filters: FiltersProvider);
    /**
     * Subscription to the sort service changes
     */
    private _sortSubscription;
    ngOnDestroy(): void;
    /**
     * Comparator to use when sorting the column
     */
    sortBy: Comparator<any>;
    /**
     * Indicates if the column is sortable
     */
    readonly sortable: boolean;
    /**
     * Indicates if the column is currently sorted
     *
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    private _sorted;
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    sorted: boolean;
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    sortedChange: EventEmitter<boolean>;
    /**
     * Indicates how the column is currently sorted
     */
    private _sortOrder;
    sortOrder: SortOrder;
    sortOrderChange: EventEmitter<SortOrder>;
    /**
     * Sorts the datagrid based on this column
     */
    sort(reverse?: boolean): void;
    /**
     * Indicates if the column is currently sorted in ascending order
     */
    readonly asc: boolean;
    /**
     * Indicates if the column is currently sorted in descending order
     */
    readonly desc: boolean;
    /**
     * A custom filter for this column that can be provided in the projected content
     */
    customFilter: boolean;
    projectedFilter: any;
    private _field;
    field: string;
    filterValue: string;
    filterValueChange: EventEmitter<{}>;
}
