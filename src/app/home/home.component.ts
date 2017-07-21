/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
 import { Component, OnInit } from "@angular/core";
 import { Socket } from 'ng-socket-io';
 import { NameService } from '../services/name.service';

 import { Observable } from 'rxjs/Observable';
 import { Subscription } from 'rxjs/Subscription';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/observable/timer';
 import 'rxjs/Observable';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit{
    seconds: number = 0;
    correct_lines: number = 0;
    CODELIST: string[][] = [[" "," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," ", " "]];
    selected_line: number = 4;
    selected_word: number = 4;
    COLOURLIST: string[][] = [["primary","primary","primary", "primary"],["primary","primary","primary","primary"],["primary","primary","primary","primary"],["primary","primary","primary", "primary"],["primary","primary","primary", "primary", " "]];
    SOLUTION: string[][] = [["MAX", "=", "APPLE #1", " "], ["FOR EACH", "APPLE", "IN", "BASKET"],
    ["IF", "APPLE", ">", "MAX"], ["MAX", "=", "APPLE", " "], ["BUY", "MAX", " ", " "]];
    your_score: number[] = [0,0,0,0,0];
    opponent_score: number[] = [0,0,0,0,0];
    open: Boolean = false;

    pointsSub: Subscription;
    score = 0;
    retries = 0;
    opponentScore = 0;
    constructor(private socket:Socket , private nameService:NameService) {}
    ngOnInit() {
    this.subscribeToNotifications();
        let timer = Observable.timer(2000,3000);
        timer.subscribe(t=>this.seconds = t);
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
            this.calculatePoints(lineNumber);
            this.COLOURLIST[lineNumber][0] = "danger\" disabled";
            this.COLOURLIST[lineNumber][1] = "danger\" disabled";
            this.COLOURLIST[lineNumber][2] = "danger\" disabled";
            this.COLOURLIST[lineNumber][3] = "danger\" disabled";
            this.selected_line = 4;
            this.selected_word = 4;
            this.correct_lines += 1;
            if(this.correct_lines == 5) {

            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', "images/congrats.mp3");
            audioElement.play();
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', "images/claps.mp3");
            audioElement.play();
            this.open = true;

            }
        } else {
             var audioElement = document.createElement('audio');
             audioElement.setAttribute('src', "images/oops.mp3");
             audioElement.play();
            if(this.CODELIST[lineNumber][0] == this.SOLUTION[lineNumber][0]) {
                this.COLOURLIST[lineNumber][0] = "success";
            } else {
                this.COLOURLIST[lineNumber][0] = "warning";
                this.retries = this.retries + 1;
            }
            if(this.CODELIST[lineNumber][1] == this.SOLUTION[lineNumber][1]) {
                this.COLOURLIST[lineNumber][1] = "success";
            } else {
                this.COLOURLIST[lineNumber][1] = "warning";
                this.retries = this.retries + 1;
            }
            if(this.CODELIST[lineNumber][2] == this.SOLUTION[lineNumber][2]) {
                this.COLOURLIST[lineNumber][2] = "success";
            } else {
                this.COLOURLIST[lineNumber][2] = "warning";
                this.retries = this.retries + 1;
            }
            if(this.CODELIST[lineNumber][3] == this.SOLUTION[lineNumber][3]) {
                this.COLOURLIST[lineNumber][3] = "success";
            } else {
                this.COLOURLIST[lineNumber][3] = "warning";
                this.retries = this.retries + 1;
            }
        }
    }


    calculatePoints(lineNumber) {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', "images/yay.mp3");
        audioElement.play();
        if(this.retries > 5) {
            this.sendPoints(0, lineNumber);
        }
        else {
            let points = 100 - (this.retries * 5);
            this.sendPoints(points, lineNumber);
        }
        this.retries = 0;
    }
    sendPoints(score, lineNumber) {
        this.your_score[lineNumber] = score;
        let msg = "Hey";
        this.socket.emit("message" , { score : score , line : lineNumber});
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
          this.opponent_score[data["points"]["line"]] = data["points"]["score"];
          this.opponentScore = this.opponentScore + data["points"];
          console.log(this.opponentScore);
        });
    }

}
