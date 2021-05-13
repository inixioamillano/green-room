import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxCaptureModule } from 'ngx-capture';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { GlobalComponent } from './components/global/global.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NewroomComponent } from './components/newroom/newroom.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RoomComponent } from './components/room/room.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { VotesComponent } from './components/votes/votes.component';
import { UserGuard } from './guards/user.guard';
import { IndextopointsPipe } from './pipes/indextopoints.pipe';
import { OrderByPointsPipe } from './pipes/order-by-points.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { VotablePipe } from './pipes/votable.pipe';
import { VotedByPipe } from './pipes/voted-by.pipe';

@NgModule({
  declarations: [AppComponent, RankingComponent, GlobalComponent, LoadingComponent, VotesComponent, IndextopointsPipe, ReversePipe, VotablePipe, VotedByPipe, OrderByPointsPipe, RoomsComponent, RoomComponent, NewroomComponent, NewuserComponent, AboutComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'global',
        component: GlobalComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'rooms',
        component: RoomsComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'newroom',
        component: NewroomComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'room/:id',
        component: RoomComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'myvotes',
        component: VotesComponent,
        canActivate: [UserGuard]
      }, 
      {
        path: 'newuser',
        component: NewuserComponent,
        canActivate: [UserGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'myvotes'
      },
      {
        path: '**',
        component: VotesComponent,
        canActivate: [UserGuard]
      }
    ], { initialNavigation: 'enabled' }),
    FontAwesomeModule,
    NgxCaptureModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
