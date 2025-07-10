const filterItems = <T>(
    array: T[],
    func: (item: T) => boolean // ✅ Function type here
): T[] => {
    return array.filter(func); // Use built-in Array.filter
};
