import AuthService from "../services/authService.mjs";
class AuthController{
    constructor(){
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.AuthService = AuthService;
    }

    async login (req, res, next){
        try {
            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }

    async register (req, res, next){
        try {
            const userData = req.body;
            const response = await this.AuthService.register(userData);
            return res.status(response.status).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();