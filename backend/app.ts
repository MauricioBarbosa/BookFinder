import express from 'express'

class App{
    app : express.Application;

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: true}));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(
            '/', (req, res) => {
                return res.status(200).json("App funcionando de Mauricio Júnior");
            }
        )
    }
}

export default new App().app; 