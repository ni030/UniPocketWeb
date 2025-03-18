import {db} from '../config/firebase.js';
const roomsCollection = db.collection('chosenRooms');
const usersCollection = db.collection('users');
const meritCollection = db.collection('merits');

export const roomController = {
    getAllRooms: async (req, res) => {
        try {
            const roomSnapshot = await roomsCollection.get();
            const rooms = roomSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            const roomWithUsers = await Promise.all(rooms.map(async (room) => {
                const usersSnapshot = await usersCollection.where('userId', '==', room.userId).get();
                const user = usersSnapshot.docs[0].data();
                if (!user) {
                    return res.status(404).json({error: 'User not found'});
                }
                const meritsSnapshot = await meritCollection.where('userId', '==', room.userId).get();
                const merit = meritsSnapshot.docs[0].data();
                if (!merit) {
                    return res.status(404).json({error: 'Merit not found'});
                }
                const ranking = merit.ranking;
                return {...room, user, ranking};
            }
            ));
            return res.status(200).json(roomWithUsers);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};
