
import {bookshelfInstance} from '../config/dbConfig.js';

const TransactionWithdraw = bookshelfInstance.model('TransactionWIthdraw', {
  tableName: 'transaction_withdraw',
//   idAttribute: 'id',
});

export default TransactionWithdraw;
