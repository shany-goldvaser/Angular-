import { Routes } from '@angular/router';
import { CourseComponent } from '../components/course/course.component';
import { CourseDetailComponent } from '../components/course-detail/course-detail.component';
import { EnteranceComponent } from '../components/enterance/enterance.component';
import { authGuard } from '../guards/auth.guard';
import { LessonComponent } from '../components/lesson/lesson.component';
import { LessonDetailComponent } from '../components/lesson-detail/lesson-detail.component';
import { CourseFormComponent } from '../components/course-form/course-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'enterance', pathMatch: 'full' },
    {
        path: 'courses', component: CourseComponent, canActivate: [authGuard],
        children: [
            {
                path: ':id', component: CourseDetailComponent,
                children:
                    [

                            { path: 'lessons/:lessonId', component: LessonDetailComponent },

                    ]

            }
            ,]
    },

    { path: 'enterance', component: EnteranceComponent },
];

