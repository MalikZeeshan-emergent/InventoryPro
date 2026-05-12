export declare const authService: {
    register(email: string, password: string, name: string): Promise<any>;
    login(email: string, password: string): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
        token: string;
    }>;
    getUserById(id: number): Promise<any>;
    updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=authService.d.ts.map