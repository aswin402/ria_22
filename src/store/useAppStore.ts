import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Confession {
  id: string;
  number: number;
  category: string;
  text: string;
  riaRoast: string;
  views: string;
  hearts: number;
  commentsCount: number;
  flameScore: number;
  timeAgo: string;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
}

export interface LeaderboardItem {
  id: string;
  rank: number;
  name: string;
  handle: string;
  points: number;
  avatar: string;
  confessionCount: number;
}

export interface RewardTask {
  id: string;
  title: string;
  reward: string;
  completed: boolean;
  actionText: string;
}

interface AppState {
  confessions: Confession[];
  notices: {
    soldEarly: number;
    boughtTops: number;
    foundersTraded: number;
    devRugs: number;
  };
  rewardTasks: RewardTask[];
  leaderboardResponders: LeaderboardItem[];
  addConfession: (text: string, category: string) => Confession;
  likeConfession: (id: string) => void;
  incrementFlame: (id: string) => void;
  completeTask: (id: string) => void;
  resetApp: () => void;
}

// Keyword-based roasts from RIA (Regina George of Crypto Twitter)
const generateRiaRoast = (text: string, category: string): string => {
  const content = text.toLowerCase();
  
  if (content.includes('sol') || content.includes('solana')) {
    return "oh sweetie, selling SOL at $8 is a personality trait at this point. enjoy your gas money.";
  }
  if (content.includes('rug') || content.includes('scam') || content.includes('hacked')) {
    return "getting rugged in 2026? please tell me you at least got a cute sticker or a jpeg out of it.";
  }
  if (content.includes('dog') || content.includes('cat') || content.includes('pepe') || content.includes('meme')) {
    return "aping your rent into animal coins? the dog is literally living in a better house than you now.";
  }
  if (content.includes('founder') || content.includes('dev') || content.includes('team')) {
    return "another team farming their own airdrop? how decentralization-coded. peak web3 performance, king.";
  }
  if (content.includes('lose') || content.includes('lost') || content.includes('liquidated') || content.includes('zero')) {
    return "liquidated? is that your new way of saying you're financially humbled? cute.";
  }
  if (content.includes('girlfriend') || content.includes('boyfriend') || content.includes('love') || content.includes('crush')) {
    return "mixing romance with crypto? your portfolio is going to absolute zero, but at least you have emotional leverage.";
  }
  if (category === 'Trading') {
    return "stop trying to make your exits happen. they're not going to happen.";
  }
  if (category === 'Founder') {
    return "I've seen smart contracts with better governance than your life choices.";
  }
  
  // Default sassy roasts
  const defaults = [
    "honestly, this is embarrassing even for Crypto Twitter. I'd tell you to delete your account but the drama is too good.",
    "bless your heart. did you really think that would work?",
    "on Wednesdays we don't buy shitcoins, but clearly you didn't get the memo.",
    "wow. the bar was on the floor and you brought a shovel.",
    "you're like, really pretty. but your trading decisions are tragic.",
    "I'd roast you but looks like your portfolio already did that for me."
  ];
  
  return defaults[Math.floor(Math.random() * defaults.length)];
};

