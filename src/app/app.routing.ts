import { Routes, RouterModule } from '@angular/router';
import { WhiteBoardComponent } from './white-board/white-board.component';
import { CourseViewerComponent } from './course-viewer/course-viewer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: WhiteBoardComponent},
  { path: 'course/:courseId', component: CourseViewerComponent},
  { path: '**', component: WhiteBoardComponent} // any other path goes here.
  // if the path following the pattern, a course/ followed by a courseId, go CourseViewerComponent

];

export const routing = RouterModule.forRoot(appRoutes);
