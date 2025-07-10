type Product = {
    id: number;
    names: string;
    price: number;
    category: "electronics" | "clothing" | "grocery";
}

const getProductDetails = (product: Product): string =>{
    return `Product ${product.names}, Price: ${product.price}, Category: ${product.category} `;
}

interface DiscountedProduct extends Product{
    discountPercent: number;
} 