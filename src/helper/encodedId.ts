
import { v4 as uuidv4 } from 'uuid';
import Hashids from 'hashids/cjs';

export default () => {
    const deHyphenatedUUID = () => uuidv4().replace(/-/gi, "");
    const hashids = new Hashids();
    return hashids.encodeHex(deHyphenatedUUID());
}