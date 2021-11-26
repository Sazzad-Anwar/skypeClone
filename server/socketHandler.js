const axios = require("axios");
const User = require("./Model/UserModel");

let users = [];

const socketHandler = (io, socket) => {

    //log of the user who has joined with the socket id
    console.log(`New client connected`.green, socket.id);

    //when in client side a user logs in and be online then the user will be added to the users array and the array will broadcast to all the users
    socket.on('new-user', async (data) => {

        //Get the user details from the database using the user id and update his socket id and active status
        let user = await User.findOneAndUpdate({ _id: data._id }, { $set: { socketId: socket.id, isActive: true } }, { new: true }).select('-password');

        //Check if the user is already in the users array, if not then add the user to the array
        if (!users.filter((u) => u.email === user.email).length) {
            users.push(user);

            //Broadcast the user array to all the users
            io.emit("user-connected", (users));
        }
    })

    socket.on("disconnect", async () => {

        //log of the user who gets disconnected or logout
        console.log(`Client disconnected`.red, socket.id);

        //Update the user's socket id and active status to false
        await User.findOneAndUpdate({ socketId: socket.id }, { $set: { socketId: null, isActive: false } }, { new: true }).select('-password')

        //Remove the user from the users array
        users = users.filter(u => u?.socketId !== socket.id);

        //Broadcast the user array to all the users
        io.emit("user-connected", users);
    })


}


module.exports = socketHandler;