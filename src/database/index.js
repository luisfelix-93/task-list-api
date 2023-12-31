import mongoose from 'mongoose'

class Database {
    constructor(){
        mongoose.connect('mongodb://localhost:27017/task_project',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
        db.once('open', () => {
          console.log('Conectado ao banco de dados MongoDB');
        });
    }
}

export default new Database();