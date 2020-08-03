import database from 'database/models';
import { Container } from 'typedi'


export default () => {
    Container.set('usersModel', database.users);
    Container.set('domainsModel', database.domains);
    Container.set('singleSignOnsModel', database.single_sign_ons);
    Container.set('verifyCodesModel', database.verify_codes);

}