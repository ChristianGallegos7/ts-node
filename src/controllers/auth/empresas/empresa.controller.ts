import { Request,Response } from "express";
import { prisma } from "../../../config/db"
import bcrypt from 'bcrypt'
import { token } from "../../../utils/jwt";

export const registro = async(req:Request,res:Response) => {
    try {
        const {nombre,ruc,correo,password,direccion,telefono,web,descripcion,} = req.body;
        //Prevenir duplicados
        const empresaExiste = await prisma.empresa.findUnique({
            where: {
                correo
            }
        })
        if(empresaExiste){
            const error = new Error("La empresa ya esta registrada")
            return res.status(409).json({
                error: error.message
            })
        }
        const hashPassword = await bcrypt.hash(password,10)
        const empresa = await prisma.empresa.create({
            data: {
                correo,
                descripcion,
                direccion,
                nombre,
                password:hashPassword,
                ruc,
                telefono,
                web
            }
        })
        res.send("Empresa creada correctamente");
    }catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }
}

export const login = async(req:Request,res:Response) => {
    try {
        const {correo,password} = req.body;

        const empresaExiste = await prisma.empresa.findUnique({
            where: {
                correo
            }
        })

        if(!empresaExiste){
            const error = new Error("La empresa no esta registrada")
            return res.status(409).json({
                error: error.message
            })
        }

        const verifyPassword = await bcrypt.compare(password,empresaExiste.password);

        if(!verifyPassword){
            const error = new Error("Contraseña Incorrecta")
            return res.status(401).json({
                error: error.message
            })
        };

        const jwtToken = token({id: empresaExiste.id, correo: empresaExiste.correo});

        res.json(jwtToken);

    }  catch (error) {
        res.status(500).json({ error: 'Hubo un error en el servidor' });
    }
}