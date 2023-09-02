import mongoose from 'mongoose';
const uri = "mongodb+srv://bookshop:bookpassword@bookshopcluster.uhqvufr.mongodb.net/books-collections?retryWrites=true&w=majority"

// export function connectDB() {
//     mongoose.connect(uri)
//         .then(() => {
//             console.log('Connected to MongoDB Atlas');
//         })
//         .catch((error) => {
//             console.error('Error connecting to MongoDB Atlas:', error);
//         });
// }

export async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("database connected successfully!");
    } catch (error) {
        console.log("database connection failed!", error);
    }
}




