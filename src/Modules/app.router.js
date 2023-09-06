import connectDB from '../../DB/connection.js';
import AuthRouter from './Auth/auth.router.js';
import MessageRouter from './Message/message.router.js';
import UserRouter from './User/user.router.js';

const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use("/auth", AuthRouter);
    app.use("/message",MessageRouter);
    app.use("/user",UserRouter);
    app.use("/*", (req,res)=>{
        return res.json({message:"page not found"});
    });

}
export default initApp;