const INITIAL_CONFESSIONS: Confession[] = [
  {
    id: 'conf-new-1',
    number: 1124,
    category: 'Crush',
    text: "I wrote a love letter on-chain to my Solidity dev partner, but I was too scared to send it to him, so I put it in his deployer wallet. It was actually his co-founder's deployer wallet. Now his co-founder thinks we're dating. Help?!",
    riaRoast: "Well, double the trouble! Honestly, co-founders are a package deal anyway. Just roll with it, sweetie. 💅",
    views: "4.2K",
    hearts: 3800,
    commentsCount: 3,
    flameScore: 98,
    timeAgo: "2m ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 2 * 60000).toISOString()
  },
  {
    id: 'conf-new-2',
    number: 1125,
    category: 'Fail',
    text: "I spent three hours setting up my leverage positions for the token launch, only for the market to dump the exact second I clicked buy. I looked like a liquidated clown and spent the whole night hiding in the Discord support channel eating ramen.",
    riaRoast: "At least the ramen didn't judge your leverage. Next time, invest in a stop-loss or just own the clown look. It's vintage! 🤡",
    views: "3.5K",
    hearts: 3100,
    commentsCount: 2,
    flameScore: 96,
    timeAgo: "2m ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 3 * 60000).toISOString()
  },
  {
    id: 'conf-1',
    number: 843,
    category: 'Trading',
    text: "I turned $10k into $500k and back into $10k in less than 48 hours. I haven't slept in three days and my mom thinks I bought a house.",
    riaRoast: "speedrunning wealth. maybe try sleep next time? it's free.",
    views: "482K",
    hearts: 38200,
    commentsCount: 2100,
    flameScore: 98,
    timeAgo: "2m ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 2 * 60000).toISOString()
  },
  {
    id: 'conf-2',
    number: 842,
    category: 'Trading',
    text: "I sold my entire SOL bag at $8. I was convinced it was going to zero. Now I watch the chart every day and cry into my iced matcha latte.",
    riaRoast: "stop trying to make your exits happen. they're not going to happen.",
    views: "391K",
    hearts: 31400,
    commentsCount: 1900,
    flameScore: 96,
    timeAgo: "6m ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 6 * 60000).toISOString()
  },
  {
    id: 'conf-3',
    number: 841,
    category: 'Memecoin',
    text: "I aped my entire semester rent money into a dog coin because a celebrity tweeted a picture of a puppy. It rugged 15 minutes later.",
    riaRoast: "the dog is doing better than you.",
    views: "277K",
    hearts: 24500,
    commentsCount: 1400,
    flameScore: 93,
    timeAgo: "11m ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 11 * 60000).toISOString()
  },
  {
    id: 'conf-4',
    number: 840,
    category: 'Founder',
    text: "I founded a DeFi protocol and farmed my own airdrop with 40 sybil wallets. I made $2M and then tweeted about the importance of fair launches.",
    riaRoast: "decentralization king. a true visionary.",
    views: "512K",
    hearts: 45100,
    commentsCount: 3300,
    flameScore: 99,
    timeAgo: "14m ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 14 * 60000).toISOString()
  },
  {
    id: 'conf-5',
    number: 839,
    category: 'Dev',
    text: "I accidentally pushed our private deployer keys to a public GitHub repo. The bot drained $150k in 12 seconds. I told the DAO it was a highly sophisticated flashloan exploit.",
    riaRoast: "a 'highly sophisticated' typing error. bless your heart.",
    views: "189K",
    hearts: 12200,
    commentsCount: 850,
    flameScore: 88,
    timeAgo: "1h ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 60 * 60000).toISOString()
  },
  {
    id: 'conf-6',
    number: 838,
    category: 'Gossip',
    text: "I act like an expert researcher on X but all I do is translate Chinese crypto news on WeChat and rewrite it using ChatGPT. I have 50k followers now.",
    riaRoast: "oh honey, we all do that. you're not special, just efficient.",
    views: "340K",
    hearts: 29800,
    commentsCount: 1720,
    flameScore: 94,
    timeAgo: "3h ago",
    isLiked: false,
    createdAt: new Date(Date.now() - 180 * 60000).toISOString()
  }
];

