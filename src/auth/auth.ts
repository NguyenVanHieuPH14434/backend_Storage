import rand from "../lib/rand";

export namespace AuthSchema {

    export enum Role {
        ADMIN = 'admin', 
        MANAGER = 'manager'
    }

    export enum Gender {
        MALE = 'male',
        FEMALE = 'female'
    }

    export interface User {
        _id: string;
        username: string;
        full_name: string;
        email:string;
        roles: Role[];
        gender:Gender;
        phone:string;
        birthday:string;
        ctime:string;
        utime:string;
    }

    export interface CreateUserParams {
        username: string;
        full_name: string;
        email:string;
        roles: Array<Role>;
        gender:Gender;
        phone:string;
        birthday:string;
    }

    export interface UpdateUserParams {
        full_name?: string;
        roles?: Array<Role>;
        gender?:Gender;
        phone?:string;
        birthday?:string;
        utime?:string;
    }

    export const Generate = {
        NewUserId : () => rand.uppercase(14)
    }
}