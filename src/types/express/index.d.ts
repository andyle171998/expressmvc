import { UsersStatic, User as UserAttribute } from 'database/models/users';
import { DomainsStatic } from 'database/models/domains';
import { SingleSignOnsStatic } from 'database/models/single_sign_ons';
import { VerifyCodesStatic } from 'database/models/verify_codes';

declare global {
  
  namespace Express {
    export interface Response {
      onSuccess: Function;
      onError: Function;
    }
    export interface User extends UserAttribute {}
  }
  namespace Models {
    export type Users = UsersStatic;
    export type Domains = DomainsStatic;
    export type SingleSignOns = SingleSignOnsStatic;
    export type VerifyCodes = VerifyCodesStatic;
  } 
}