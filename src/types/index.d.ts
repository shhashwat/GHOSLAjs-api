declare type UserRole = 'INTERN' | 'ENGINEER' | 'ADMIN';
declare interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}