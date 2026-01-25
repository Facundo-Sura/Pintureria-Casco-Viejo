const Category = require('../models/Categories');

const getAllCategories = async (req, res) => {
    try {
        let categories = await Category.findAll();
        
        // Lazy seeding: si no hay categorías, crearlas basadas en el ENUM
        if (categories.length === 0) {
            const initialCategories = ["casa", "oficina", "automotor", "ferreteria", "pileta"];
            const created = await Promise.all(
                initialCategories.map(name => Category.create({ name }))
            );
            categories = created;
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCategories };
