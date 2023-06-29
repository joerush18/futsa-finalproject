import axios from 'axios';

const setter = (url: string, data : any) => axios.post(url , data ).then((res) => res.data);

export default setter;