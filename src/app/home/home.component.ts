/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})

export class HomeComponent {
    CODELIST: string[] = [];
    selected: number = 0;

    clickLabel(labelNumber: number) {
        this.selected = labelNumber;
    }
    clickButton(buttonText: string) {
        this.CODELIST[this.selected] = buttonText;
    }
    run(lineNumber: number) {
    
    }
}
