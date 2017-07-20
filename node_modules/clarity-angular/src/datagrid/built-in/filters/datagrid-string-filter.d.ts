import { ElementRef, Renderer, AfterViewInit, EventEmitter } from "@angular/core";
import { StringFilter } from "../../interfaces/string-filter";
import { CustomFilter } from "../../providers/custom-filter";
import { DatagridFilter } from "../../datagrid-filter";
import { DatagridStringFilterImpl } from "./datagrid-string-filter-impl";
import { DatagridFilterRegistrar } from "../../utils/datagrid-filter-registrar";
import { FiltersProvider, RegisteredFilter } from "../../providers/filters";
export declare class DatagridStringFilter extends DatagridFilterRegistrar<DatagridStringFilterImpl> implements CustomFilter, AfterViewInit {
    private renderer;
    constructor(renderer: Renderer, filters: FiltersProvider);
    /**
     * Customizable filter logic based on a search text
     */
    customStringFilter: StringFilter<any> | RegisteredFilter<DatagridStringFilterImpl>;
    /**
     * Indicates if the filter dropdown is open
     */
    open: boolean;
    /**
     * We need the actual input element to automatically focus on it
     */
    input: ElementRef;
    /**
     * We grab the DatagridFilter we wrap to register this StringFilter to it.
     */
    filterContainer: DatagridFilter;
    ngAfterViewInit(): void;
    /**
     * Common setter for the input value
     */
    value: string;
    filterValueChange: EventEmitter<{}>;
    close(): void;
}