const INITIAL_RESPONDERS: LeaderboardItem[] = [
  { id: 'resp-1', rank: 1, name: "Regina G.", handle: "@regina_ct", points: 9850, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80", confessionCount: 28 },
  { id: 'resp-2', rank: 2, name: "Crypto Hype Girl", handle: "@hypegirl_sol", points: 8420, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80", confessionCount: 22 },
  { id: 'resp-3', rank: 3, name: "Shitcoin Princess", handle: "@princess_pepe", points: 7110, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80", confessionCount: 19 },
  { id: 'resp-4', rank: 4, name: "DAO Kitty", handle: "@kitty_votes", points: 5400, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80", confessionCount: 15 },
  { id: 'resp-5', rank: 5, name: "Matcha Trader", handle: "@matcha_bags", points: 4900, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80", confessionCount: 12 }
];

const INITIAL_TASKS: RewardTask[] = [
  { id: 'task-1', title: "Post a Confession", reward: "50 DOPE", completed: false, actionText: "Confess Now" },
  { id: 'task-2', title: "Love 3 Confessions", reward: "20 DOPE", completed: false, actionText: "Browse Feed" },
  { id: 'task-3', title: "Generate a Meme Card", reward: "30 DOPE", completed: false, actionText: "Create Card" },
  { id: 'task-4', title: "Follow RIA on X", reward: "40 DOPE", completed: false, actionText: "Follow @RIA" },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      confessions: INITIAL_CONFESSIONS,
      notices: {
        soldEarly: 5,
        boughtTops: 11,
        foundersTraded: 7,
        devRugs: 15
      },
      rewardTasks: INITIAL_TASKS,
      leaderboardResponders: INITIAL_RESPONDERS,
      
      addConfession: (text, category) => {
        let newConf: Confession = {
          id: `conf-${Date.now()}`,
          number: 844, // will be calculated below
          category,
          text,
          riaRoast: '',
          views: '1K',
          hearts: 1,
          commentsCount: 0,
          flameScore: 50,
          timeAgo: 'Just now',
          isLiked: false,
          createdAt: new Date().toISOString()
        };
        
        set((state) => {
          const nextNumber = state.confessions.length > 0 
            ? Math.max(...state.confessions.map(c => c.number)) + 1 
            : 800;
            
          const roast = generateRiaRoast(text, category);
          
          newConf = {
            ...newConf,
            number: nextNumber,
            riaRoast: roast
          };
          
          // Increment notice counters depending on text keywords
          const updatedNotices = { ...state.notices };
          const lowerText = text.toLowerCase();
          if (lowerText.includes('sol') || lowerText.includes('sell') || lowerText.includes('sold')) {
            updatedNotices.soldEarly += 1;
          }
          if (lowerText.includes('top') || lowerText.includes('buy') || lowerText.includes('bought')) {
            updatedNotices.boughtTops += 1;
          }
          if (lowerText.includes('founder') || lowerText.includes('dev') || lowerText.includes('sybil')) {
            updatedNotices.foundersTraded += 1;
          }
          if (lowerText.includes('rug') || lowerText.includes('scam')) {
            updatedNotices.devRugs += 1;
          }
          
          // Complete Task 1 if not done
          const updatedTasks = state.rewardTasks.map(t => 
            t.id === 'task-1' ? { ...t, completed: true } : t
          );

          return {
            confessions: [newConf, ...state.confessions],
            notices: updatedNotices,
            rewardTasks: updatedTasks
          };
        });

        return newConf;
      },
      
      likeConfession: (id) => {
        set((state) => {
          const updatedConfessions = state.confessions.map((c) => {
            if (c.id === id) {
              const isLikedNow = !c.isLiked;
              return {
                ...c,
                isLiked: isLikedNow,
                hearts: isLikedNow ? c.hearts + 1 : c.hearts - 1,
                flameScore: isLikedNow ? Math.min(100, c.flameScore + 2) : Math.max(0, c.flameScore - 2)
              };
            }
            return c;
          });

          // Check if user has liked 3 confessions for Task 2
          const likedCount = updatedConfessions.filter(c => c.isLiked).length;
          const updatedTasks = state.rewardTasks.map(t => 
            t.id === 'task-2' && likedCount >= 3 ? { ...t, completed: true } : t
          );

          return {
            confessions: updatedConfessions,
            rewardTasks: updatedTasks
          };
        });
      },
      
      incrementFlame: (id) => {
        set((state) => ({
          confessions: state.confessions.map((c) => 
            c.id === id 
              ? { ...c, flameScore: Math.min(100, c.flameScore + 5) } 
              : c
          )
        }));
      },
      
      completeTask: (id) => {
        set((state) => ({
          rewardTasks: state.rewardTasks.map((t) => 
            t.id === id ? { ...t, completed: true } : t
          )
        }));
      },
      
      resetApp: () => {
        set({
          confessions: INITIAL_CONFESSIONS,
          notices: {
            soldEarly: 5,
            boughtTops: 11,
            foundersTraded: 7,
            devRugs: 15
          },
          rewardTasks: INITIAL_TASKS,
          leaderboardResponders: INITIAL_RESPONDERS
        });
      }
    }),
    {
      name: 'kawaii-confessions-storage',
    }
  )
);
