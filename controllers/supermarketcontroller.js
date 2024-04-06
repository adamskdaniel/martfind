import { supermarketModel } from '../models/supermarketmodel.js';

export const supermarketControllers = {
    createSupermarket: async (req, res) => {
        try {
            const { name, location, description, openingHours, contactNumber, whatsappNumber, website } = req.body;
            const createdBy = req.params.id; // Assuming user ID is available in the request object
            if (!name || !location || !createdBy) return res.json({error:'Name, location, and createdBy fields are required' });
            const newSupermarket = new supermarketModel({ name, location, createdBy, description, openingHours, contactNumber, whatsappNumber, website });
            await newSupermarket.save();
            res.json({ message: 'Supermarket created successfully', supermarket: newSupermarket });
        }   catch (error) {res.json({ error: 'Internal Server Error' })}
    },    

    getSupermarkets: async (req, res) => {
        try {
            const supermarkets = await supermarketModel.find();
            res.json({ supermarkets });
        }   catch {res.json({ error: 'Internal Server Error' })}
    },

    getSupermarket: async (req, res) => {
        try {
            const supermarketId = req.params.id;
            const supermarket = await supermarketModel.findById(supermarketId);
            if (!supermarket) return res.json({ error: 'Supermarket not found' });
            res.json({ supermarket });
        }   catch {res.json({ error: 'Internal Server Error' })}
    },

    updateSupermarket: async (req, res) => {
        try {
            const { name, location, description, openingHours, contactNumber, whatsappNumber, website, photos } = req.body;
            const supermarketId = req.params.id;
            const updatedSupermarket = await supermarketModel.findByIdAndUpdate(supermarketId, { name, location, description, openingHours, contactNumber, whatsappNumber, website, photos }, { new: true });
            if (!updatedSupermarket) return res.json({ error: 'Supermarket not found' });
            res.json({ message: 'Supermarket updated successfully', supermarket: updatedSupermarket });
        }   catch {res.json({ error: 'Internal Server Error' })}
    },

    deleteSupermarket: async (req, res) => {
        try {
            const supermarketId = req.params.id;
            const deletedSupermarket = await supermarketModel.findByIdAndDelete(supermarketId);
            if (!deletedSupermarket) return res.json({ error: 'Supermarket not found' });
            res.json({ message: 'Supermarket deleted successfully', supermarket: deletedSupermarket });
        }   catch {res.json({ error: 'Internal Server Error' })}
    }
};
