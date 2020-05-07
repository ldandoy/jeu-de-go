import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './layouts/base/base.module';

import { AuthService } from './services/auth/auth.service';
import { AlertMsgService } from './services/alert-msg/alert-msg.service';
import { GameService } from './services/game/game.service';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';

import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, AlertMsgService, GameService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
