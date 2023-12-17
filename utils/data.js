const users = [
     { username: "Frank Simpleton", email: "Frank@gmail.com" },
     { username: "Sandra Barring", email: "Sandra@gmail.com" },
     { username: "Cannis Yungay", email: "Cannis@hotmail.com" },
     { username: "Jamil Surrow", email: "Jamil@gmail.com" },
     { username: "Cindy Flowers", email: "Cindy@hotmail.com" },
     { username: "Patrick Funchia", email: "Patrick@gmail.com" },
     { username: "Pattry Robinson", email: "Pattry@hotmail.com" },
]

const friends = [
     { username: "Frank Simpleton", friend: "Sandra Barring" },
     { username: "Frank Simpleton", friend: "Cannis Yungay" },
     { username: "Frank Simpleton", friend: "Jamil Surrow" },
     { username: "Frank Simpleton", friend: "Cindy Flowers" },
     { username: "Sandra Barring", friend: "Frank Simpleton" },
     { username: "Sandra Barring", friend: "Pattry Robinson" },
     { username: "Sandra Barring", friend: "Jamil Surrow" },
     { username: "Sandra Barring", friend: "Cannis Yungay" },
     { username: "Sandra Barring", friend: "Jamil Surrow" },
     { username: "Sandra Barring", friend: "Cindy Flowers" },
     { username: "Sandra Barring", friend: "Patrick Funchia" },
     { username: "Jamil Surrow", friend: "Sandra Barring" },
     { username: "Jamil Surrow", friend: "Frank Simpleton" },
]

const thoughts = [
     { thoughtText: "Act as if what you do makes a difference. It does.", username: "Jamil Surrow"},
     { thoughtText: "Believe you can and you're halfway there.", username: "Sandra Barring"},
     { thoughtText: "Life is like riding a bicycle. To keep your balance, you must keep moving.", username: "Sandra Barring"},
     { thoughtText: "You are never too old to set another goal or to dream a new dream.", username: "Frank Simpleton"},
     { thoughtText: "Positive motivating quotes, captions, messages by C.S. Lewis quote", username: "Sandra Barring"},
     { thoughtText: "It is never too late to be what you might have been.", username: "Sandra Barring"},
     { thoughtText: "Positive motivating quotes, captions, messages by George Eliot quote", username: "Jamil Surrow"},
     { thoughtText: "Some people look for a beautiful place. Others make a place beautiful.", username: "Cindy Flowers"},
     { thoughtText: "Positive motivating quotes, captions, messages by Hazrat Inayat Khan quote", username: "Cannis Yungay"},
     { thoughtText: "We must be willing to let go of the life we planned so as to have the life that is waiting for us.", username: "Jamil Surrow"},
     { thoughtText: "Happiness is not by chance, but by choice.", username: "Sandra Barring"},
     { thoughtText: "Positive motivating quotes, captions, messages by Jim Rohn quote", username: "Cannis Yungay"},
     { thoughtText: "If I cannot do great things, I can do small things in a great way.", username: "Cannis Yungay"},
     { thoughtText: "Positive motivating quotes, captions, messages by Martin Luther King, Jr. quote", username: "Patrick Funchia"},
     { thoughtText: "My mission in life is not merely to survive, but to thrive.", username: "Sandra Barring"},
     { thoughtText: "Positive motivating quotes, captions, messages by Maya Angelou quote", username: "Pattry Robinson"},
     { thoughtText: "You are enough just as you are.", username: "Jamil Surrow"},
     { thoughtText: "The bad news is time flies. The good news is you're the pilot.", username: "Sandra Barring"}
]
// Export the functions for use in seed.js
module.exports = { users, thoughts, friends };
