import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        user: {

        },
        email:{

        },
        password:{

        }
    }
);

export default mongoose.model('User', userSchema);