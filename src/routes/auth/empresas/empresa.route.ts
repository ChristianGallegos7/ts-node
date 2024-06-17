import {Router} from 'express'
import { registro,login } from '../../../controllers/auth/empresas/empresa.controller'
import { body } from 'express-validator';
import { handleInputErrors } from '../../../middleware/validation';

const router = Router();


router.post(
    '/registro',
    [
      body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
      body('ruc').isNumeric().withMessage('El RUC debe ser numérico'),
      body('correo').isEmail().withMessage('Correo no válido'),
      body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
      body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
      body('telefono').isNumeric().withMessage('El teléfono debe ser numérico'),
      body('web').isURL().withMessage('El sitio web no es válido'),
      body('descripcion').notEmpty().withMessage('La descripción es obligatoria')
    ],
    handleInputErrors,
    registro
  );

router.post('/login', 
  body('correo').isEmail().withMessage('Correo no válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  handleInputErrors,
  login)

export default router;