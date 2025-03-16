import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Bookmark,
  Star,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Send,
  ChevronUp,
} from "lucide-react";

const FoodieJournal = () => {
  const [setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [activeView, setActiveView] = useState("all"); // 'all', 'favorites', 'bookmarks', 'contact'
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  // Food images data
  const foodItems = [
    {
      id: 1,
      name: "Fried Momos",
      rating: 4.8,
      tags: ["Street Food", "Crispy"],
      image: "https://example.com/fried-momos.jpg",
      description:
        "Crispy and flavorful dumplings filled with delicious stuffing.",
    },
    {
      id: 2,
      name: "Pav Bhaji",
      rating: 4.9,
      tags: ["Indian", "Spicy"],
      image: "https://example.com/pav-bhaji.jpg",
      description: "A spicy mashed vegetable curry served with buttered pav.",
    },
    {
      id: 3,
      name: "Chowmein",
      rating: 4.7,
      tags: ["Chinese", "Noodles"],
      image: "https://example.com/chowmein.jpg",
      description: "Stir-fried noodles tossed with veggies and sauces.",
    },
    {
      id: 4,
      name: "Manchurian",
      rating: 5.0,
      tags: ["Chinese", "Spicy"],
      image: "https://example.com/manchurian.jpg",
      description: "Crispy veggie balls in a spicy Manchurian sauce.",
    },
    {
      id: 5,
      name: "Burger",
      rating: 4.5,
      tags: ["Fast Food", "American"],
      image: "https://example.com/burger.jpg",
      description: "A juicy patty served in a bun with lettuce and sauces.",
    },
    {
      id: 6,
      name: "French Fries",
      rating: 4.9,
      tags: ["Fast Food", "Crispy"],
      image: "https://example.com/french-fries.jpg",
      description: "Golden and crispy potato fries, perfect for snacking.",
    },
    {
      id: 7,
      name: "Chocolate Truffle",
      rating: 4.6,
      tags: ["Dessert", "Chocolatey"],
      image: "https://example.com/chocolate-truffle.jpg",
      description: "A rich and dense chocolate cake layered with ganache.",
    },
    {
      id: 8,
      name: "Maggi",
      rating: 4.8,
      tags: ["Instant", "Comfort Food"],
      image: "https://example.com/maggi.jpg",
      description: "Instant noodles cooked with spices and veggies.",
    },
    {
      id: 9,
      name: "Butter Jaan",
      rating: 4.7,
      tags: ["Punjabi", "Rich"],
      image: "https://example.com/butter-naan.jpg",
      description: "Soft and buttery naan, a perfect companion for curries.",
    },
    {
      id: 10,
      name: "Masala Dosa",
      rating: 4.6,
      tags: ["South Indian", "Crispy"],
      image: "https://example.com/masala-dosa.jpg",
      description: "A thin, crispy dosa filled with spiced potato stuffing.",
    },
    {
      id: 11,
      name: "Half Fry",
      rating: 4.9,
      tags: ["Breakfast", "Egg"],
      image: "https://example.com/half-fry.jpg",
      description:
        "Sunny-side-up eggs with a soft yolk, perfect for breakfast.",
    },
    {
      id: 12,
      name: "Onion Rings",
      rating: 4.8,
      tags: ["Fast Food", "Crispy"],
      image: "https://example.com/onion-rings.jpg",
      description: "Crispy battered onion rings, a great crunchy snack.",
    },
    {
      id: 13,
      name: "Pizza",
      rating: 4.7,
      tags: ["Italian", "Cheesy"],
      image: "https://example.com/pizza.jpg",
      description: "Cheesy and loaded with toppings on a crispy crust.",
    },
    {
      id: 14,
      name: "Aloo Paratha",
      rating: 4.5,
      tags: ["Punjabi", "Stuffed"],
      image: "https://example.com/aloo-paratha.jpg",
      description: "A stuffed flatbread with spiced mashed potatoes.",
    },
    {
      id: 15,
      name: "Paneer Tikka",
      rating: 4.8,
      tags: ["Indian", "Grilled"],
      image: "https://example.com/paneer-tikka.jpg",
      description: "Grilled paneer cubes marinated in flavorful spices.",
    },
    {
      id: 16,
      name: "Kulche Chole",
      rating: 4.9,
      tags: ["Punjabi", "Spicy"],
      image: "https://example.com/kulche-chole.jpg",
      description: "Soft kulchas served with spicy and tangy chole.",
    },
    {
      id: 17,
      name: "Malai Chaap",
      rating: 4.6,
      tags: ["Mughlai", "Creamy"],
      image: "https://example.com/malai-chaap.jpg",
      description: "Creamy and flavorful chaap cooked in rich gravy.",
    },
    {
      id: 18,
      name: "Chocolate Lava Cake",
      rating: 4.9,
      tags: ["Dessert", "Chocolatey"],
      image: "https://example.com/lava-cake.jpg",
      description: "A gooey and molten chocolate-filled dessert.",
    },
    {
      id: 19,
      name: "Sandwiches",
      rating: 4.5,
      tags: ["Breakfast", "Quick Bites"],
      image: "https://example.com/sandwich.jpg",
      description: "Layered with fresh veggies and cheese in soft bread.",
    },
    {
      id: 20,
      name: "Gol Gappe",
      rating: 5.0,
      tags: ["Street Food", "Tangy"],
      image: "/public/golgappe.jpeg",
      description: "Crispy puris filled with spicy and tangy flavored water.",
    },
  ];

  // Food emojis for decoration
  //   const foodEmojis = ["🍕", "🍔", "🍟", "🍦", "🍎", "🥪", "🍩", "🌮"];

  // Handle like functionality
  const toggleLike = (id) => {
    setLikedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle bookmark functionality
  const toggleBookmark = (id) => {
    setBookmarkedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Filter items based on active view
  const getFilteredItems = () => {
    switch (activeView) {
      case "favorites":
        return foodItems.filter((item) => likedItems.includes(item.id));
      case "bookmarks":
        return foodItems.filter((item) => bookmarkedItems.includes(item.id));
      default:
        return foodItems;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Initialize IntersectionObserver to track visible items
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => {
            const id = parseInt(entry.target.dataset.id);
            if (!prev.includes(id)) {
              return [...prev, id];
            }
            return prev;
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all food items
    document.querySelectorAll(".food-item").forEach((item) => {
      observer.observe(item);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [activeView]);

  return (
    <div className="relative min-h-screen bg-amber-50 text-gray-800 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-amber-50 bg-opacity-90 border-b border-amber-200">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <h1
            className="text-3xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-transparent bg-clip-text cursor-pointer"
            onClick={() => setActiveView("all")}
          >
            The Foodie Journal
          </h1>
          <div className="hidden md:flex gap-6 text-amber-800">
            <button
              className={`transition-colors duration-300 ${
                activeView === "all"
                  ? "text-orange-600 border-b-2 border-orange-500"
                  : "hover:text-orange-600"
              } cursor-pointer`}
              onClick={() => setActiveView("all")}
            >
              Discover
            </button>
            <button
              className={`transition-colors duration-300 ${
                activeView === "favorites"
                  ? "text-rose-600 border-b-2 border-rose-500"
                  : "hover:text-rose-600"
              } cursor-pointer`}
              onClick={() => setActiveView("favorites")}
            >
              Favorites
            </button>
            <button
              className={`transition-colors duration-300 ${
                activeView === "bookmarks"
                  ? "text-blue-600 border-b-2 border-blue-500"
                  : "hover:text-blue-600"
              } cursor-pointer`}
              onClick={() => setActiveView("bookmarks")}
            >
              Bookmarks
            </button>
            <button
              className={`transition-colors duration-300 ${
                activeView === "contact"
                  ? "text-orange-600 border-b-2 border-orange-500"
                  : "hover:text-orange-600"
              } cursor-pointer`}
              onClick={() => setActiveView("contact")}
            >
              Contact
            </button>
          </div>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:shadow-lg hover:shadow-amber-300 transition-all duration-300 hover:scale-105 cursor-pointer">
            Share Your Food
          </button>
        </div>
      </header>

      {/* Hero Section - Only shown on the main page */}
      {activeView === "all" && (
        <section className="relative py-24 flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-transparent bg-clip-text">
                  The Foodie Journal
                </span>
              </h1>
              <p className="text-2xl text-amber-800 mb-12 max-w-3xl mx-auto">
                For the Ultimate Foodies 🍕🍔 Where Every Bite is an Adventure!
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium shadow-lg hover:shadow-amber-300 transition-all duration-500 hover:scale-110 transform cursor-pointer">
                  Discover Delicious Dishes
                </button>
                <button
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-rose-300 transition-all duration-500 hover:scale-110 transform cursor-pointer"
                  onClick={() => setActiveView("contact")}
                >
                  Get In Touch
                </button>
              </div>

              <div className="mt-16 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                    <Star size={24} fill="#f59e0b" className="text-amber-500" />
                  </div>
                  <p className="text-amber-800">Top Rated</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center">
                    <Heart size={24} fill="#e11d48" className="text-rose-600" />
                  </div>
                  <p className="text-amber-800">Favorites</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center">
                    <Bookmark
                      size={24}
                      fill="#2563eb"
                      className="text-blue-600"
                    />
                  </div>
                  <p className="text-amber-800">Bookmarks</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom header for Favorites section */}
      {activeView === "favorites" && (
        <section className="relative py-16 overflow-hidden">
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-80 p-8 rounded-2xl border border-rose-200 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Heart size={40} className="text-white" fill="white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text">
                      Your Favorite Dishes
                    </h1>
                    <p className="text-xl text-amber-800">
                      All your most loved culinary delights in one place
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {/* Display favorite stats */}
                  <div className="bg-rose-50 rounded-xl p-6 border border-rose-200 hover:border-rose-300 transition-all">
                    <h3 className="text-2xl font-semibold text-rose-700 mb-2">
                      {likedItems.length}
                    </h3>
                    <p className="text-rose-600">Favorites Saved</p>
                  </div>

                  <div className="bg-rose-50 rounded-xl p-6 border border-rose-200 hover:border-rose-300 transition-all">
                    <h3 className="text-2xl font-semibold text-rose-700 mb-2">
                      {foodItems
                        .filter((item) => likedItems.includes(item.id))
                        .reduce((acc, item) => Math.max(acc, item.rating), 0)
                        .toFixed(1) || "0.0"}
                    </h3>
                    <p className="text-rose-600">Highest Rated</p>
                  </div>

                  <div className="bg-rose-50 rounded-xl p-6 border border-rose-200 hover:border-rose-300 transition-all">
                    <h3 className="text-2xl font-semibold text-rose-700 mb-2">
                      {likedItems.length > 0 ? "Yummy!" : "None yet"}
                    </h3>
                    <p className="text-rose-600">Favorite Cuisine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom header for Bookmarks section */}
      {activeView === "bookmarks" && (
        <section className="relative py-16 overflow-hidden">
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-80 p-8 rounded-2xl border border-blue-200 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Bookmark size={40} className="text-white" fill="white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                      Saved For Later
                    </h1>
                    <p className="text-xl text-amber-800">
                      Dishes you've bookmarked to try in the future
                    </p>
                  </div>
                </div>

                {/* Timeline design for bookmarks section */}
                <div className="mt-8 relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-300"></div>

                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <Bookmark size={16} className="text-white" fill="white" />
                    </div>
                    <div className="ml-6 text-xl font-semibold text-blue-700">
                      {bookmarkedItems.length} items on your wishlist
                    </div>
                  </div>

                  {bookmarkedItems.length > 0 && (
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center z-10">
                        <Star size={16} className="text-white" fill="white" />
                      </div>
                      <div className="ml-6 text-lg font-medium text-blue-600">
                        Average rating:{" "}
                        {(
                          foodItems
                            .filter((item) => bookmarkedItems.includes(item.id))
                            .reduce((acc, item) => acc + item.rating, 0) /
                          (bookmarkedItems.length || 1)
                        ).toFixed(1)}{" "}
                        stars
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeView === "contact" && (
        <section ref={contactRef} className="relative z-10 py-20">
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <Mail size={48} className="text-orange-600 mx-auto" />
                </div>
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 text-transparent bg-clip-text">
                  Get In Touch
                </h1>
                <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
                  Have questions about culinary creations or want to share your
                  foodie adventures? We'd love to hear from you!
                </p>

                <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white bg-opacity-80 p-8 rounded-2xl border border-orange-200 shadow-xl transition-all duration-500 transform hover:scale-105">
                  <h3 className="text-2xl font-bold mb-6 text-orange-700">
                    Send a Message
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all h-32"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>

                    <button className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-medium hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                      <Send size={18} />
                      Send Message
                    </button>
                  </div>
                </div>

                <div className="bg-white bg-opacity-80 p-8 rounded-2xl border border-orange-200 shadow-xl transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-6 text-orange-700">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <Mail size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-900">
                          Email Address
                        </h4>
                        <p className="text-amber-700">info@foodiejournal.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <Phone size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-900">
                          Phone Number
                        </h4>
                        <p className="text-amber-700">(555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <MapPin size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-900">Location</h4>
                        <p className="text-amber-700">
                          123 Foodie Street, Culinary District, CA 90210
                        </p>
                      </div>
                    </div>

                    <div className="h-0.5 w-full bg-amber-200 my-6"></div>

                    <div>
                      <h4 className="font-medium text-amber-900 mb-4">
                        Connect With Us
                      </h4>
                      <div className="flex gap-4">
                        <a
                          href="#"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Instagram size={24} className="text-white" />
                        </a>
                        <a
                          href="#"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Twitter size={24} className="text-white" />
                        </a>
                        <a
                          href="#"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Facebook size={24} className="text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Food Gallery Section - Only shown when not on the contact page */}
      {activeView !== "contact" && (
        <section
          ref={galleryRef}
          className="relative z-10 py-16"
          id="food-gallery"
        >
          <div className="container mx-auto px-6">
            {/* View name based on active section */}
            <div className="text-center mb-16">
              {activeView === "all" && (
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-transparent bg-clip-text inline-block ">
                  Too Good to resist!
                </h2>
              )}
              {activeView === "favorites" && (
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text inline-block">
                  Your Favorite Dishes
                </h2>
              )}
              {activeView === "bookmarks" && (
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text inline-block">
                  Saved For Later
                </h2>
              )}

              {/* Conditional render based on active view */}
              {activeView === "favorites" && likedItems.length === 0 && (
                <div className="bg-white bg-opacity-80 rounded-xl p-8 max-w-2xl mx-auto border border-rose-200">
                  <Heart size={48} className="mx-auto mb-4 text-rose-500" />
                  <p className="text-amber-800 text-xl">
                    You haven't added any favorites yet. Heart the items you
                    love!
                  </p>
                </div>
              )}

              {activeView === "bookmarks" && bookmarkedItems.length === 0 && (
                <div className="bg-white bg-opacity-80 rounded-xl p-8 max-w-2xl mx-auto border border-blue-200">
                  <Bookmark size={48} className="mx-auto mb-4 text-blue-500" />
                  <p className="text-amber-800 text-xl">
                    You haven't bookmarked any dishes yet. Save items for later!
                  </p>
                </div>
              )}
            </div>

            {/* Food items grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredItems().map((item) => (
                <div
                  key={item.id}
                  data-id={item.id}
                  className={`food-item bg-white rounded-xl overflow-hidden transition-all duration-500 shadow-md hover:shadow-xl ${
                    visibleItems.includes(item.id)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                >
                  <div className="h-60 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-70 z-10"></div>
                    <img
                      src={`/api/placeholder/800/600?text=${encodeURIComponent(
                        item.name
                      )}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-110 ${
                          likedItems.includes(item.id)
                            ? "bg-rose-100 text-rose-600 border border-rose-200"
                            : "bg-white/50 text-gray-400 border border-gray-200"
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={
                            likedItems.includes(item.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-110 ${
                          bookmarkedItems.includes(item.id)
                            ? "bg-blue-100 text-blue-600 border border-blue-200"
                            : "bg-white/50 text-gray-400 border border-gray-200"
                        }`}
                      >
                        <Bookmark
                          size={20}
                          fill={
                            bookmarkedItems.includes(item.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-amber-900">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-md">
                        <Star
                          size={16}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                        <span className="text-amber-700 font-medium">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <p className="text-amber-700 mb-4">{item.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-200 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-100">
                Foodie Journal
              </h3>
              <p className="mb-6">
                Discover, bookmark, and save your favorite culinary experiences
                from around the world.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-100">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveView("all")}
                    className="hover:text-white transition-colors"
                  >
                    All Dishes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveView("favorites")}
                    className="hover:text-white transition-colors"
                  >
                    My Favorites
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveView("bookmarks")}
                    className="hover:text-white transition-colors"
                  >
                    Saved For Later
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveView("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-100">
                Newsletter
              </h3>
              <p className="mb-4">
                Subscribe to get updates on new culinary discoveries and
                features.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg bg-amber-800 border border-amber-700 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-amber-500 text-amber-900 rounded-r-lg hover:bg-amber-400 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p>
              © {new Date().getFullYear()} Foodie Journal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodieJournal;
