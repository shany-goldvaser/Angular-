import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { MatListItem, MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    AsyncPipe,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,RouterOutlet,RouterLink,
    CourseFormComponent,
    MatNavList,MatListItem,
    MatButton,
    ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  isTeacher:boolean = (sessionStorage.getItem("user") == "teacher") ? true : false;  
  courses$!: Observable<Course[]>;
  myCourse:Course[]=[];
  constructor(private courseService: CourseService) { }
  newCourse: { id: number, title: string; description: string; teacherId: number } = { id: 0, title: '', description: '', teacherId: 0 };
  flagAdd: boolean = false;
  userId!:number ;
  ngOnInit(): void {
    this.courseService.getAllCourses();
    this.courses$ = this.courseService.courses$;
    this.userId = parseInt(sessionStorage.getItem('userId') || '0');
    this.courseService.getCoursesForStudent(this.userId).subscribe(
      (courses => {this.myCourse=courses;})
    );
  }
add(): void {
this.flagAdd = true;
}
addCourse($event:any): void {
  this.flagAdd = false;
  this.newCourse=$event;
  this.courseService.createCourse(this.newCourse)
    .subscribe({
      next: () => {
        this.newCourse = { id: 0, title: '', description: '', teacherId: 0 };
      },
      error: (err) => {
        console.error('Error creating course:', err);
      }
    });
}
isCourseInMyCourses(course: Course): boolean {
  return this.myCourse.some(myCourse => myCourse.id === course.id);
}
unenroll(courseId:number):void {
  this.courseService.unenrollStudent(courseId, this.userId).subscribe({
    next: (data) => {
      // Handle success response, e.g., update myCourse array
      this.myCourse = this.myCourse.filter(course => course.id !== courseId);
      // console.log('Successfully unenrolled from course:', data);
    },
    error: (err) => {
      console.error('Error unenrolling from course:', err);
    }
  });
}
enroll(courseId:number){
  this.courseService.enrollStudent(courseId, this.userId).subscribe({
    next: (data) => {
      this.myCourse.push(data); 
      // console.log('Successfully enrolled in course:', data);
    },
    error: (err) => {
      console.error('Error enrolling in course:', err);
    }
  });
}
}

