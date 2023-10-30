import mongoose from 'mongoose';

export const initDB = async () => {
    try {
        const URI = 'mongodb+srv://developer:i48STUlf3JMawje8@cluster0.auacdfv.mongodb.net/ecommerce';
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting to database ', error.message);
    }
}