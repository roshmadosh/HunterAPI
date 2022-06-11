const { Pool }= require('pg');
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../config/config.env') });

const pool = new Pool({  
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'hunter',
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
});

export type QueryConfig = {
  text: string,
  values?: string[]
}

export type ReturnObject<T> = {
  success: boolean,
  apiCalled: boolean,
  data?: T | T[] | [],
  message?: string,
}

export const runQuery = async (queryConfig: QueryConfig): Promise<ReturnObject<any>> => {
  try {
    const resp = await pool.query(queryConfig);
    const data = resp.rows;
    return { success: true, apiCalled: true, data };
  } catch (err: any) {
    console.error(err.stack);
    return { success: false, apiCalled: true, message: err.message };
  } 
}


