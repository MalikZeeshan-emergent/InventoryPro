export declare const salesService: {
    getAll(filters?: {
        status?: string;
        customer_id?: number;
        date_from?: string;
        date_to?: string;
    }): Promise<any[]>;
    getById(id: number): Promise<any>;
    create(data: {
        customer_id: number;
        order_type: string;
        order_date?: string;
        due_date?: string;
        notes?: string;
        items: Array<{
            product_id: number;
            batch_id?: number;
            quantity: number;
            unit_price: number;
            tax_rate?: number;
            discount_rate?: number;
        }>;
        created_by: number;
    }): Promise<any>;
    updateStatus(id: number, status: string): Promise<any>;
};
//# sourceMappingURL=salesService.d.ts.map