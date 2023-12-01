const { PrismaClient}=require('@prisma/client')
const {encryptPassword,checkPassword}=require('../../../utils/auth')
const {JWTsign}=require('../../../utils/jwt')


const prisma = new PrismaClient();

module.exports={
    async login(req,res){
        const {email, username, password}=req.body

        const user = await prisma.user.findFirst({
            where: {email} || {username}
        })
        
        if(!user){
            return res.status(404).json({
                status:"Failed!",
                message:"Email atau Username tidak ditemukan!"
            })
        }

        const isPasswordCorrect=await checkPassword(
            password, user.password
        )
        
        if(!isPasswordCorrect){
            return res.status(401).json({
                status:"Failed!",
                message:"Password Salah"
            })
        }

        delete user.password
        const token=await JWTsign(user)
        return res.status(201).json({
            status:"Success!",
            message:"Berhasil Login!",
            data:{user,token},
        })
    },
    async whoami(req,res){
        return res.status(200).json({
            status:"Success",
            message:"OK",
            data:{
                user:req.user
            }
        })
    },
    async register(req,res){
        const{email,username,password}=req.body

        if(password.length>=6 || !Number.isInteger(password)){
            return res.status(400).json({
                status:"Failed!",
                message:"Password harus terdiri dari 6 angka!"
            })
        }
        
        const existingEmail = await prisma.user.findFirst({
            where:{email}
        })
        
        if(existingEmail){
            return res.status(404).json({
                status:"Failed!",
                message:"Email sudah terdaftar!"
            })
        }

        const existingUsername= await prisma.user.findFirst({
            where:{email}
        })
        
        if(existingUsername){
            return res.status(404).json({
                status:"Failed!",
                message:"Username sudah terdaftar!"
            })
        }
        
        const createUser=await prisma.user.create({
            data:{
                email,
                username,
                password: await encryptPassword(password)
            }
        })

        return res.status(201).json({
            status:'success',
            code:200,
            message:'Berhasil Register!',
            data:createUser
        })
    }
}