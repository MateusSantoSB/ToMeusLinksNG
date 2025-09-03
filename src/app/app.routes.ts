import { Routes } from '@angular/router';
import { HomeNg } from './home-ng/home-ng';
import { HeaderNg } from './header-ng/header-ng';
import { FooterNg } from './footer-ng/footer-ng';

export const routes: Routes = [
     {path:'',component:HomeNg},
     {path:'',component:HeaderNg},
     {path:'',component:FooterNg},
];
