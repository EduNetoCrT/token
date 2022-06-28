import express,{Request, Response} from 'express';
import jwt from 'jsonwebtoken';
const  SECRET = "eduardo";

const app = express();



app.use(express.json());

//meddleware de aurotização

const verificarJWT = (req: Request, res: Response, next: any) => {
    const token: any = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err: any, decoded: any) => {
        return res.status(401).send()

    });

    next()
}


app.get('/', (req, res) => {
    res.json({msg:" Tudo funcionando"})
});


app.get('/dados', verificarJWT,(req, res) => {
    return res.json({id: 1, nome: ' Eduardo José'})
});


app.post('/login', (req, res) => {
    const {user, password} = req.body;

    if(user === 'Eduardo' && password === '123') {
        const token = jwt.sign({userId:1},SECRET,{expiresIn:120})

        return res.json({msg: 'Usuário logado', token}).status(200);
    }else{
        res.status(401).json({msg:'Dados invalidos'})
    }
})














app.listen(3030, () => console.log('Servidor na porta 3030'));