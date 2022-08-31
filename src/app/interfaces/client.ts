export interface Client{
    clientId?: number;
    email?: String;
    password?: String;
    firstName?: String;
    lastName?: String;
    roles?: String[];
    accessToken?: String;
    age?: number;
    exp?: number;
}