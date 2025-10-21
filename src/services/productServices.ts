import ProductModel from "../models/productModel";

export const getAllProducts = async()=>{

    return await ProductModel.find();
}

export const seedInitialProducts = async () => {
    try {
        const products = [
            {title : "Dell Laptop", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/category/laptop/dell-pro-laptops-category-image-800x620.png?fmt=png-alpha&wid=800&hei=620", price:15000, stock:10},
        ];

        const existingProducts = await getAllProducts();

        if(existingProducts.length === 0){
            await ProductModel.insertMany(products);
            console.log("Initial products seeded successfully!");
        }
    } catch (error) {
        console.error("Error seeding products:", error);
    }
};

