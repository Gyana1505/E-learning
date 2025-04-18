import multer from 'multer'
import {v4 as uuid} from 'uuid'
const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uplode")
    },
    filename(req,file,cb){
       const id=uuid()
       const extName=file.originalname.split(".").pop();
       const fileName=`${id}.${extName}`
       cb(null,fileName);
    }
})
export const uploadFile=multer({storage}).single("file")