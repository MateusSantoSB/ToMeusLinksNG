import { Routes } from '@angular/router';
import { HomeNg } from './home-ng/home-ng';
import { HeaderNg } from './header-ng/header-ng';
import { FooterNg } from './footer-ng/footer-ng';
import { DashboardNg } from './dashboard-ng/dashboard-ng';

export const routes: Routes = [
     {path:'',component:HomeNg},
     {path:'dashboard',component:DashboardNg},


];
