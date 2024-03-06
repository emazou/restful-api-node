import express from 'express';
import multer from 'multer';
import checkAuth from '../middleware/check-auth';
import { 
    products_get_all,
    products_create_product, 
    products_get_product, 
    products_update_product, 
    products_delete_product 
} from '../controllers/products';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (_req: any, _file:any, cb: any) {
        cb(null, '/uploads/');
    },
    filename: function (_req: any, file: any, cb: any) {
        const newFilename = new Date().toISOString().replace(/:/g, '-') + file.originalname;
        cb(null, newFilename);
    }
});

const fileFilter = (_req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
}

const upload = multer({ storage: storage,
    limits: {fileSize: 1024 * 1024 * 5,},
    fileFilter
});

router.get('/', checkAuth, products_get_all);

router.post("/", checkAuth, upload.single('productImage'), products_create_product);

router.get('/:id',checkAuth,  products_get_product);

router.patch('/:id', checkAuth, products_update_product);

router.delete('/:id', checkAuth, products_delete_product);

export default router;