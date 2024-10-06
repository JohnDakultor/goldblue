import { bookshelfInstance } from '../config/dbConfig.js';

const Notification = bookshelfInstance.model('Notification', {
    tableName: 'notifications',
    idAttribute: 'id',
    hasTimestamps: true
});

export default Notification;
