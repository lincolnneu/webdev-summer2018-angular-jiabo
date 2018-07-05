import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloWordComponent } from './hello-word/hello-word.component';
import { FormsModule } from '@angular/forms';
import { CourseNavigatorServiceClient } from './services/course-navigator.service.client';
import { CourseNavigatorComponent } from './course-navigator/course-navigator.component';
import { WhiteBoardComponent } from './white-board/white-board.component';
import { CourseServiceClient } from './services/course.service.client';
import { CourseGridComponent } from './course-grid/course-grid.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HelloWordComponent,
    CourseNavigatorComponent,
    WhiteBoardComponent,
    CourseGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    CourseNavigatorServiceClient,
    CourseServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
