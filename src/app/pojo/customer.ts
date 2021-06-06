import { Address } from "./address";
import { UserClass } from "./user-class";

export class Customer {

    customerId: number=0;
    email: string='';
    fullName: string='';
    password: string='';
    address: Address = new Address;
    mobileNumber: string='';
    registerOn!: Date;
    userClass: UserClass = new UserClass;

}
