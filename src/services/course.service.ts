import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = "http://localhost:3000/api/courses";
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> = this.coursesSubject.asObservable();
  constructor(private http: HttpClient) {
    this.loadCourses();
  }

    // טוען את כל הקורסים מהשרת ומעדכן את BehaviorSubject
    private loadCourses(): void {
      this.http.get<Course[]>(this.apiUrl).subscribe(courses => {
        this.coursesSubject.next(courses);
      });
    }
  
  // קבלת כל הקורסים
  getAllCourses(): Observable<Course[]> {
    return this.courses$;
  }


  // קבלת פרטי קורס לפי מזהה
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // יצירת קורס חדש
createCourse(course: Partial<Course>): Observable<any> {
    return this.http.post(this.apiUrl, course).pipe(
      tap(() => this.loadCourses()) // טוען מחדש את הקורסים לאחר הוספה
    );
  }
  // עדכון פרטי קורס לפי מזהה
  updateCourse(id: number, course: Partial<Course>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course).pipe(
      tap(() => this.loadCourses()) // טוען מחדש את הקורסים לאחר עדכון
    );
  }
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCourses()) 
    );
  }
  
  getCoursesForStudent(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/student/${studentId}`);
  }

  enrollStudent(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }).pipe(
      tap(() => this.loadCourses()) // Optionally reload courses if needed
    );
  }

  // Unenroll a student from a course
  unenrollStudent(courseId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } }).pipe(
      tap(() => this.loadCourses()) // Optionally reload courses if needed
    );
  }
}

