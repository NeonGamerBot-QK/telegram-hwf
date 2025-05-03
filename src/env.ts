import envImport from '../.env'
import { z} from 'zod';

const envZ = z.object({
    TELEGRAM_TOKEN: z.string(),
    ENCRYPTION_KEY: z.string(),
    ENC_IV: z.string(),
    ENC_KEY: z.string()
})  
const envO = envZ.safeParse(envImport);
;(async () => {
    if(envO.error) {
        envO.error.issues.map(i=>{
            console.log(`${i.path[0]} should be ${i.expected}, but got ${i.received}`);
        })
        // return;
        }
})()
const env = envO.data!;
export default env;