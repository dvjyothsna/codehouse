/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { Home1Component } from './home1/home1.component';
import { StartPageComponent } from './StartPage/StartPage.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'StartPage', pathMatch: 'full'},
    {path: 'StartPage', component: StartPageComponent},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'home1', component: Home1Component}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
