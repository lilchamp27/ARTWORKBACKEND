const Artwork = require('../models/artwork'); // Import the Artwork model
const user = require('../models/user'); // Import the User model

// Create a new artwork listing
exports.createArtwork = async (req, res) => {
    try {
        const { title, description, price, imageUrl, category, stockQuantity } = req.body;

        const newArtwork = new Artwork({
            title,
            description,
            price,
            imageUrl,
            category,
            stockQuantity,
            seller: req.user.id // Assign the current user as the selle
            
        });

        await newArtwork.save();
        res.status(201).json({success: true, data: newArtwork});
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: 'Error creating artwork', error });
    }
};


// fetch all artworks 
exports.getAllArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.status(200).json({success: true, data:artworks});
    } catch (error) {
        res.status(500).json({ message: 'Error getting artworks', error });
    }
};

// fetch single artwork listing by ID
exports.getArtworkById = async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
  
      if (!artwork) {
        return res.status(404).json({ sucess: false, msg: 'Artwork not found' });
      }
  
      res.status(200).json({sucess: true, artwork});
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

// Update an artwork listing
exports.updateArtwork = async (req, res) => {
  const { id } = req.params;
//   destructuring the updated fields from the request body
const { title, description, price, imageUrl, category, stockQuantity } = req.body;
try {
    const updatedArtwork = await Artwork.findByIdAndUpdate(id, { title, description, price, imageUrl, category, stockQuantity }, { new: true });    
    if (!updatedArtwork) { 
        return res.status(404).json({ success: false, msg: 'Artwork not found' });
      
}
res.status(200).json({ success: true, updatedArtwork });
} catch (error) {
    res.status(500).json({ error: 'Server error' });
};
}

  
  

// Delete artwork listing
exports.deleteArtwork = async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
  
      if (!artwork) {
        return res.status(404).json({ msg: 'Artwork not found' });
      }
  
      // Ensure user is the seller
      if (artwork.seller.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await artwork.remove();
      res.json({ msg: 'Artwork removed' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  // Search and filter artworks
  exports.searchArtworks = async (req, res) => {
    const { keyword, category, minPrice, maxPrice, datePosted } = req.query;
  
    let filter = { status: 'available' };
  
    if (keyword) {
      filter.$or = [
        { title: new RegExp(keyword, 'i') },
        { description: new RegExp(keyword, 'i') },
      ];
    }
  
    if (category) filter.category = category;
    if (minPrice) filter.price = { $gte: minPrice };
    if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };
    if (datePosted) filter.datePosted = { $gte: new Date(datePosted) };
  
    try {
      const artworks = await Artwork.find(filter);
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
    


module.exports = exports;