import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';

export const environment = {
  firebase: {
    apiKey: "AIzaSyBXh1LjxE22AwPj2zgMp1jip_Q1U0MkKgk",
    authDomain: "ion3-7bb36.firebaseapp.com",
    databaseURL: "https://ion3-7bb36.firebaseio.com",
    projectId: "ion3-7bb36",
    storageBucket: "ion3-7bb36.appspot.com",
    messagingSenderId: "1033574228295"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
