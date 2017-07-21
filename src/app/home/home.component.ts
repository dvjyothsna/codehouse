/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
 import { Component, OnInit } from "@angular/core";
 import { Socket } from 'ng-socket-io';

 import { Observable } from 'rxjs/Observable';
 import { Subscription } from 'rxjs/Subscription';
 import 'rxjs/add/operator/map';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit{
    CODELIST: string[] = [];
    selected: number = 0;
    COLOURLIST: string[] = [];
    LINE_ONE: string[] = ["MAX", "=", "APPLE #1"];
    LINE_TWO: string[] = [];
    LINE_THREE: string[] = [];
    LINE_FOUR: string[] = [];

    pointsSub: Subscription;
    opponentScore = 0;
    constructor(private socket:Socket) {}
    ngOnInit() {
    this.subscribeToNotifications();
        }

    clickLabel(labelNumber: number) {
        this.selected = labelNumber;
    }
    clickButton(buttonText: string) {
        this.CODELIST[this.selected] = buttonText;
    }
    run(lineNumber: number) {

    }


    sendPoints() {
        let msg = "Hey";
        this.socket.emit("message" , 10);
    }
    getPoints() {
        let msg = "Hii";
        return this.socket
            .fromEvent("messageReturn")
            .map(data => data);
    }
    subscribeToNotifications() {
      this.pointsSub = this.getPoints().subscribe(
        (data) => {
          this.opponentScore = this.opponentScore + data["points"];
        });
    }
}
