import { v4 as uuid4 } from "uuid";

const createUniqueId = () => uuid4();

export { createUniqueId };
export default createUniqueId;
