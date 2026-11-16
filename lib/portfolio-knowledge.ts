import { projectData, experienceData } from "../components/portfolio/data";

export const answers = [
 {title:"Who is Pritika?",terms:["who","about","introduce","yourself","pritika","study","school","waterloo","education"],answer:"I’m Pritika Lahiri, a Computer Science undergraduate at the University of Waterloo with an AI specialization. I like building creative products, exploring AI, and making room for basketball and music along the way.",link:"/resume.pdf",label:"Read my résumé"},
 {title:"What has she built?",terms:["project","projects","built","build","software","app","apps","portfolio"],answer:"My projects range from shared grocery shopping with BulkBridge to hands-free filming with AutoVlog, accessible lectures with Lingo Lift, and art discovery with ATLAS Blend. I’m especially proud of ATLAS Blend: it learns your taste in art and blends it with a friend’s to create something personal.",link:"https://devpost.com/software/atlas-blend",label:"Explore ATLAS Blend"},
 {title:"What experience does she have?",terms:["experience","work","intern","internship","td","cgi","career","job","coop","co-op"],answer:"At TD, I worked with the data engineering team and contributed to the front end of an internal application. My coworkers were the best part of the internship, and winning first place at the TD Builders AI Hackathon was a highlight. I’ve also worked on AI research, teaching, and campus initiatives.",link:"/resume.pdf",label:"See my résumé"},
 {title:"What does she do with AI?",terms:["ai","artificial","intelligence","research","machine","learning","berkeley","wat.ai","models"],answer:"I’ve researched multi-model reasoning for mathematical problem solving at UC Berkeley and contributed to WAT.ai’s work on semantic object state tracking. In my projects, I’m interested in AI that helps people do something useful or creative, from understanding lectures to discovering art.",link:"https://devpost.com/software/atlas-blend",label:"See an AI project"},
 {title:"What are her technical skills?",terms:["skills","technical","languages","language","code","coding","stack","python","typescript","react","programming"],answer:"My toolkit includes C, C++, Python, Java, TypeScript, and Racket. I build with React, Next.js, Node.js, and Tailwind, and my project stacks have also included Supabase, FastAPI, Prisma, and Gemini. I’m always adding to that list as a project calls for something new.",link:"https://github.com/pritiks24",label:"Visit my GitHub"},
 {title:"What does she do outside tech?",terms:["outside","hobbies","hobby","free","fun","interests","basketball","sports","soccer","tempo","ronaldo"],answer:"Basketball and music are big parts of my life. I also love watching sports live, whether it’s basketball or soccer, seeing my favourite artists in concert, and travelling. And I’m pretty much always down for a froyo run.",link:"https://www.youtube.com/channel/UCS6fmQv9bbeQYAYLQzMRlFQ",label:"Hear my music"},
 {title:"Does she make music?",terms:["music","musician","sing","singing","singer","piano","guitar","cover","covers","youtube","song","songs","concert","daniel"],answer:"Yes! I sing and play guitar and piano, and share covers on YouTube as Pritika 4 Musik. My covers include Somewhere Only We Know, All I Ask, Ceilings, and more. I love being on stage, but watching my favourite artists perform live is just as special.",link:"https://www.youtube.com/channel/UCS6fmQv9bbeQYAYLQzMRlFQ",label:"Watch my covers"},
 {title:"How can I contact her?",terms:["contact","email","connect","reach","message","hire","hiring","collaborate","collaboration","linkedin"],answer:"I’d love to hear from you, whether it’s about a project, an opportunity, or something we have in common. Email me at pritika2404@gmail.com, or connect with me on LinkedIn.",link:"mailto:pritika2404@gmail.com",label:"Send me an email"},
 {title:"Matcha or froyo?",terms:["matcha","froyo","food","sweet","dessert","drink","grass"],answer:"Both, obviously. I have a huge sweet tooth and am always up for froyo. And matcha does NOT taste like grass. I’m happy to defend that over a cup.",link:"mailto:pritika2404@gmail.com",label:"Invite me for matcha"},
];
export function matchQuestion(question:string) {
 // Only explicitly supported questions are answered. A topic word alone
 // cannot establish that the prepared response answers the actual question.
 const normalise=(value:string)=>value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g," ").trim();
 const query=normalise(question);
 const exact=answers.find(answer=>normalise(answer.title)===query);
 if(exact)return exact;
 const aliases:Record<string,string[]>={
  "Who is Pritika?":["tell me about pritika","tell me about yourself","who are you","introduce yourself","where does she study","where do you study","what does she study","what do you study"],
  "What has she built?":["what are her projects","what are your projects","tell me about her projects","tell me about your projects","what have you built"],
  "What experience does she have?":["what is her work experience","what is your work experience","tell me about her experience","tell me about your experience","where has she worked","where have you worked","tell me about her td internship"],
  "What does she do with AI?":["tell me about her ai research","tell me about your ai research","what ai research has she done","what ai research have you done"],
  "What are her technical skills?":["what are your technical skills","what programming languages does she know","what programming languages do you know","what is her tech stack","what is your tech stack"],
  "What does she do outside tech?":["what are her hobbies","what are your hobbies","what does she do for fun","what do you do for fun","what are her interests"],
  "Does she make music?":["tell me about her music","tell me about your music","what instruments does she play","what instruments do you play","does she sing","do you sing","where can i watch her covers"],
  "How can I contact her?":["how can i contact pritika","how can i contact you","what is her email","what is your email","how can i connect with her","how can i reach you"],
  "Matcha or froyo?":["does she like matcha","do you like matcha","does she like froyo","do you like froyo"],
 };
 const supported=answers.find(answer=>aliases[answer.title]?.some(alias=>normalise(alias)===query));
 if(supported)return supported;
 const specific=projectData.find(project=>[project.title,`tell me about ${project.title}`,`what is ${project.title}`].some(alias=>normalise(alias)===query));
 if(specific)return {title:specific.title,answer:specific.description,link:specific.links[0].href,label:"View project on Devpost"};
 return null;
}

