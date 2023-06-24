import User from "../models/User";
import Tasks from "../models/Tasks";

class TaskController {
    async index (req, res){
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'});
            }
            const tasks = await Tasks.find({
                userId: user_id
            });
            if (!tasks){
                return res.status(404).json({message: 'Usuário não tem tarefas registradas'});
            }
            return res.status(200).json({message: 'Tarefas encontradas', tasks})
        } catch(error) {
            console.error(error);
            return res.status(500).json({error: "Erro interno de servidor"});
        }
    }

    async show (req, res){
        try {
            const {user_id, date_task} = req.params;
            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'});
            }

            const tasks = await Tasks.find({
                userId: user_id,
                date: date_task
            });

            if (!tasks){
                return res.status(404).json({message: `Usuário não tem tarefa registrada na data ${date_task}`});
            }

        } catch(error) {
            console.error(error);
            return res.status(500).json({error: "Erro interno de servidor"});
        }
    }

    async create (req, res){
        try {
            const {user_id} = req.params;
            const { taskCode, date, timeSpent, notes, tag } = req.body;

            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'});
            }

            const newTask = await Task.create({
                taskCode, 
                date, 
                timeSpent, 
                notes, 
                tag,
                userId: user_id
            });
            return res.status(201).json({message: 'Tarefa registrada com sucesso', newTask})

        } catch(error) {
            console.error(error);
            return res.status(500).json({error: "Erro interno de servidor"});
        }
    }

    async delete (req, res){
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'});
            };

            const task = await Tasks.findOne({
                userId: user_id,
                id
            });

            await task.deleteOne();
            res.status(200).json({message: 'Tarefa deletada com sucesso!'});

        } catch(error) {
            console.error(error);
            return res.status(500).json({error: "Erro interno de servidor"});
        }
    }

}
export default new TaskController();