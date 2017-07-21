import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { NameService } from "./services/name.service";
import { HomeComponent } from "./home/home.component";
import { Home1Component } from "./home1/home1.component";
import { AboutComponent } from "./about/about.component";
import { StartPageComponent } from "./StartPage/StartPage.component";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        StartPageComponent,
        HomeComponent,
        Home1Component
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        SocketIoModule.forRoot(config) ,
        ROUTING
    ],
    providers: [NameService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
