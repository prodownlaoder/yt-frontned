import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorPageComponent } from './components/basic/error-page/error-page.component';
import { UserComponent } from './pages/user/user.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DownloadComponent } from './pages/download/download.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path: 'download',
        component:DownloadComponent
    },
    {
        path:'user',
        component:UserComponent
    },
    
    {
        path:'contact',
        component:ContactComponent
    },
    {
        path:"profile",
        component:ProfileComponent
    },
    {
        path:'**',
        component:ErrorPageComponent
    },
    
];
