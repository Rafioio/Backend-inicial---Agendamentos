const SessoesModel = require("../Models/SessoesModel");

class SessoesController {
    async create(req, res){
        try{    
            const sessoes = await SessoesModel.create(req.body);

            return res.status(200).json(sessoes);
        }catch(error){
            res
                .status(500)
                .json({message: "Deu ruim aqui!!"})
        }
    }
    
    async read(req, res){
        const sessoes = await SessoesModel.find().populate('id_usuario','-senha');

        return res.status(200).json(sessoes);
    }
    
    async update(req, res){
        const { id } = req.params

        const sessoes = await SessoesModel.findByIdAndUpdate(id, req.body);
        
        return res.status(200).json(sessoes);
    }
    
    async delete(req, res){
       const { id } = req.params
       
       await SessoesModel.findByIdAndDelete(id);

       return res.status(200).json({mensagem: "Sessão deletada com sucesso"});
       
    }
}


module.exports = new SessoesController();