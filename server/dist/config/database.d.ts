import { Pool } from 'pg';
export declare const pool: Pool;
export declare const query: (text: string, params?: any[]) => Promise<import("pg").QueryResult<any>>;
export declare const initDatabase: () => Promise<void>;
//# sourceMappingURL=database.d.ts.map