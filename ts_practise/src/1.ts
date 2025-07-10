const formatUserDetails = (name: string, age: number, isAdmin: boolean): string => {
    const adminStatus = isAdmin ? 'Yes' : 'No';
    return `User: ${name}, Age: ${age}, Admin: ${adminStatus}`;
};
