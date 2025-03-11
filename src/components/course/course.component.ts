import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Course } from "../../models/course";
import { CourseService } from "../../services/course.service";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CourseFormComponent } from "../course-form/course-form.component";
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: 'app-course',
  standalone: true,

  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    CourseFormComponent,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  isTeacher: boolean = (sessionStorage.getItem("user") === "teacher") ? true : false;
  courses$!: Observable<Course[]>;
  myCourse: Course[] = [];
  constructor(private courseService: CourseService) { }
  newCourse: { id: number, title: string; description: string; teacherId: number } = { id: 0, title: '', description: '', teacherId: 0 };
  flagAdd: boolean = false;
  userId!: number;
  ngOnInit(): void {
    debugger
    this.courseService.getAllCourses();
    this.courses$ = this.courseService.courses$;
    this.userId = parseInt(sessionStorage.getItem('userId') || '0');
    this.courseService.getCoursesForStudent(this.userId).subscribe(
      (courses => { this.myCourse = courses; })
    );
  }
  add(): void {
    this.flagAdd = true;
  }
  addCourse($event: any): void {
    this.flagAdd = false;
    this.newCourse = $event;
    this.courseService.createCourse(this.newCourse)
      .subscribe({
        next: () => {
          this.newCourse = { id: 0, title: '', description: '', teacherId: 0 };
        },
        error: (err) => {
          alert(`Error creating course: ${err}`);
        }
      });
  }

  isCourseInMyCourses(course: Course): boolean {
    return this.myCourse.some(myCourse => myCourse.id === course.id);
  }
  unenroll(courseId: number): void {
    this.courseService.unenrollStudent(courseId, this.userId).subscribe({
      next: (data) => {
        this.courseService.getCoursesForStudent(this.userId).subscribe(
          (courses => { this.myCourse = courses; })
        );
      },
      error: (err) => {
        alert(`Error unenrolling from course: ${err.message}`);
      }
    });
  }

  enroll(courseId: number) {
    this.courseService.enrollStudent(courseId, this.userId).subscribe({
      next: (data) => {

        this.courseService.getCoursesForStudent(this.userId).subscribe(
          (courses => { this.myCourse = courses; })
        );
      },
      error: (err) => {
        alert(`Error enrolling in course:${err.message}`);
      }
    });
  }
}

