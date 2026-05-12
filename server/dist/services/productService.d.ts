export declare const productService: {
    getAll(filters?: {
        category?: string;
        search?: string;
        warehouse?: string;
    }): Promise<any[]>;
    getById(id: number): Promise<any>;
    create(data: {
        sku: string;
        name: string;
        barcode?: string;
        description?: string;
        category_id?: number;
        cost_price: number;
        selling_price: number;
        reorder_level?: number;
        unit?: string;
    }): Promise<any>;
    update(id: number, data: Partial<{
        name: string;
        barcode: string;
        description: string;
        category_id: number;
        cost_price: number;
        selling_price: number;
        reorder_level: number;
        unit: string;
    }>): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getStock(productId: number): Promise<any>;
};
//# sourceMappingURL=productService.d.ts.map