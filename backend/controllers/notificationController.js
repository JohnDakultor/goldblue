import { NotificationService } from '../services/notificationService.js';

class NotificationController {
    static createNotification = async (req, res) => {
        const { userId, message } = req.body;

        try {
            const notification = await NotificationService.createNotification(userId, message);
            res.status(201).json(notification);
        } catch (error) {
            console.error("Error in createNotification controller:", error);
            res.status(500).json({ message: error.message });
        }
    };

    static getNotifications = async (req, res) => {
        const userId = req.userId; // Ensure this is set by your JWT middleware
        
        if (!userId) {
            return res.status(403).json({ message: 'User not authorized' });
        }
    
        try {
            const notifications = await NotificationService.getNotificationsByUserId(userId);
            return res.json(notifications);
        } catch (error) {
            console.error("Error in getNotifications controller:", error);
            return res.status(500).json({ message: 'Failed to fetch notifications.' });
        }
    };
}

export { NotificationController };
