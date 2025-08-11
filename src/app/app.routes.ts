import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorPageComponent } from './components/basic/error-page/error-page.component';
import { UserComponent } from './pages/user/user.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DownloadComponent } from './pages/download/download.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AudioboxComponent } from './components/basic/audiobox/audiobox.component';
import { AudiodownloadpageComponent } from './components/vd-components/audiodownloadpage/audiodownloadpage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, 
        pathMatch: 'full'
    },
    {
        path: 'home',
        redirectTo: '', 
        pathMatch: 'full'
    },
    {
        path: 'mp3',
        component: AudioboxComponent
    },
    {
        path: 'mp3download',
        component: AudiodownloadpageComponent
    },
    {
        path: 'download',
        component: DownloadComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: '**',
        component: ErrorPageComponent
    },
];
