// import { createBookshelfModel } from "../models/userModel.js"; // Adjust the import path as necessary

// const Transaction = createBookshelfModel("transaction");

// export default Transaction;

import {bookshelfInstance} from '../config/dbConfig.js';

const Transaction = bookshelfInstance.model('Transaction', {
  tableName: 'transaction',
  idAttribute: 'id',
});

export default Transaction;
