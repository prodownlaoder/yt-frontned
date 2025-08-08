import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorPageComponent } from './components/basic/error-page/error-page.component';
import { UserComponent } from './pages/user/user.component';
import { FeaturesComponent } from './pages/features/features.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DownloadappComponent } from './pages/downloadapp/downloadapp.component';
import { DownloadComponent } from './pages/download/download.component';
import { BilibiliComponent } from './majorspages/bilibili/bilibili.component';
import { DailymotionComponent } from './majorspages/dailymotion/dailymotion.component';
import { FacebookComponent } from './majorspages/facebook/facebook.component';
import { InstagramComponent } from './majorspages/instagram/instagram.component';
import { LinkedinComponent } from './majorspages/linkedin/linkedin.component';
import { PintrestComponent } from './majorspages/pintrest/pintrest.component';
import { RumbleComponent } from './majorspages/rumble/rumble.component';
import { TiktokComponent } from './majorspages/tiktok/tiktok.component';
import { YoutubeComponent } from './majorspages/youtube/youtube.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SnapchatComponent } from './majorspages/snapchat/snapchat.component';
import { VimeoComponent } from './majorspages/vimeo/vimeo.component';
import { RedditComponent } from './majorspages/reddit/reddit.component';
import { OkruComponent } from './majorspages/okru/okru.component';

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
        path:'bilibili',
        component:BilibiliComponent
    },
    {
        path:'dailymotion',
        component:DailymotionComponent
    },
    {
        path:'facebook',
        component:FacebookComponent
    },
    {
        path:'instagram',
        component:InstagramComponent
    },
    {
        path:'linkedin',
        component:LinkedinComponent
    },
    {
        path:'pinterest',
        component:PintrestComponent
    },
    {
        path:'rumble',
        component:RumbleComponent
    },
    {
        path:'tiktok',
        component:TiktokComponent
    },
    {
        path:'youtube',
        component:YoutubeComponent
    },
    {
        path:'snapchat',
        component:SnapchatComponent
    },
    {
        path:'vimeo',
        component:VimeoComponent
    },
    {
        path:'reddit',
        component:RedditComponent
    },
    {
        path:'okru',
        component:OkruComponent
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
        path:'feature',
        component:FeaturesComponent
    },
    {
        path:'downloadapk',
        component:DownloadappComponent
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
