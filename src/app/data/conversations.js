const conversations = {
  arlene: {
    name: "Arlene",
    unread: 2,
    lastActive: "1 hour ago",
    profilePic: "/profile1.png",
    messages: [
      { sender: "Arlene", text: "Hey! Did you get a chance to look at the docs?", timestamp: "1:45 pm" },
      { sender: "me", text: "Yeah, I skimmed through it. Looks good overall.", timestamp: "2:45 pm" },
      { sender: "Arlene", text: "Cool. Just check your email, I sent the final draft.", timestamp: "2:46 pm" },
      { sender: "Arlene", text: "Check your email!", timestamp: "4:35 pm" },
    ],
  },
  kristin: {
    name: "Kristin",
    unread: 0,
    lastActive: "45 min ago",
    profilePic: "/profile2.png",
    messages: [
      { sender: "Kristin", text: "That movie was so good!", timestamp: "6:45 pm", profilePic: "/profile2.png" },
      { sender: "me", text: "Told you you'd love it.", timestamp: "6:45 pm" },
      { sender: "Kristin", text: "Thanks for the rec. Just got back home.", timestamp: "6:45 pm", profilePic: "/profile2.png" },
      { sender: "Kristin", text: "Just got back home.", timestamp: "6:45 pm", profilePic: "/profile2.png" },
    ],
  },
  alex: {
    name: "Alex",
    unread: 0,
    lastActive: "5 min ago",
    profilePic: "/profile3.png",
    messages: [
      { sender: "Alex", text: "Yo, long time!", timestamp: "6:45 pm", profilePic: "/profile3.png" },
      { sender: "me", text: "Haha yeah, what's up?", timestamp: "6:45 pm" },
      { sender: "Alex", text: "Hey, how's it going?", timestamp: "6:45 pm", profilePic: "/profile3.png" },
    ],
  },
  jenny: {
    name: "Jenny",
    unread: 3,
    lastActive: "12 min ago",
    profilePic: "/profile4.png",
    messages: [
      { sender: "Jenny", text: "Hey, still good for lunch today?", timestamp: "6:45 pm", profilePic: "/profile4.png" },
      { sender: "me", text: "Yep, where should we meet?", timestamp: "6:45 pm" },
      { sender: "Jenny", text: "Let’s go to that new cafe near campus.", timestamp: "6:45 pm", profilePic: "/profile4.png" },
      { sender: "Jenny", text: "Are we still on for tomorrow?", timestamp: "6:45 pm", profilePic: "/profile4.png" },
    ],
  },
  michael: {
    name: "Michael",
    unread: 0,
    lastActive: "2 hours ago",
    profilePic: "/profile5.png",
    messages: [
      { sender: "Michael", text: "We haven’t hung out in ages.", timestamp: "6:45 pm", profilePic: "/profile5.png" },
      { sender: "me", text: "Yeah, let’s plan something soon.", timestamp: "6:45 pm" },
      { sender: "Michael", text: "Let’s catch up soon!", timestamp: "6:45 pm", profilePic: "/profile5.png" },
    ],
  },
  sophia: {
    name: "Sophia",
    unread: 4,
    lastActive: "3 hours ago",
    profilePic: "/profile6.png",
    messages: [
      { sender: "Sophia", text: "That concert was insane!", timestamp: "6:45 pm", profilePic: "/profile6.png" },
      { sender: "me", text: "Seriously, best night ever.", timestamp: "6:45 pm" },
      { sender: "Sophia", text: "Glad we went!", timestamp: "6:45 pm", profilePic: "/profile6.png" },
      { sender: "Sophia", text: "Had a great time today!", timestamp: "6:45 pm", profilePic: "/profile6.png" },
    ],
  },
  daniel: {
    name: "Daniel",
    unread: 1,
    lastActive: "4 hours ago",
    profilePic: "/profile7.png",
    messages: [
      { sender: "Daniel", text: "Hey can we talk?", timestamp: "6:45 pm", profilePic: "/profile7.png" },
      { sender: "me", text: "Sure, what's up?", timestamp: "6:45 pm" },
      { sender: "Daniel", text: "Can you call me?", timestamp: "6:45 pm", profilePic: "/profile7.png" },
    ],
  },
  emma: {
    name: "Emma",
    unread: 2,
    lastActive: "6 hours ago",
    profilePic: "/profile8.png",
    messages: [
      { sender: "Emma", text: "Any plans this weekend?", timestamp: "6:45 pm", profilePic: "/profile8.png" },
      { sender: "me", text: "Not yet, why?", timestamp: "6:45 pm" },
      { sender: "Emma", text: "Are you free this weekend?", timestamp: "6:45 pm", profilePic: "/profile8.png" },
    ],
  },
  john: {
    name: "John Doe",
    unread: 0,
    lastActive: "8 hours ago",
    profilePic: "/profile9.png",
    messages: [
      { sender: "John Doe", text: "Up for lunch tomorrow?", timestamp: "6:45 pm", profilePic: "/profile9.png" },
      { sender: "me", text: "Yeah let’s do it.", timestamp: "6:45 pm" },
      { sender: "John Doe", text: "Let’s grab lunch tomorrow.", timestamp: "6:45 pm", profilePic: "/profile9.png" },
    ],
  },
};

export default conversations;
