interface Customer{
    readonly id: number;
    name: string;
    email?: string;
    isPremium: boolean;
}

const createCustomerFactory = () => {
    let id = 0; // private, persists across calls
    return (name: string, email?: string): Customer => {
        return {
            id: id++,
            name,
            email,
            isPremium: false
        };
    };
};

// Create the customer creator
const createCustomer = createCustomerFactory();

const c1 = createCustomer("Ahmad");
const c2 = createCustomer("Amjad");

console.log(c1); // id: 0
console.log(c2); // id: 1 ✅ Correctly increments
