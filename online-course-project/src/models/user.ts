export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password?: string ,
        
        public role?: string 
    ) {}
}
export enum UserRole {
    Teacher = 'teacher',
    Student = 'student'
  }
  