// import userModel from "../models/userModel.js"


// //add to cart
// const addToCart = async (req, res) => {
//     try {
//         const { userId, itemId, size } = req.body
//         const userData = await userModel.findById(userId)
//         let cartData = userData.cartData

//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1;
//             } else {
//                 cartData[itemId][size] = 1;
//             }
//         } else {
//             cartData[itemId] = {};
//             cartData[itemId][size] = 1;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData })
//         res.json({ success: true, message: "Added to Cart" })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// //update  cart
// const updateCart = async (req, res) => {
//     try {
//         const { userId, itemId, size, quantity } = req.body;
//         const userData = await userModel.findById(userId)
//         let cartData = userData.cartData
//         cartData[itemId][size] = quantity;
//         await userModel.findByIdAndUpdate(userId, { cartData })
//         res.json({ success: true, message: "Updated Cart" })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// //get user cart cart
// const getUserCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId);
//         let cartData = userData.cartData;
//         res.json({ success: true, cartData })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// export { addToCart, updateCart, getUserCart }


import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    let cartData = userData.cartData;

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log("Error in addToCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size || quantity == null) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    let cartData = userData.cartData;

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log("Error in updateCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is missing." });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log("Error in getUserCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
