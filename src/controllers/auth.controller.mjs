class AuthController{
    constructor(){
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
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
            
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();