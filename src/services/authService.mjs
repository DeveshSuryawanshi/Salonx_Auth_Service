import { getUserModel, Logger } from "@DeveshSuryawanshi/salonx_infra_service";

class AuthService {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req, res, next) {
        try {
            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }

    async register(userData) {
        // return {status: 200, success: true, data: userData, message: 'User registered successfully'};
        const { firstName, lastName, email, password } = userData;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
          Logger.warn('Missing required fields during registration');
          return { status: 400, success: false, message: 'All required fields must be provided' };
        }
        
        try {
          // Check if the email is already in use
          // const existingUser = await User.findOne({ email });
          const User = getUserModel('test');
          const existingUser = await User.findOne({ email });
          // console.log('User ---> ',existingUser);
          // return
          if (existingUser) {
            Logger.warn(`Email already registered: ${email}`);
            return { status: 400, success: false, message: 'Email already registered' };
          }
      
          // Create a new user
          const newUser = new User({
            firstName,
            lastName,
            email,
            password, // Password hashing is handled in the pre-save middleware
            // role: role || 'CUSTOMER', // Default role if not provided
          });
      
          // Save the user to the database
          const savedUser = await newUser.save();
      
          Logger.info(`New user registered with email: ${email}`);
          
          // Exclude password from the response
          const { password: _, ...userWithoutPassword } = savedUser.toObject();
          return { status: 201, success: true, message: 'User registered successfully', data: userWithoutPassword };
        } catch (error) {
          Logger.error('Error during user registration', error);
          return { status: 500, success: false, message: 'User registration failed' };
        }
    }
}

export default new AuthService();