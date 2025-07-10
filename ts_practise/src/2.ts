const processPayment = (amount: number, method: "cash" | "card" | "upi"): string => {
    return `Payment of $${amount} received via ${method}.`;
};