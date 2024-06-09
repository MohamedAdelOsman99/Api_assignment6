
import bcrypt from 'bcryptjs';
import User from '../../../model/users/userModel.js';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Find user by email
        const user = await User.findOne({
            where: { email: email }
        });


        // If user not found or password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Authentication successful
        res.status(200).json({ 
            status : "success",
            code : "200",
            message: 'Authentication successful' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
