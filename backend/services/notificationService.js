import Notification from '../models/notificationModel.js'; // Adjust path as necessary

class NotificationService {
    static createNotification = async (userId, message) => {
        try {
            const newNotification = await new Notification({
                user_id: userId,
                message: message,
                created_at: new Date(), // Optional if database handles this
            updated_at: new Date() // Optional if database handles this 
            }).save();
            return newNotification.toJSON(); // Return the created notification
        } catch (error) {
            console.error("Error creating notification:", error);
            throw new Error("Failed to create notification.");
        }
    };

    static getNotificationsByUserId = async (userId) => {
        try {
            const notifications = await Notification.where({ user_id: userId }).fetchAll();
            return notifications.toJSON(); // Return notifications as JSON
        } catch (error) {
            console.error("Error fetching notifications:", error);
            throw new Error("Failed to fetch notifications.");
        }
    };
}

export { NotificationService };
