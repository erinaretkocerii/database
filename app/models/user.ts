export interface User{
    userId:string;
    username:string;
    name:string;
    surname:string;
    email:string;
    password:string;
    roleName:string;
}
export interface UserFormValuesLogin {
    username:string;
    password:string;

}

export interface UserFormValuesRegister {
    username:string;
    name:string;
    surname:string;
    email:string;
    password:string;

}