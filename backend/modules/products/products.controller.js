
export async function getProducts (req, res) {
    try {
        const result = await productService.getProducts();
        return res.status(200).json({
            success: true,
            message: 'Get products successfully',
            data: result
        })
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while getting products'
        })
    }
}

export function getProductById (req, res)   {
    try {
        const { id } = req.params;

        const result = productService.getProductById(id);
        if (!result) {
            return res.status(40).json({
                success: false,
                message: 'Product not found'
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Get product successfully',
                data: result
            })
        }
    } catch (error) {  
        console.error('Error getting product by id:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while getting product by id'
        })
    }
}

export function createProduct () {
    console.log('create product')
}

export function updateProduct () {
    console.log('update product')
}

export function deleteProduct () {
    console.log('delete product')
}

export default { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
};