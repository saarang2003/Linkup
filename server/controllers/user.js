
import User from '../models/User.js';

// Read
export const getUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById({id:id});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({msg : "error getting user"})
    }
}


export const getUserFriends = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById({id});

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );

          res.status(200).json({formattedFriends})
        
    } catch (error) {
        res.status(400).json({msg : "error getting user"})
    }
}

// update
export const addRemoveFriend = async(req,res) =>{
    try {
        const {id , friendsId} = req.body;
        const user = await User.findById(id);
        const friend = await User.findById(friendsId)

        if(user.friends.includes(friendsId)){
            user.friends = user.friends.filters((id) => id !== friendsId);
            friend.friends = friend.friends.filters((id) => id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );

          res.status(200).json({formattedFriends})


    } catch (error) {
        res.status(400).json({message : error.message})
    }
}