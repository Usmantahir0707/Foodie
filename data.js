export default [
  {
    id: "1",
    title: "Burger King",
    cuisine: "Fast Food",
    assets: {
      rating: "4.5",
      img: "https://i.postimg.cc/mZNTkGnd/bk.png",
      fee: '40',
      time: '40min',
      totalReviews: 120,
      reviewDetails: [
        { user: "Alice", comment: "Great burger!", rating: 5 },
        { user: "Bob", comment: "Loved the fries.", rating: 4 },
        { user: "Charlie", comment: "Good value.", rating: 4 },
        { user: "David", comment: "Service was slow.", rating: 2 },
        { user: "Eva", comment: "Excellent taste!", rating: 5 },
      ],
    },
    menu: [
      {
        title: "Whopper Combos",
        deals: [
          {
            title: "Whopper",
            price: "750",
            desc: "Flame-grilled beef patty with veggies",
            img: "https://cdn.pixabay.com/photo/2021/08/09/21/16/burger-6533561_1280.jpg",
          },
          {
            title: "Chicken Royale",
            price: "700",
            desc: "Breaded chicken fillet with lettuce and mayo",
            img: "https://cdn.pixabay.com/photo/2021/08/30/07/52/burger-2691357_1280.jpg",
          },
        ],
      },
      {
        title: "Sides & Drinks",
        deals: [
          {
            title: "Onion Rings",
            price: "300",
            desc: "Crispy onion rings",
            img: "https://cdn.pixabay.com/photo/2017/08/30/07/52/burger-2691357_1280.jpg",
          },
          {
            title: "Soft Drink",
            price: "150",
            desc: "Choice of cola, lemon-lime or orange soda",
            img: "https://cdn.pixabay.com/photo/2017/08/07/16/35/coke-2607526_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Butt Karahi",
    cuisine: "Pakistani",
    assets: {
      rating: "4.6",
      img: "https://i.postimg.cc/RVS4nD5v/butt.png",
      fee: '60',
      time: '45min',
      totalReviews: 85,
      reviewDetails: [
        { user: "Faisal", comment: "Authentic taste.", rating: 5 },
        { user: "Sara", comment: "Spicy and delicious.", rating: 4 },
        { user: "Ahmed", comment: "Too spicy for me.", rating: 2 },
        { user: "Nida", comment: "Excellent service.", rating: 5 },
        { user: "Zain", comment: "Good ambiance.", rating: 4 },
      ],
    },
    menu: [
      {
        title: "Karahi & Handi",
        deals: [
          {
            title: "Chicken Karahi (Full)",
            price: "1800",
            desc: "Traditional spicy chicken karahi served with salad and naan",
            img: "https://cdn.pixabay.com/photo/2020/01/10/11/18/chicken-4752797_1280.jpg",
          },
          {
            title: "Mutton Handi",
            price: "2200",
            desc: "Creamy boneless mutton handi with rich masala",
            img: "https://cdn.pixabay.com/photo/2020/05/14/20/42/food-5168964_1280.jpg",
          },
        ],
      },
      {
        title: "BBQ & Grill",
        deals: [
          {
            title: "Chicken Seekh Kabab",
            price: "450",
            desc: "2 juicy chicken seekh kababs grilled to perfection",
            img: "https://cdn.pixabay.com/photo/2020/10/08/18/44/kebab-5638732_1280.jpg",
          },
          {
            title: "Beef Boti",
            price: "600",
            desc: "Tender beef boti with raita and chutney",
            img: "https://cdn.pixabay.com/photo/2020/10/15/11/30/kebab-5656445_1280.jpg",
          },
        ],
      },
      {
        title: "Roti & Rice",
        deals: [
          {
            title: "Garlic Naan",
            price: "100",
            desc: "Freshly baked naan with garlic butter",
            img: "https://cdn.pixabay.com/photo/2017/06/15/23/42/naan-2409783_1280.jpg",
          },
          {
            title: "Chicken Biryani",
            price: "500",
            desc: "Spiced basmati rice with tender chicken pieces",
            img: "https://cdn.pixabay.com/photo/2017/12/06/14/49/biryani-3002075_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Subway",
    cuisine: "Sandwiches",
    assets: {
      rating: "4.4",
      img: "https://i.postimg.cc/xTCBQDVN/sub.png",
      fee: '59',
      time: '30min',
      totalReviews: 60,
      reviewDetails: [
        { user: "Olivia", comment: "Fresh and healthy.", rating: 5 },
        { user: "Liam", comment: "Good options.", rating: 4 },
        { user: "Emma", comment: "Slow service.", rating: 3 },
        { user: "Noah", comment: "Nice staff.", rating: 4 },
        { user: "Ava", comment: "Could be cleaner.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Subs",
        deals: [
          {
            title: "Italian BMT",
            price: "500",
            desc: "Ham, salami, pepperoni on 6-inch sub",
            img: "https://cdn.pixabay.com/photo/2014/10/23/18/05/submarine-500254_1280.jpg",
          },
          {
            title: "Turkey Breast",
            price: "550",
            desc: "Sliced turkey breast with veggies",
            img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/sandwich-2299466_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "McDonald's",
    cuisine: "Fast Food",
    assets: {
      rating: "4.6",
      img: "https://i.postimg.cc/8ct8HTQN/mcdo.png",
      fee: '80',
      time: '30min',
      totalReviews: 150,
      reviewDetails: [
        { user: "Sophia", comment: "Always good.", rating: 5 },
        { user: "Jackson", comment: "Love the fries.", rating: 4 },
        { user: "Mia", comment: "Too crowded.", rating: 3 },
        { user: "Lucas", comment: "Fast service.", rating: 4 },
        { user: "Isabella", comment: "Food quality declining.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Exclusive Deals",
        deals: [
          {
            title: "Midnight Meal",
            logo: 'https://i.postimg.cc/FzRV695p/mcd.png',
            price: "450",
            prevPrice: '600',
            desc: "McChicken + coke + fries (discounted price)",
            img: "https://i.postimg.cc/SxS0ntdG/Untitled_design.png",
            show: true,
          },
          {
            title: "Double Quarter Meal",
            logo: 'https://i.postimg.cc/FzRV695p/mcd.png',
            price: "450",
            prevPrice: '600',
            desc: "Double Quarter + coke + fries (discounted price)",
            img: "https://i.postimg.cc/J4m64H4w/double_quater.png",
          },
        ],
      },
      {
        title: "Burgers",
        deals: [
          {
            title: "Hot N’ Crispy",
            price: "600",
            desc: "Crispy chicken patty with mayo and lettuce",
            img: "https://i.postimg.cc/ry5ZkNTC/hot_n_crispy.png",
          },
          {
            title: "Spicy Chicken Burger",
            price: "600",
            desc: "Spice up your life! A legendary combo of 100% pure chicken with spicy sauce and crispy shredded lettuce, all in a soft burger bun.",
            img: "https://i.postimg.cc/hvRCmfLd/spicy_chick.png",
          },
          {
            title: "McCrispy",
            price: "600",
            desc: "Deliciously hot & kickin’! Between the corn dusted bun lies tender, juicy, boneless chicken thigh meat, encased in a crisp and crumbling spicy crust, all topped with fresh lettuce, cheese and creamy mayonnaise to set your mouth on fire.",
            img: "https://i.postimg.cc/1X0vrsBY/mccrispy.png",
          },
          {
            title: "McChicken",
            price: "600",
            desc: "The classic combination! It’s the simple things that matter. Our quality chicken breast, cooked in a seasoned tempura coating, topped with fresh grown lettuce and our exceptional McChicken sauce, between a sesame seed bun makes for a hard to beat classic.",
            img: "https://i.postimg.cc/NjHsxnmv/mcchick.png",
          },
          {
            title: "Filet-o-Fish",
            price: "600",
            desc: "Light and flaky white fish filet, topped with tangy tartar sauce all on a lightly steamed bun.",
            img: "https://i.postimg.cc/SsMTjWM4/fish_0.png",
          },
          {
            title: "Big Mac",
            price: "700",
            desc: "Made with a double layer of sear-sizzled 100% pure beef that mingles with sauce and melted cheese, diced onion, crisp shredded iceberg lettuce and a crunch of pickle.",
            img: "https://i.postimg.cc/3wQKfZF4/bigmac.png",
          },
          {
            title: "McRoyale",
            price: "700",
            desc: "Get ready for a royal experience. Made with 100% pure beef patty, cheese slice, lettuce, tomato, mayonnaise, ketchup, mustard, onions and pickles, all set on a sesame seed bun, McRoyale truly understands your cravings!",
            img: "https://i.postimg.cc/zfM2Jd3p/mcRoyal.png",
          },
          {
            title: "Cheese Burger",
            price: "700",
            desc: "A 100% pure beef patty with absolutely no fillers, additives or preservatives, seasoned with a pinch of salt and pepper, and topped with a tangy pickle, chopped onions, ketchup, mustard, and a slice of melty American cheese.",
            img: "https://i.postimg.cc/g2gB7cWC/chesse.png",
          },
          {
            title: "Double Cheese Burger",
            price: "700",
            desc: "Get double the flavour! The first hit of sear-sizzled 100% pure beef gets your taste buds ready for that delicious second hit of the double layer melted cheese. Now that’s a taste knockout.",
            img: "https://i.postimg.cc/pdy1MNVp/double_cheese.png",
          },
          {
            title: "Quarter Pounder with Cheese",
            price: "700",
            desc: "It’s mighty simple! 100% pure beef and a double helping of cheese with simple and quality ingredients, bettered by adding onion, pickles, tomato ketchup and mustard in a sesame seed bun.",
            img: "https://i.postimg.cc/zGzcpb9w/quater.png",
          },
        ],
      },
      {
        title: "Happy Meals",
        deals: [
          {
            title: "Happy Meal Cheese Burger",
            price: "250",
            desc: "It’s Cheesy! A legendary combo of 100% pure beef, onions, pickles, ketchup, mustard and cheese, all in a soft burger bun",
            img: "https://i.postimg.cc/hPbY9b3P/hapy_chese.png",
          },
          {
            title: "Happy Meal Chicken Burger",
            price: "350",
            desc: "Grab one! A legendary combo of 100% pure chicken and ketchup, all in a soft burger bun to make you want to go and get one for yourself.",
            img: "https://i.postimg.cc/hPqwz3s5/happy_chick.png",
          },
          {
            title: "Happy Meal Chicken McNuggets",
            price: "350",
            desc: "Bite one! Our tender, juicy chicken breast, cut and seasoned in a crispy tempura coating start the fun especially when eaten with our appetizing dipping sauces options in barbecue, hot mustard or sweet and sour",
            img: "https://i.postimg.cc/Xq9z1wjL/happy_nuiggets.png",
          },
        ],
      },
      {
        title: "Fries & Sides",
        deals: [
          {
            title: "Medium Fries",
            price: "250",
            desc: "Golden crispy fries regular",
            img: "https://i.postimg.cc/Fs1sYzKR/fries.png",
          },
          {
            title: "Chicken Nuggets",
            price: "350",
            desc: "6 pieces with dipping sauce",
            img: "https://i.postimg.cc/YqV2Y74x/nuggets.png",
          },
          {
            title: "Chicken Tenders",
            price: "350",
            desc: "6 pieces with dipping sauce",
            img: "https://i.postimg.cc/1RYh8K2x/tenders.png",
          },
        ],
      },
      {
        title: "Desserts",
        deals: [
          {
            title: "Double Chocolate Pie",
            price: "250",
            desc: "Golden crispy fries regular",
            img: "https://i.postimg.cc/zBsQkdr3/double_choc_pie.png",
          },
          {
            title: "Brownie Sundae",
            price: "350",
            desc: "6 pieces with dipping sauce",
            img: "https://i.postimg.cc/zBbMWs49/sund_brownie.png",
          },
          {
            title: "McFlurry Oreo",
            price: "350",
            desc: "Indulgence at its best! A creamy and delicious fluffy soft-serve madness.",
            img: "https://i.postimg.cc/k5hz2JYQ/oreo_flurry.png",
          },
          {
            title: "Hot Fudge Sundae",
            price: "350",
            desc: "A classic Hot Fudge Sundae made with vanilla soft serve, smothered in chocolaty hot fudge topping.",
            img: "https://i.postimg.cc/3wwzr41r/hot_fudge_sund.png",
          },
          {
            title: "Strawberry Sundae",
            price: "350",
            desc: "Let the love affair begin! It’s a delicious delight of sundae mix made with milk ingredients and soaked in thick warm fudge",
            img: "https://i.postimg.cc/2SGPfF4X/straw_sund.png",
          },
          {
            title: "Vanilla Cone",
            price: "350",
            desc: "A little treat for yourself! Soft, smooth vanilla layered on a crunchy cone",
            img: "https://i.postimg.cc/W1TQKfJk/van_cone.png",
          },
          {
            title: "Choco Cone",
            price: "350",
            desc: "Cherish it till it lasts! Soft, smooth vanilla dipped in hot chocolate and layered on a crunchy cone.",
            img: "https://i.postimg.cc/15pkvZ4S/cohocho_cone.png",
          },
          {
            title: "Apple Pie",
            price: "350",
            desc: "Apple Pie.",
            img: "https://i.postimg.cc/Nfqh80sb/apple_pie.png",
          },
          {
            title: "McFlurry Lotus",
            price: "350",
            desc: "Creamy vanilla soft serve swirled with crunchy Lotus Biscoff pieces — a perfect balance of smooth, sweet, and crunchy delight.",
            img: "https://i.postimg.cc/Y2mKmFHh/lotus_flurry.png",
          },
        ],
      },
      {
        title: "Drinks",
        deals: [
          {
            title: "Coca-Cola",
            price: "150",
            desc: "Cold soft drink",
            img: "https://i.postimg.cc/bYmwYkpW/coke.png",
          },
          {
            title: "Sprite",
            price: "200",
            desc: "Freshly brewed coffee",
            img: "https://i.postimg.cc/CLkg9qPW/sprite.png",
          },
          {
            title: "Fanta",
            price: "200",
            desc: "Freshly brewed coffee",
            img: "https://i.postimg.cc/WpQV9nnG/Fanta.png",
          },
          {
            title: "Orange 100% Fruit Juice",
            price: "200",
            desc: "Enjoy fresh and 100% pure fruit juice in orange flavour.",
            img: "https://i.postimg.cc/W4WL06zJ/Juice.png",
          },
          {
            title: "Chocolate Shake",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and chocolate syrup shake so thick it hardly makes it up the straw.Also available in strawberry and vanilla.",
            img: "https://i.postimg.cc/bvNfGFyh/Chocolate-Shake.png",
          },
          {
            title: "Strawberry Shake",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and strawberry syrup shake so thick it hardly makes it up the straw.Also available in chocolate and vanilla.",
            img: "https://i.postimg.cc/t4zH4HHk/Strawberry-Shake.png",
          },
          {
            title: "Vanilla Shake",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and vanilla syrup shake so thick it hardly makes it up the straw.Also available in chocolate and strawberry.",
            img: "https://i.postimg.cc/6pKXKpFT/Vanilla-Shake.png",
          },
          
        ],
      },
      {
        title: "McCafé",
        deals: [
          {
            title: "Iced Americano",
            price: "150",
            desc: "A flavorful sip with two parts brewed McCafé espresso and water, topped with ice",
            img: "https://i.postimg.cc/7PCDMcgP/iced-americano.png",
          },
          {
            title: "Caramel Iced Latte",
            price: "200",
            desc: "Caramel Iced LatteCool down with a cold McCafe Caramel Iced Latte, made from 100% Arabica beans. This delicious Iced Latte is made fresh just for you with cold milk mixed with Caramel flavor.",
            img: "https://i.postimg.cc/WtR5Mt0Z/Caramel-Iced-Latte.png",
          },
          {
            title: "Chocolate Frappé",
            price: "200",
            desc: "Blended iced drink",
            img: "https://i.postimg.cc/0jKtM7Kx/Chocolate-Frappe.png",
          },
          {
            title: "Chocolate Oreo Frappé",
            price: "200",
            desc: "Blended iced drink with delectable Oreo® bits, milk and rich chocolate flavour.",
            img: "https://i.postimg.cc/sXN6gTXw/Oreo-Frappe.png",
          },
          {
            title: "Raspberry Iced Tea",
            price: "200",
            desc: "Cool down with Raspberry Iced Tea. This delicious Iced Tea is made fresh just for you",
            img: "https://i.postimg.cc/KYQpdGyX/Raspberry-Iced-Tea.png",
          },
          {
            title: "Espresso",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and strawberry syrup shake so thick it hardly makes it up the straw.Also available in chocolate and vanilla.",
            img: "https://i.postimg.cc/VkQhtZFh/espresso.png",
          },
          {
            title: "Americano",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and vanilla syrup shake so thick it hardly makes it up the straw.Also available in chocolate and strawberry.",
            img: "https://i.postimg.cc/xd9Fxkhy/americano.png",
          },
          {
            title: "Babyccino",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and vanilla syrup shake so thick it hardly makes it up the straw.Also available in chocolate and strawberry.",
            img: "https://i.postimg.cc/JzN2536z/Babyccino.png",
          },
          {
            title: "Cappuccino",
            price: "200",
            desc: "At McDonald’s, we start with best ingredients to give you a truly exceptional cup of Cappuccino. Freshly brewed, aromatic, 100% Arabica beans with hot frothy milk will drive you crazy for our Cappuccino.",
            img: "https://i.postimg.cc/zXRMVYTW/Cappuccino.png",
          },
          {
            title: "Latte",
            price: "200",
            desc: "McDonald’s Latte is that right mix of 100% Arabica beans and velvety steamed milk with a touch of froth. A perfect hot cup that will make you fall in love and say, “I love you a Latte!”.",
            img: "https://i.postimg.cc/y6Gt183s/Latte-.png",
          },
          {
            title: "Tea",
            price: "200",
            desc: "The way you like it!",
            img: "https://i.postimg.cc/qqW5j1Hz/tea.png",
          },
          {
            title: "Green Tea",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and vanilla syrup shake so thick it hardly makes it up the straw.Also available in chocolate and strawberry.",
            img: "https://i.postimg.cc/QCFzQRP2/Green-tea.png",
          },
          {
            title: "Cardamom Tea",
            price: "200",
            desc: "An irresistible blend! A creamy, fresh milk and vanilla syrup shake so thick it hardly makes it up the straw.Also available in chocolate and strawberry.",
            img: "https://i.postimg.cc/Px3c8t6b/Cardamom-.png",
          },
          {
            title: "Boston Cream",
            price: "350",
            desc: "A creamy filled delight.",
            img: "https://i.postimg.cc/W47xTmgH/Boston-Cream.png",
          },
          {
            title: "Caramel Cream",
            price: "350",
            desc: "The taste you can’t resist is in this exceptional donut filled with caramel cream.",
            img: "https://i.postimg.cc/j5dm5Whd/Caramel-Cream.png",
          },
          {
            title: "Double Chocolate Muffin",
            price: "350",
            desc: "Rich chocolaty goodness filled with chunks of chocolate is just the thing you need with your tea or coffee.",
            img: "https://i.postimg.cc/CxkW6p1Y/Double-Chocolate-Muffin.png",
          },
          {
            title: "Blueberry Muffin",
            price: "350",
            desc: "A soft and moist muffin with a rich taste of fresh blueberries",
            img: "https://i.postimg.cc/mr4Kvpz9/Blueberry-Muffin.png",
          },
          {
            title: "Double Chocolate Cookie",
            price: "350",
            desc: "Double Chocolate Cookie infused with chunks of rich milk chocolate and melted dark chocolate",
            img: "https://i.postimg.cc/DyJVLX3S/Double-Chocolate-cookui.png",
          },
          {
            title: "Milk Chocolate Cookie",
            price: "350",
            desc: "A satisfying taste, cookies infused with milk chocolate chunks.",
            img: "https://i.postimg.cc/Fz62w93F/milk-choch-cooki.png",
          },
          {
            title: "Butter Croissant",
            price: "350",
            desc: "Flaky, buttery, and deliciously authentic plain croissant",
            img: "https://i.postimg.cc/vHpJzZG3/Plain-butter.png",
          },
        ],
      },
      
    ],
  },
  {
    id: "5",
    title: "KFC",
    cuisine: "Fast Food",
    assets: {
      rating: "4.7",
      img: "https://i.postimg.cc/4yJkVm0W/kfcc.png",
      fee: '75',
      time: '40min',
      totalReviews: 180,
      reviewDetails: [
        { user: "Ethan", comment: "Crispy and tasty.", rating: 5 },
        { user: "Emma", comment: "Perfect for family.", rating: 4 },
        { user: "Oliver", comment: "A bit expensive.", rating: 3 },
        { user: "Aiden", comment: "Always fresh.", rating: 5 },
        { user: "Sophia", comment: "Long wait time.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Exclusive Deals",
        deals: [
          {
            title: "5-Piece Chicken",
            logo: 'https://i.postimg.cc/28t2PB5Z/Kfc.png',
            price: "1100",
            prevPrice: '1450',
            desc: "5 pieces of crispy chicken with fries and 2 drinks (discounted)",
            img: "https://i.postimg.cc/cJw97408/5piece.png",
            show: true,
          },
        ],
      },
      {
        title: "Buckets & Combos",
        deals: [
          {
            title: "8-Piece Bucket",
            price: "1600",
            desc: "8 pieces of crispy chicken with fries and drink",
            img: "https://cdn.pixabay.com/photo/2019/11/04/19/33/fried-chicken-4601293_1280.jpg",
          },
          {
            title: "Family Feast",
            price: "2800",
            desc: "15 pieces of chicken with fries, coleslaw and drinks",
            img: "https://cdn.pixabay.com/photo/2020/05/08/21/05/fried-chicken-5145880_1280.jpg",
          },
        ],
      },
      {
        title: "Sandwiches & Wraps",
        deals: [
          {
            title: "Zinger Burger",
            price: "650",
            desc: "Spicy chicken fillet burger",
            img: "https://cdn.pixabay.com/photo/2017/11/09/21/41/burger-2939937_1280.jpg",
          },
          {
            title: "Chicken Wrap",
            price: "550",
            desc: "Grilled chicken wrap with veggies and sauce",
            img: "https://cdn.pixabay.com/photo/2018/04/15/10/00/wrap-3323477_1280.jpg",
          },
        ],
      },
      {
        title: "Sides",
        deals: [
          {
            title: "Fries",
            price: "250",
            desc: "Classic crispy fries",
            img: "https://cdn.pixabay.com/photo/2020/07/22/13/22/french-fries-5421466_1280.jpg",
          },
          {
            title: "Coleslaw",
            price: "150",
            desc: "Fresh coleslaw salad",
            img: "https://cdn.pixabay.com/photo/2017/10/21/20/33/coleslaw-2873424_1280.jpg",
          },
        ],
      },
      
    ],
  },
  {
    id: "6",
    title: "BBQ Tonight",
    cuisine: "Pakistani",
    assets: {
      rating: "4.5",
      img: "https://i.postimg.cc/RZ8ByC30/bbqq.png",
      fee: '40',
      time: '50min',
      totalReviews: 70,
      reviewDetails: [
        { user: "Hassan", comment: "Amazing flavors.", rating: 5 },
        { user: "Sadia", comment: "Great ambiance.", rating: 4 },
        { user: "Ali", comment: "Meat was a bit dry.", rating: 3 },
        { user: "Muneeb", comment: "Excellent service.", rating: 5 },
        { user: "Fatima", comment: "Could improve cleanliness.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Exclusive Deals",
        deals: [
          {
            title: "Family Grill",
            logo: 'https://i.postimg.cc/ZKmf8yqP/bbq.jpg',
            price: "2200",
            prevPrice: '2500',
            desc: "BBQ platter for 4 at a discounted rate",
            img: "https://i.postimg.cc/wBQ5Tt9F/platter.png",
            show: true,
          },
        ],
      },
      {
        title: "BBQ Specials",
        deals: [
          {
            title: "Chicken Tikka (Leg)",
            price: "400",
            desc: "Spicy grilled chicken leg quarter tikka",
            img: "https://cdn.pixabay.com/photo/2020/12/04/21/02/tikka-5802474_1280.jpg",
          },
          {
            title: "Beef Seekh Kabab",
            price: "500",
            desc: "2 skewers of beef seekh kabab served with chutney",
            img: "https://cdn.pixabay.com/photo/2015/04/20/13/25/kebab-731478_1280.jpg",
          },
        ],
      },
      {
        title: "Platters",
        deals: [
          {
            title: "BBQ Mix Platter",
            price: "1600",
            desc: "Chicken tikka, malai boti, kabab, naan, chutney",
            img: "https://cdn.pixabay.com/photo/2021/01/01/19/58/platter-5879196_1280.jpg",
          },
        ],
      },
      
    ],
  },
  {
    id: "7",
    title: "Domino's Pizza",
    cuisine: "Pizza",
    assets: {
      rating: "4.3",
      img: "https://i.postimg.cc/nzftVdGb/dom.png",
      fee: '100',
      time: '25min',
      totalReviews: 130,
      reviewDetails: [
        { user: "James", comment: "Delicious pizza.", rating: 5 },
        { user: "Amelia", comment: "Quick delivery.", rating: 4 },
        { user: "Benjamin", comment: "Too greasy.", rating: 2 },
        { user: "Charlotte", comment: "Loved the crust.", rating: 4 },
        { user: "Henry", comment: "Not enough toppings.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Pizza Combos",
        deals: [
          {
            title: "Pepperoni Pizza",
            price: "850",
            desc: "Large pepperoni pizza with garlic bread",
            img: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
          },
          {
            title: "Veggie Lovers",
            price: "800",
            desc: "Large veggie pizza with sides",
            img: "https://cdn.pixabay.com/photo/2016/11/18/17/20/pizza-1839656_1280.jpg",
          },
        ],
      },
      {
        title: "Sides",
        deals: [
          {
            title: "Garlic Bread",
            price: "300",
            desc: "Freshly baked garlic bread",
            img: "https://cdn.pixabay.com/photo/2016/11/29/07/15/garlic-bread-1869596_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    title: "Taco Bell",
    cuisine: "Fast Food",
    assets: {
      rating: "4.2",
      img: "https://i.postimg.cc/Gpk5KbGV/taco.png",
      fee: '60',
      time: '30min',
      totalReviews: 90,
      reviewDetails: [
        { user: "Liam", comment: "Tasty tacos!", rating: 5 },
        { user: "Sophia", comment: "Good value.", rating: 4 },
        { user: "James", comment: "Could be spicier.", rating: 3 },
        { user: "Emma", comment: "Fast service.", rating: 4 },
        { user: "Ava", comment: "Not very fresh.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Tacos & Combos",
        deals: [
          {
            title: "Taco Trio",
            price: "600",
            desc: "3 beef tacos with salsa",
            img: "https://cdn.pixabay.com/photo/2020/05/14/16/51/tacos-5168506_1280.jpg",
          },
          {
            title: "Crunchwrap Supreme",
            price: "750",
            desc: "Tortilla wrap with beef, cheese, lettuce, tomato",
            img: "https://cdn.pixabay.com/photo/2019/07/18/14/23/taco-4348687_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "9",
    title: "Pizza Hut",
    cuisine: "Pizza",
    assets: {
      rating: "4.4",
      img: "https://i.postimg.cc/QxYGKNJq/pizzahut.png",
      fee: '50',
      time: '30min',
      totalReviews: 110,
      reviewDetails: [
        { user: "Liam", comment: "Great pizza!", rating: 5 },
        { user: "Sophia", comment: "Loved the crust.", rating: 4 },
        { user: "Mia", comment: "Too salty.", rating: 2 },
        { user: "Noah", comment: "Quick delivery.", rating: 4 },
        { user: "Ava", comment: "Could use more toppings.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Pizzas",
        deals: [
          {
            title: "Supreme Pizza",
            price: "900",
            desc: "Pepperoni, veggies, olives, and cheese",
            img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/pizza-2299439_1280.jpg",
          },
          {
            title: "Cheese Lover's Pizza",
            price: "850",
            desc: "Extra cheese with mozzarella and cheddar",
            img: "https://cdn.pixabay.com/photo/2016/11/29/10/07/cheese-1869586_1280.jpg",
          },
        ],
      },
      {
        title: "Sides & Desserts",
        deals: [
          {
            title: "Breadsticks",
            price: "300",
            desc: "Soft breadsticks with marinara sauce",
            img: "https://cdn.pixabay.com/photo/2018/11/21/10/34/bread-3827267_1280.jpg",
          },
          {
            title: "Chocolate Lava Cake",
            price: "400",
            desc: "Warm chocolate cake with molten center",
            img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/chocolate-cake-2299447_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    title: "Chinese Express",
    cuisine: "Chinese",
    assets: {
      rating: "4.3",
      img: "https://i.postimg.cc/NjLtd2jV/chinaEx.png",
      fee: '40',
      time: '40min',
      totalReviews: 80,
      reviewDetails: [
        { user: "Liam", comment: "Delicious!", rating: 5 },
        { user: "Emma", comment: "Good portions.", rating: 4 },
        { user: "Noah", comment: "Taste could be better.", rating: 3 },
        { user: "Sophia", comment: "Quick service.", rating: 4 },
        { user: "Olivia", comment: "Overpriced.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Appetizers",
        deals: [
          {
            title: "Spring Rolls",
            price: "300",
            desc: "Vegetable spring rolls with sweet chili sauce",
            img: "https://cdn.pixabay.com/photo/2017/02/07/20/41/spring-rolls-2044417_1280.jpg",
          },
          {
            title: "Chicken Wings",
            price: "450",
            desc: "Spicy fried chicken wings",
            img: "https://cdn.pixabay.com/photo/2017/12/19/11/14/chicken-wings-3020896_1280.jpg",
          },
        ],
      },
      {
        title: "Main Dishes",
        deals: [
          {
            title: "Kung Pao Chicken",
            price: "700",
            desc: "Spicy stir-fried chicken with peanuts",
            img: "https://cdn.pixabay.com/photo/2016/11/29/10/07/chicken-1869589_1280.jpg",
          },
          {
            title: "Vegetable Chow Mein",
            price: "600",
            desc: "Stir-fried noodles with veggies",
            img: "https://cdn.pixabay.com/photo/2016/11/21/15/27/noodles-1846139_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "11",
    title: "Sushi World",
    cuisine: "Japanese",
    assets: {
      rating: "4.7",
      img: "https://i.postimg.cc/cLtjKRHs/sushi-world.png",
      fee: '75',
      time: '30min',
      totalReviews: 95,
      reviewDetails: [
        { user: "Liam", comment: "Amazing sushi!", rating: 5 },
        { user: "Emma", comment: "Fresh and tasty.", rating: 4 },
        { user: "Noah", comment: "A bit pricey.", rating: 3 },
        { user: "Sophia", comment: "Beautiful presentation.", rating: 4 },
        { user: "Oliver", comment: "Could improve variety.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Sushi Rolls",
        deals: [
          {
            title: "California Roll",
            price: "750",
            desc: "Crab, avocado, cucumber",
            img: "https://cdn.pixabay.com/photo/2014/12/21/23/28/sushi-575028_1280.jpg",
          },
          {
            title: "Spicy Tuna Roll",
            price: "800",
            desc: "Tuna with spicy mayo",
            img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1239432_1280.jpg",
          },
        ],
      },
      {
        title: "Sashimi & Nigiri",
        deals: [
          {
            title: "Salmon Nigiri",
            price: "650",
            desc: "Fresh salmon over rice",
            img: "https://cdn.pixabay.com/photo/2017/12/23/10/06/sushi-3030121_1280.jpg",
          },
          {
            title: "Tuna Sashimi",
            price: "700",
            desc: "Thin slices of raw tuna",
            img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1239431_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "12",
    title: "Popeyes",
    cuisine: "Fast Food",
    assets: {
      rating: "4.4",
      img: "https://i.postimg.cc/6QRDPrJH/popo.png",
      fee: '40',
      time: '30min',
      totalReviews: 100,
      reviewDetails: [
        { user: "Liam", comment: "Crispy chicken!", rating: 5 },
        { user: "Emma", comment: "Good flavor.", rating: 4 },
        { user: "Noah", comment: "Overpriced.", rating: 3 },
        { user: "Sophia", comment: "Fast delivery.", rating: 4 },
        { user: "Olivia", comment: "Not hot enough.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Chicken & Combos",
        deals: [
          {
            title: "3 Piece Chicken Combo",
            price: "850",
            desc: "3 pieces of spicy fried chicken with fries and drink",
            img: "https://cdn.pixabay.com/photo/2017/11/01/13/00/fried-chicken-2903437_1280.jpg",
          },
          {
            title: "Chicken Sandwich",
            price: "650",
            desc: "Spicy crispy chicken sandwich",
            img: "https://cdn.pixabay.com/photo/2017/09/22/16/46/chicken-sandwich-2772386_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "13",
    title: "Second Cup",
    cuisine: "Cafe & Coffeehouse",
    assets: {
      rating: "4.5",
      img: "https://i.postimg.cc/qqBSgWtY/sec.png",
      fee: '60',
      time: '20min',
      totalReviews: 80,
      reviewDetails: [
        { user: "Emma", comment: "Nice coffee!", rating: 5 },
        { user: "Liam", comment: "Good service.", rating: 4 },
        { user: "Olivia", comment: "Too pricey.", rating: 3 },
        { user: "Noah", comment: "Loved the muffins.", rating: 4 },
        { user: "Ava", comment: "Limited options.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Exclusive Deals",
        deals: [
          {
            title: "Morning Combo",
            price: "750",
            prevPrice: '900',
            logo: 'https://i.postimg.cc/WpHK04kX/Second-Cup.png',
            desc: "Latte + muffin combo available until 11am",
            img: "https://i.postimg.cc/hjGmDpyP/latte.png",
            show: true,
          }
        ],
      },
      {
        title: "Coffee & Espresso",
        deals: [
          {
            title: "Vanilla Bean Latte",
            price: "550",
            desc: "Creamy espresso with vanilla bean syrup and steamed milk",
            img: "https://cdn.pixabay.com/photo/2017/05/23/22/36/coffee-2337608_1280.jpg",
          },
          {
            title: "Iced Cappuccino",
            price: "500",
            desc: "Chilled espresso blended with milk and ice, topped with foam",
            img: "https://cdn.pixabay.com/photo/2018/05/17/20/27/iced-coffee-3407663_1280.jpg",
          }
        ],
      },
      {
        title: "Baked Goods",
        deals: [
          {
            title: "Blueberry Muffin",
            price: "350",
            desc: "Freshly baked muffin with real blueberries",
            img: "https://cdn.pixabay.com/photo/2016/04/25/22/37/blueberry-muffins-1356210_1280.jpg",
          }
        ],
      },
      
    ],
  },
  {
    id: "14",
    title: "Salt’n Pepper",
    cuisine: "Continental",
    assets: {
      rating: "4.8",
      img: "https://i.postimg.cc/FR42XYhh/salt.png",
      fee: '50',
      time: '30min',
      totalReviews: 90,
      reviewDetails: [
        { user: "Hassan", comment: "Excellent BBQ!", rating: 5 },
        { user: "Sadia", comment: "Great variety.", rating: 4 },
        { user: "Ali", comment: "Meat was dry.", rating: 3 },
        { user: "Muneeb", comment: "Excellent service.", rating: 5 },
        { user: "Fatima", comment: "Cleanliness can improve.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Bar B Q",
        deals: [
          {
            title: "Chicken Seekh Kebab (4 pcs)",
            price: "985",
            desc: "Spicy, crispy outside & soft inside",
            img: "https://cdn.pixabay.com/photo/2015/04/20/13/25/kebab-731478_1280.jpg",
          },
          {
            title: "Mix Platter",
            price: "2835",
            desc: "Seekh kabab, boneless boti, fish tikka, mutton kabab",
            img: "https://cdn.pixabay.com/photo/2021/01/01/19/58/platter-5879196_1280.jpg",
          },
        ],
      },
      {
        title: "Desi Delights",
        deals: [
          {
            title: "Boneless Chicken Handi",
            price: "1530",
            desc: "Rich chicken handi, served with naan or rice",
            img: "https://cdn.pixabay.com/photo/2017/05/07/11/34/beef-curry-2299355_1280.jpg",
          },
          {
            title: "Mutton Karahi",
            price: "2155",
            desc: "Juicy slow-cooked mutton karahi in special masala",
            img: "https://cdn.pixabay.com/photo/2017/05/07/11/34/beef-curry-2299355_1280.jpg",
          },
        ],
      },
      {
        title: "Beverages & Desserts",
        deals: [
          {
            title: "Gulab Jamun (single)",
            price: "280",
            desc: "Traditional syrupy sweet",
            img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/chocolate-cake-2299447_1280.jpg",
          },
          {
            title: "M&M Shake",
            price: "500",
            desc: "Creamy milkshake with M&M candies",
            img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/chocolate-cake-2299447_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "15",
    title: "Cafe Mocha",
    cuisine: "Cafe",
    assets: {
      rating: "4.2",
      img: "https://i.postimg.cc/Hsk1L8Xx/moch.png",
      fee: '80',
      time: '40min',
      totalReviews: 70,
      reviewDetails: [
        { user: "Emma", comment: "Nice coffee!", rating: 5 },
        { user: "Liam", comment: "Good service.", rating: 4 },
        { user: "Olivia", comment: "Too pricey.", rating: 3 },
        { user: "Noah", comment: "Loved the muffins.", rating: 4 },
        { user: "Ava", comment: "Limited options.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Coffee & Drinks",
        deals: [
          {
            title: "Espresso",
            price: "250",
            desc: "Strong black coffee",
            img: "https://cdn.pixabay.com/photo/2016/11/29/10/07/coffee-1869538_1280.jpg",
          },
          {
            title: "Latte",
            price: "350",
            desc: "Coffee with steamed milk",
            img: "https://cdn.pixabay.com/photo/2015/11/07/11/44/coffee-1031636_1280.jpg",
          },
        ],
      },
      {
        title: "Pastries",
        deals: [
          {
            title: "Croissant",
            price: "300",
            desc: "Flaky buttery croissant",
            img: "https://cdn.pixabay.com/photo/2016/11/29/07/15/croissant-1869629_1280.jpg",
          },
          {
            title: "Blueberry Muffin",
            price: "250",
            desc: "Fresh blueberry muffin",
            img: "https://cdn.pixabay.com/photo/2016/06/22/10/59/muffin-1476164_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "16",
    title: "Shake Shack",
    cuisine: "Fast Food",
    assets: {
      rating: "4.3",
      img: "https://i.postimg.cc/BbhyFNHv/shake.png",
      fee: '90',
      time: '40min',
      totalReviews: 110,
      reviewDetails: [
        { user: "Liam", comment: "ShackBurger is awesome!", rating: 5 },
        { user: "Emma", comment: "Fries are crispy.", rating: 4 },
        { user: "Noah", comment: "Too expensive.", rating: 3 },
        { user: "Sophia", comment: "Great atmosphere.", rating: 4 },
        { user: "Oliver", comment: "Burger was cold.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Burgers",
        deals: [
          {
            title: "ShackBurger",
            price: "750",
            desc: "Cheeseburger with lettuce, tomato, ShackSauce",
            img: "https://cdn.pixabay.com/photo/2019/09/07/18/17/burger-4452116_1280.jpg",
          },
          {
            title: "SmokeShack",
            price: "800",
            desc: "Cheeseburger with bacon and cherry pepper",
            img: "https://cdn.pixabay.com/photo/2019/09/07/18/17/burger-4452116_1280.jpg",
          },
        ],
      },
      {
        title: "Fries & Drinks",
        deals: [
          {
            title: "Crinkle-Cut Fries",
            price: "350",
            desc: "Seasoned crinkle-cut fries",
            img: "https://cdn.pixabay.com/photo/2018/07/23/20/48/fries-3554651_1280.jpg",
          },
          {
            title: "Shack-made Lemonade",
            price: "300",
            desc: "Fresh lemonade",
            img: "https://cdn.pixabay.com/photo/2018/08/01/16/25/lemonade-3571967_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "17",
    title: "Panda Express",
    cuisine: "Chinese",
    assets: {
      rating: "4.1",
      img: "https://i.postimg.cc/2SqpQpHN/panda.png",
      fee: '50',
      time: '45min',
      totalReviews: 80,
      reviewDetails: [
        { user: "Liam", comment: "Tasty!", rating: 5 },
        { user: "Emma", comment: "Good portions.", rating: 4 },
        { user: "Noah", comment: "Average taste.", rating: 3 },
        { user: "Sophia", comment: "Quick service.", rating: 4 },
        { user: "Olivia", comment: "Overpriced.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Entrées",
        deals: [
          {
            title: "Orange Chicken",
            price: "700",
            desc: "Crispy chicken with tangy orange sauce",
            img: "https://cdn.pixabay.com/photo/2017/03/20/13/33/orange-chicken-2158981_1280.jpg",
          },
          {
            title: "Beijing Beef",
            price: "750",
            desc: "Crispy beef with sweet and spicy sauce",
            img: "https://cdn.pixabay.com/photo/2017/03/20/13/33/beef-2158975_1280.jpg",
          },
        ],
      },
      {
        title: "Sides",
        deals: [
          {
            title: "Fried Rice",
            price: "350",
            desc: "Steamed fried rice with veggies",
            img: "https://cdn.pixabay.com/photo/2017/02/07/20/38/fried-rice-2044399_1280.jpg",
          },
          {
            title: "Chow Mein",
            price: "350",
            desc: "Stir-fried noodles with vegetables",
            img: "https://cdn.pixabay.com/photo/2016/11/21/15/27/noodles-1846139_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "18",
    title: "Student Biryani",
    cuisine: "Pakistani",
    assets: {
      rating: "4.3",
      img: "https://i.postimg.cc/NfzSfJQJ/stu.png",
      fee: '40',
      time: '25min',
      totalReviews: 75,
      reviewDetails: [
        { user: "Ali", comment: "Tasty biryani.", rating: 5 },
        { user: "Sara", comment: "Good spice level.", rating: 4 },
        { user: "Ahmed", comment: "Could be more flavorful.", rating: 3 },
        { user: "Nida", comment: "Nice packaging.", rating: 4 },
        { user: "Zain", comment: "A bit cold.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Biryani",
        deals: [
          {
            title: "Chicken Biryani",
            price: "400",
            desc: "Classic spicy chicken biryani with salad and raita",
            img: "https://cdn.pixabay.com/photo/2020/06/28/06/18/biryani-5348795_1280.jpg",
          },
          {
            title: "Beef Biryani",
            price: "450",
            desc: "Slow-cooked beef biryani with masala rice",
            img: "https://cdn.pixabay.com/photo/2021/09/05/11/59/biryani-6599002_1280.jpg",
          },
        ],
      },
      {
        title: "Snacks",
        deals: [
          {
            title: "Chicken Samosa (3 pcs)",
            price: "120",
            desc: "Crispy fried samosas with chicken filling",
            img: "https://cdn.pixabay.com/photo/2019/11/11/14/14/samosa-4617673_1280.jpg",
          },
          {
            title: "Shami Kabab (2 pcs)",
            price: "200",
            desc: "Traditional minced meat kababs",
            img: "https://cdn.pixabay.com/photo/2020/10/06/08/46/kebab-5631141_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "19",
    title: "Wendy's",
    cuisine: "Fast Food",
    assets: {
      rating: "4.0",
      img: "https://i.postimg.cc/QMLzcF9c/wendys.png",
      fee: '80',
      time: '30min',
      totalReviews: 90,
      reviewDetails: [
        { user: "Emma", comment: "Nice burger!", rating: 5 },
        { user: "Liam", comment: "Fast service.", rating: 4 },
        { user: "Olivia", comment: "Burger was cold.", rating: 2 },
        { user: "Noah", comment: "Good fries.", rating: 4 },
        { user: "Ava", comment: "Too greasy.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Burgers",
        deals: [
          {
            title: "Dave's Single",
            price: "650",
            desc: "Beef patty with cheese, lettuce, tomato",
            img: "https://cdn.pixabay.com/photo/2017/11/09/21/41/burger-2939937_1280.jpg",
          },
          {
            title: "Spicy Chicken Sandwich",
            price: "600",
            desc: "Crispy spicy chicken with mayo and pickles",
            img: "https://cdn.pixabay.com/photo/2017/09/22/16/46/chicken-sandwich-2772386_1280.jpg",
          },
        ],
      },
      {
        title: "Sides",
        deals: [
          {
            title: "Chili Cheese Fries",
            price: "350",
            desc: "Fries topped with chili and cheese",
            img: "https://cdn.pixabay.com/photo/2017/07/16/10/43/fries-2501967_1280.jpg",
          },
          {
            title: "Frosty",
            price: "250",
            desc: "Chocolate or vanilla frozen dessert",
            img: "https://cdn.pixabay.com/photo/2016/11/29/10/07/ice-cream-1869571_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "20",
    title: "Five Guys",
    cuisine: "Fast Food",
    assets: {
      rating: "4.5",
      img: "https://i.postimg.cc/FFZQmVf8/five.png",
      fee: '40',
      time: '40min',
      totalReviews: 125,
      reviewDetails: [
        { user: "John", comment: "Best burger!", rating: 5 },
        { user: "Sarah", comment: "Amazing fries.", rating: 4 },
        { user: "Mike", comment: "A bit pricey.", rating: 3 },
        { user: "Anna", comment: "Fresh ingredients.", rating: 4 },
        { user: "Tom", comment: "Service was slow.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Burgers & Sandwiches",
        deals: [
          {
            title: "Little Hamburger",
            price: "700",
            desc: "All-beef patty with toppings",
            img: "https://cdn.pixabay.com/photo/2017/11/09/21/41/burger-2939937_1280.jpg",
          },
          {
            title: "BLT Sandwich",
            price: "650",
            desc: "Bacon, lettuce, tomato on toasted bread",
            img: "https://cdn.pixabay.com/photo/2017/11/09/21/41/burger-2939937_1280.jpg",
          },
        ],
      },
      {
        title: "Fries",
        deals: [
          {
            title: "Regular Fries",
            price: "300",
            desc: "Fresh cut fries",
            img: "https://cdn.pixabay.com/photo/2020/07/22/13/22/french-fries-5421466_1280.jpg",
          },
          {
            title: "Cajun Fries",
            price: "350",
            desc: "Spicy seasoned fries",
            img: "https://cdn.pixabay.com/photo/2020/07/22/13/22/french-fries-5421466_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "21",
    title: "Chipotle",
    cuisine: "Mexican",
    assets: {
      rating: "4.3",
      img: "https://i.postimg.cc/FKL44tcV/chipotlee.png",
      fee: '40',
      time: '40min',
      totalReviews: 70,
      reviewDetails: [
        { user: "Carlos", comment: "Awesome burritos!", rating: 5 },
        { user: "Mei", comment: "Fresh ingredients.", rating: 4 },
        { user: "Luis", comment: "A bit expensive.", rating: 3 },
        { user: "Ana", comment: "Fast service.", rating: 4 },
        { user: "Jorge", comment: "Lacking options.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Burritos & Bowls",
        deals: [
          {
            title: "Chicken Burrito",
            price: "700",
            desc: "Chicken, rice, beans, salsa, cheese",
            img: "https://cdn.pixabay.com/photo/2017/04/06/12/01/burrito-2200413_1280.jpg",
          },
          {
            title: "Veggie Bowl",
            price: "650",
            desc: "Rice, beans, grilled veggies, guacamole",
            img: "https://cdn.pixabay.com/photo/2017/04/06/12/01/burrito-2200413_1280.jpg",
          },
        ],
      },
      {
        title: "Sides",
        deals: [
          {
            title: "Chips & Salsa",
            price: "250",
            desc: "Corn chips with tomato salsa",
            img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/chips-1239430_1280.jpg",
          },
          {
            title: "Guacamole",
            price: "300",
            desc: "Fresh avocado dip",
            img: "https://cdn.pixabay.com/photo/2016/07/23/20/52/guacamole-1532636_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "22",
    title: "Cinnabon",
    cuisine: "Bakery",
    assets: {
      rating: "4.2",
      img: "https://i.postimg.cc/15vP0rsw/cinabon.png",
      fee: '70',
      time: '30min',
      totalReviews: 60,
      reviewDetails: [
        { user: "Emily", comment: "Delicious cinnamon roll!", rating: 5 },
        { user: "James", comment: "Perfect for dessert.", rating: 4 },
        { user: "Sophia", comment: "Too sweet.", rating: 2 },
        { user: "David", comment: "Freshly baked.", rating: 4 },
        { user: "Lily", comment: "A bit pricey.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Cinnamon Rolls",
        deals: [
          {
            title: "Classic Roll",
            price: "400",
            desc: "Soft cinnamon roll with cream cheese frosting",
            img: "https://cdn.pixabay.com/photo/2017/02/02/20/15/cinnamon-roll-2039596_1280.jpg",
          },
          {
            title: "Chocolaty Roll",
            price: "450",
            desc: "Cinnamon roll with chocolate drizzle",
            img: "https://cdn.pixabay.com/photo/2018/11/29/23/22/cinnamon-roll-3842787_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "23",
    title: "Starbucks",
    cuisine: "Cafe",
    assets: {
      rating: "4.5",
      img: "https://i.postimg.cc/J7KSS7vW/startbucks.png",
      fee: '50',
      time: '45min',
      totalReviews: 100,
      reviewDetails: [
        { user: "Anna", comment: "Great coffee!", rating: 5 },
        { user: "Brian", comment: "Nice ambiance.", rating: 4 },
        { user: "Clara", comment: "Overpriced.", rating: 3 },
        { user: "David", comment: "Good variety.", rating: 4 },
        { user: "Ethan", comment: "Could improve service.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Coffee",
        deals: [
          {
            title: "Caffe Latte",
            price: "400",
            desc: "Espresso with steamed milk",
            img: "https://cdn.pixabay.com/photo/2015/11/07/11/44/coffee-1031636_1280.jpg",
          },
          {
            title: "Caramel Macchiato",
            price: "450",
            desc: "Espresso, milk, caramel sauce",
            img: "https://cdn.pixabay.com/photo/2018/03/26/01/18/starbucks-3268159_1280.jpg",
          },
        ],
      },
      {
        title: "Pastries",
        deals: [
          {
            title: "Blueberry Muffin",
            price: "300",
            desc: "Freshly baked muffin",
            img: "https://cdn.pixabay.com/photo/2016/06/22/10/59/muffin-1476164_1280.jpg",
          },
          {
            title: "Chocolate Croissant",
            price: "350",
            desc: "Flaky croissant with chocolate",
            img: "https://cdn.pixabay.com/photo/2016/11/29/07/15/croissant-1869629_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "24",
    title: "Dunkin'",
    cuisine: "Cafe",
    assets: {
      rating: "4.1",
      img: "https://i.postimg.cc/vB7w4W01/dunkin.png",
      fee: '70',
      time: '20min',
      totalReviews: 65,
      reviewDetails: [
        { user: "Michael", comment: "Good coffee.", rating: 4 },
        { user: "Sara", comment: "Nice donuts.", rating: 5 },
        { user: "Alex", comment: "Overcrowded.", rating: 3 },
        { user: "Nina", comment: "Fast service.", rating: 4 },
        { user: "Sam", comment: "Average quality.", rating: 3 },
      ],
    },
    menu: [
      {
        title: "Coffee & Drinks",
        deals: [
          {
            title: "Hot Coffee",
            price: "250",
            desc: "Freshly brewed coffee",
            img: "https://cdn.pixabay.com/photo/2016/11/29/10/07/coffee-1869538_1280.jpg",
          },
          {
            title: "Iced Coffee",
            price: "300",
            desc: "Cold coffee with ice",
            img: "https://cdn.pixabay.com/photo/2015/09/10/17/00/coffee-934044_1280.jpg",
          },
        ],
      },
      {
        title: "Donuts",
        deals: [
          {
            title: "Glazed Donut",
            price: "150",
            desc: "Classic glazed donut",
            img: "https://cdn.pixabay.com/photo/2017/07/31/18/08/donut-2553295_1280.jpg",
          },
          {
            title: "Chocolate Frosted Donut",
            price: "180",
            desc: "Donut with chocolate frosting",
            img: "https://cdn.pixabay.com/photo/2017/07/31/18/08/donut-2553295_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "25",
    title: "Ranchers",
    cuisine: "Fast Food",
    assets: {
      rating: "4.3",
      img: "https://i.postimg.cc/PxQ0XdqY/ranchers.png",
      fee: '40',
      time: '30min',
      totalReviews: 110,
      reviewDetails: [
        { user: "Liam", comment: "Loved the burger!", rating: 5 },
        { user: "Sophie", comment: "Tasty fries.", rating: 4 },
        { user: "James", comment: "Overpriced.", rating: 3 },
        { user: "Emma", comment: "Quick service.", rating: 4 },
        { user: "Zoe", comment: "Burger was cold.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Burgers",
        deals: [
          {
            title: "ShackBurger",
            price: "750",
            desc: "Cheeseburger with lettuce, tomato, ShackSauce",
            img: "https://cdn.pixabay.com/photo/2019/09/07/18/17/burger-4452116_1280.jpg",
          },
          {
            title: "SmokeShack",
            price: "800",
            desc: "Cheeseburger with bacon and cherry pepper",
            img: "https://cdn.pixabay.com/photo/2019/09/07/18/17/burger-4452116_1280.jpg",
          },
        ],
      },
      {
        title: "Fries & Drinks",
        deals: [
          {
            title: "Crinkle-Cut Fries",
            price: "350",
            desc: "Seasoned crinkle-cut fries",
            img: "https://cdn.pixabay.com/photo/2018/07/23/20/48/fries-3554651_1280.jpg",
          },
          {
            title: "Shack-made Lemonade",
            price: "300",
            desc: "Fresh lemonade",
            img: "https://cdn.pixabay.com/photo/2018/08/01/16/25/lemonade-3571967_1280.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "26",
    title: "Panera Bread",
    cuisine: "Cafe",
    assets: {
      rating: "4.4",
      img: "https://i.postimg.cc/y82Mnf5g/panera.png",
      fee: '80',
      time: '30min',
      totalReviews: 105,
      reviewDetails: [
        { user: "Rachel", comment: "Healthy options.", rating: 5 },
        { user: "Tom", comment: "Good bread.", rating: 4 },
        { user: "Lisa", comment: "A bit pricey.", rating: 3 },
        { user: "Mark", comment: "Nice ambiance.", rating: 4 },
        { user: "Julia", comment: "Service was slow.", rating: 2 },
      ],
    },
    menu: [
      {
        title: "Sandwiches",
        deals: [
          {
            title: "Turkey Sandwich",
            price: "700",
            desc: "Turkey, lettuce, tomato, mayo",
            img: "https://cdn.pixabay.com/photo/2017/10/13/14/53/sandwich-2840563_1280.jpg",
          },
          {
            title: "Ham & Cheese Sandwich",
            price: "650",
            desc: "Ham, cheese, mustard",
            img: "https://cdn.pixabay.com/photo/2017/10/13/14/53/sandwich-2840563_1280.jpg",
          },
        ],
      },
      {
        title: "Soups",
        deals: [
          {
            title: "Tomato Soup",
            price: "400",
            desc: "Creamy tomato soup",
            img: "https://cdn.pixabay.com/photo/2014/04/22/02/56/soup-329564_1280.jpg",
          },
          {
            title: "Chicken Noodle Soup",
            price: "450",
            desc: "Classic chicken noodle soup",
            img: "https://cdn.pixabay.com/photo/2014/04/22/02/56/soup-329564_1280.jpg",
          },
        ],
      },
    ],
  },
];