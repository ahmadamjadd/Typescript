interface Customer {
    name: string;
    email?: string;
    isPremium: boolean;
}

const processCustomer = (
    customers: Customer[], 
    callback: (customer: Customer) => string
): string[] => {
    return customers.map(callback);
};
