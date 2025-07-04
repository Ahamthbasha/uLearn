import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../../api/action/StudentAction";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../../../api/action/StudentAction";
import { toast } from "react-toastify";

interface Course {
  _id: string;
  courseName: string;
  thumbnailUrl: string;
  price: number;
}

interface WishlistItem {
  _id: string;
  courseId: Course | null;
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cartCourseIds, setCartCourseIds] = useState<string[]>([]);

  useEffect(() => {
    fetchWishlist();
    fetchCartItems();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      const validItems = response.data.filter((item: WishlistItem) => item.courseId !== null);
      setWishlist(validItems);
    } catch (error) {
      toast.error("Failed to fetch wishlist");
    }
  };

  const fetchCartItems = async () => {
    try {
      const cart = await getCart();
      if (cart?.data?.courses) {
        const ids = cart.data.courses.map((c: any) => c._id);
        setCartCourseIds(ids);
      }
    } catch (error) {
      toast.error("Failed to fetch cart");
    }
  };

  const handleRemoveFromWishlist = async (courseId: string) => {
    try {
      await removeFromWishlist(courseId);
      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const toggleCart = async (courseId: string) => {
    try {
      if (cartCourseIds.includes(courseId)) {
        await removeFromCart(courseId);
        toast.success("Removed from cart");
      } else {
        await addToCart(courseId);
        toast.success("Added to cart");
      }
      fetchCartItems();
    } catch (error) {
      toast.error("Cart operation failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No courses in wishlist</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Thumbnail</th>
                <th className="p-3 border">Course Name</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Cart Action</th>
                <th className="p-3 border">Wishlist Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => {
                const course = item.courseId!;
                const isInCart = cartCourseIds.includes(course._id);

                return (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="p-3 border">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.courseName}
                        className="w-24 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 border font-medium">{course.courseName}</td>
                    <td className="p-3 border">₹{course.price}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => toggleCart(course._id)}
                        className={`px-3 py-1 rounded text-white text-sm ${
                          isInCart ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {isInCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => handleRemoveFromWishlist(course._id)}
                        className="px-3 py-1 rounded bg-gray-300 text-black text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
