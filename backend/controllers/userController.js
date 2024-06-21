import User from '../models/userModel.js';

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user_id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error in getUserForSidebar controller', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}