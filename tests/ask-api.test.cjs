const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const mod = { exports: {} }; cache.set(file, mod);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const localRequire = name => name.startsWith('.') ? load(path.resolve(path.dirname(file), name + '.ts')) : require(name);
  new Function('require', 'module', 'exports', js)(localRequire, mod, mod.exports);
  return mod.exports;
}
const { POST } = load('app/api/ask/route.ts');
const realFetch = global.fetch;
const originalKey = process.env.GEMINI_API_KEY;
afterEach(() => { global.fetch = realFetch; if(originalKey===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=originalKey; });
const request = question => new Request('https://portfolio.example/api/ask', { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question}) });
const provider = value => Response.json({ candidates:[{ finishReason:'STOP',content:{parts:[{text:JSON.stringify(value)}]} }] });
test('rejects malformed input without calling the provider',async()=>{
 global.fetch=()=>{throw Error('Unexpected provider call')};
 assert.equal((await POST(request(''))).status,400);
 assert.equal((await POST(request(123))).status,400);
 assert.equal((await POST(new Request('https://portfolio.example/api/ask',{method:'POST',body:'{'}))).status,400);
});
test('rejects another origin',async()=>{
 const response=await POST(new Request('https://portfolio.example/api/ask',{method:'POST',headers:{origin:'https://elsewhere.example'},body:JSON.stringify({question:'Who is Pritika?'})}));
 assert.equal(response.status,403);
});
test('prepared mode works without a key; unsupported details stay unknown',async()=>{
 delete process.env.GEMINI_API_KEY;
 global.fetch=()=>{throw Error('Unexpected provider call')};
 const known=await (await POST(request('Who is Pritika?'))).json();
 assert.equal(known.mode,'prepared');assert.match(known.answer.answer,/Waterloo/);
 const unknown=await (await POST(request('What is her favourite colour?'))).json();assert.equal(unknown.answer,null);
});
test('uses the key only in the server header and serves exact verified facts',async()=>{
 process.env.GEMINI_API_KEY='test-key';
 global.fetch=async(url,opts)=>{
 assert.ok(!url.includes('test-key'));assert.equal(opts.headers['x-goog-api-key'],'test-key');
 const body=JSON.parse(opts.body);assert.equal(body.generationConfig.responseMimeType,'application/json');
 return provider({supported:true,factIds:['switzerland']});
 };
 const result=await (await POST(request('Which country did she enjoy most?'))).json();
 assert.equal(result.mode,'gemini');assert.match(result.answer.answer,/probably my favourite/);assert.ok(!JSON.stringify(result).includes('test-key'));
});
test('unsupported answer uses the no-answer state',async()=>{
 process.env.GEMINI_API_KEY='test-key';global.fetch=async()=>provider({supported:false,factIds:[]});
 assert.equal((await (await POST(request('When is her birthday?'))).json()).answer,null);
});
test('invented IDs cannot produce answers',async()=>{
 process.env.GEMINI_API_KEY='test-key';global.fetch=async()=>provider({supported:true,factIds:['invented-favourite-colour']});
 assert.equal((await (await POST(request('Favourite colour?'))).json()).answer,null);
});
test('provider outages are distinct from unknown personal facts',async()=>{
 process.env.GEMINI_API_KEY='test-key';global.fetch=async()=>new Response('private provider diagnostic',{status:500});
 const response=await POST(request('Something unsupported'));assert.equal(response.status,503);
 assert.ok(!JSON.stringify(await response.json()).includes('private provider diagnostic'));
 const known=await (await POST(request('Who is Pritika?'))).json();assert.equal(known.mode,'prepared');
});
test('malformed model output fails safely',async()=>{
 process.env.GEMINI_API_KEY='test-key';global.fetch=async()=>Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:'not json'}]}}]});
 assert.equal((await POST(request('Some new question'))).status,503);
});
test('known questions bypass Gemini even when a key is configured',async()=>{
 process.env.GEMINI_API_KEY='test-key';global.fetch=()=>{throw Error('Known question should not call Gemini')};
 const result=await (await POST(request('where has she worked'))).json();
 assert.equal(result.mode,'prepared');assert.match(result.answer.answer,/TD/);
});
test('repeat paraphrases reuse the server cache without another Gemini call',async()=>{
 process.env.GEMINI_API_KEY='test-key';let calls=0;
 global.fetch=async(_,opts)=>{calls++;const body=JSON.parse(opts.body);assert.equal(body.generationConfig.thinkingConfig.thinkingLevel,'minimal');return provider({supported:true,factIds:['travel']});};
 const q='What destinations are on her travel list?';
 const first=await (await POST(request(q))).json();const second=await (await POST(request(q))).json();
 assert.equal(calls,1);assert.deepEqual(first,second);assert.equal(first.mode,'gemini');
});
