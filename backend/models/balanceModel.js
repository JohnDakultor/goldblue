import { bookshelfInstance } from '../config/dbConfig.js';

const Balance = bookshelfInstance.model('balance', {
    tableName: 'balance',
    idAttribute: 'id',
    hasTimestamps: true
    
});

export default Balance;
