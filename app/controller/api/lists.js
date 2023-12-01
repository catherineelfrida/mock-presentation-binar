const { PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient();


module.exports = {
    async get(req, res){
        const lists = await prisma.list.findMany({
            include:{
                user:true
            }
        })
        if(lists){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data ditemukan!',
                data: lists
            })
        }
    },
    async getById(req, res){
        if(!req.params.listId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'List id tidak ada!!',
        })
        
        listId=req.params.listId;
        
        const list = await prisma.list.findUnique({
            where: {
              id: +listId,
            },
        })
        
        if(list){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data ditemukan!',
                data: list
            })
        }
    },
    async update(req, res){
        if(!req.params.listId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'List id tidak ada!!',
        })
        
        listId=req.params.listId;
        
        const list = await prisma.list.update({
            where: {
              id: +listId,
            },
            data: {
              status: true,
            },
          })
        
        if(list){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data terupdate!',
                data: list
            })
        }
    },    
    async destroy(req, res){
        if(!req.params.listId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'List id tidak ada!!',
        })
        listId=req.params.listId;
        const list = await prisma.list.delete({
            where: {
              id: +listId,
            },
          })
        if(list){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data terhapus!',
            })
        }
    },
    async create(req,res){
        try {
            const{userId,to_do,status}=req.body;
            const createList=await prisma.list.create({
                data:{
                    userId,
                    to_do,
                    status,
                }
            })
            if(createList){
                return res.status(201).json({ 
                    status: 'success', 
                    code: 200, 
                    message: 'Data ditambahkan!',
                    data: createList
                })
            }
        } catch (error) {
            return res.status(400).json({ 
                status: 'success', 
                code: 400, 
                message: 'Data gagal ditambahkan!',
            })
        }
    }
   
}