export const FALLBACK = "I don’t have the answer to that at the moment, but feel free to contact Pritika Lahiri to know more.";
export const portfolioFacts = [
 ...answers.map((a,i)=>({id:`about-${i}`,text:a.answer,title:a.title,link:a.link,label:a.label})),
 ...projectData.map((p,i)=>({id:`project-${i}`,text:`${p.title}: ${p.description}`,title:p.title,link:p.links[0].href,label:"View project on Devpost"})),
 ...experienceData.map((e,i)=>({id:`experience-${i}`,text:`${e.role} at ${e.org} (${e.date}). ${e.description}`,title:e.org,link:"/resume.pdf",label:"Read my résumé"})),
 {id:"travel",title:"Places I’ve visited",text:"I’ve visited Mexico, the USA, France, Italy, Belgium, Switzerland, the United Kingdom, and Cuba. Hawaii, the Dominican Republic, and Greece are on my travel wishlist.",link:"mailto:pritika2404@gmail.com",label:"Talk travel with me"},
 {id:"switzerland",title:"A favourite place",text:"Switzerland is probably my favourite country I’ve visited. I loved the views and the gondola rides.",link:"mailto:pritika2404@gmail.com",label:"Say hello"},
 {id:"td-hackathon",title:"TD Builders AI Hackathon",text:"I won first place at the TD Builders AI Hackathon. My coworkers were the best part of my TD internship.",link:"/resume.pdf",label:"Read my résumé"},
];
export type PortfolioAnswer = {title:string;answer:string;link:string;label:string};
export function resolveFacts(value:unknown):PortfolioAnswer|null {
 if(!value||typeof value!=="object")return null;
 const result=value as {supported?:unknown;factIds?:unknown};
 if(result.supported!==true||!Array.isArray(result.factIds)||result.factIds.length===0||result.factIds.length>3)return null;
 const ids=[...new Set(result.factIds)];
 if(ids.some(id=>typeof id!=="string"||!portfolioFacts.some(f=>f.id===id)))return null;
 const facts=ids.map(id=>portfolioFacts.find(f=>f.id===id)!);
 return {title:facts[0].title,answer:facts.map(f=>f.text).join("\n\n"),link:facts[0].link,label:facts[0].label};
}
