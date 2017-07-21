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
    correct_lines = 0;
    CODELIST: string[][] = [[" "," "," ", " "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," ", " "]];
    selected_line: number = 4;
    selected_word: number = 4;
    COLOURLIST: string[][] = [["primary","primary","primary", "primary"],["primary","primary","primary","primary"],["primary","primary","primary","primary"],["primary","primary","primary", "primary"],["primary","primary","primary", "primary", " "]];
    SOLUTION: string[][] = [["MAX", "=", "APPLE #1", " "], ["FOR EACH", "APPLE", "IN", "BASKET"],
    ["IF", "APPLE", ">", "MAX"], ["MAX", "=", "APPLE", " "], ["BUY", "MAX", " ", " "]];

    pointsSub: Subscription;
    opponentScore = 0;
    constructor(private socket:Socket) {}
    ngOnInit() {
    this.subscribeToNotifications();
        }

    clickLabel(lineNumber: number, wordNumber: number) {
        this.selected_line = lineNumber;
        this.selected_word = wordNumber;
    }

    clickButton(buttonText: string) {
        this.CODELIST[this.selected_line][this.selected_word] = buttonText;
        this.COLOURLIST[this.selected_line][this.selected_word] = "primary";
    }
    run(lineNumber: number) {
        if(this.CODELIST[lineNumber][0] == this.SOLUTION[lineNumber][0] &&
        this.CODELIST[lineNumber][1] == this.SOLUTION[lineNumber][1] &&
        this.CODELIST[lineNumber][2] == this.SOLUTION[lineNumber][2] &&
        this.CODELIST[lineNumber][3] == this.SOLUTION[lineNumber][3]
        ) {
            this.COLOURLIST[lineNumber][0] = "danger\" disabled";
            this.COLOURLIST[lineNumber][1] = "danger\" disabled";
            this.COLOURLIST[lineNumber][2] = "danger\" disabled";
            this.COLOURLIST[lineNumber][3] = "danger\" disabled";
            this.selected_line = 4;
            this.selected_word = 4;
            this.correct_lines += 1;
            if(this.correct_lines == 5) {
                alert("You have completed this level!");
            }
        } else {
            if(this.CODELIST[lineNumber][0] == this.SOLUTION[lineNumber][0]) {
                this.COLOURLIST[lineNumber][0] = "success";
            } else {
                this.COLOURLIST[lineNumber][0] = "warning";
            }
            if(this.CODELIST[lineNumber][1] == this.SOLUTION[lineNumber][1]) {
                this.COLOURLIST[lineNumber][1] = "success";
            } else {
                this.COLOURLIST[lineNumber][1] = "warning";
            }
            if(this.CODELIST[lineNumber][2] == this.SOLUTION[lineNumber][2]) {
                this.COLOURLIST[lineNumber][2] = "success";
            } else {
                this.COLOURLIST[lineNumber][2] = "warning";
            }
            if(this.CODELIST[lineNumber][3] == this.SOLUTION[lineNumber][3]) {
                this.COLOURLIST[lineNumber][3] = "success";
            } else {
                this.COLOURLIST[lineNumber][3] = "warning";
            }
        }
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
