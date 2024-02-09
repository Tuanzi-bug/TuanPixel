import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o,c as p,a as n,d as a,b as i,e as c}from"./app-NQzcIKZ2.js";const l={},d=n("h1",{id:"类型断言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#类型断言"},[n("span",null,"类型断言")])],-1),r={href:"https://mp.weixin.qq.com/s?__biz=Mzg5NjIwNzIxNQ==&mid=2247484072&idx=3&sn=6b41278ef6ee7425865e67e00c4c078e&chksm=c005d2a8f7725bbec726472938b8d997bcb5ced18518d6c99fa44f9a078adf62d2f8a02a4a70&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},u=c(`<p>我们将接口称之为 <strong>抽象类型</strong>，像 <code>int</code>，<code>slice</code>，<code>string</code>，<code>map</code>，<code>struct</code>等内置和自定义类型称之为 <strong>具体类型</strong>。</p><p>类型断言是 Go 语言在接口值上的一个神奇的特性，而类型断言的目标类型可以是抽象类型也可以是具体类型。那么我们就可以组合成四种类型断言，接下来我们逐一看看。</p><h2 id="空接口-具体类型" tabindex="-1"><a class="header-anchor" href="#空接口-具体类型"><span>空接口.(具体类型)</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">var</span> e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
f<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;eggo.txt&quot;</span><span class="token punctuation">)</span>
e <span class="token operator">=</span> f
r<span class="token punctuation">,</span>ok <span class="token operator">:=</span> e<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>os<span class="token punctuation">.</span>File<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种类型断言就是判断 <code>e</code> 变量存储的 <code>_type</code> 是否指向 <code>*os.File</code> 的类型元数据。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BpCvTk4oPlCKicPN7IbiaBJtOzicomjicykm93VIdIGickUic5zDSqq0Tqnfw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>f <span class="token operator">:=</span> <span class="token string">&quot;eggo&quot;</span>
e <span class="token operator">=</span> f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>e</code> 的动态类型不是 <code>*os.File</code> 类型，而是 <code>string</code> 类型，那么断言就会失败。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L7Hp0QBiaDicNk4BZfrPREhuzQmhGMel7iagGWApxe1aoiaAVZGd0gLEUgZcBneoficabjsYt06PEjggRg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="非空接口-具体类型" tabindex="-1"><a class="header-anchor" href="#非空接口-具体类型"><span>非空接口.(具体类型)</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">var</span> rw io<span class="token punctuation">.</span>ReadWriter
f<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>&quot;eggo<span class="token punctuation">.</span>txt<span class="token punctuation">)</span>
rw <span class="token operator">=</span> f
r<span class="token punctuation">,</span>ok <span class="token operator">:=</span> rw<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>os<span class="token punctuation">.</span>File<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种类型断言就是判断 <code>rw</code> 的动态类型是否为 <code>*os.File</code> 类型。</p><p>这里判断方式比较简单：判断 <code>iface.tab</code> 是否等于 <code>&lt;io.ReadWriter，*os.File&gt;</code> 这个组合对应的 <code>itab</code> 指针。</p><p>我们都知道一个 <code>itab</code> 靠接口类型和动态类型进行确定的并且 <code>itab</code> 可以进行复用，所以用上诉方式进行判断。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0B6G7wSGx1ialmiaL129erAoVfcCBny3InRMFsobSFKeDG8cplcA3doJFA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">type</span> eggo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>eggo<span class="token punctuation">)</span> <span class="token function">Read</span><span class="token punctuation">(</span>b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>eggo<span class="token punctuation">)</span> <span class="token function">Write</span><span class="token punctuation">(</span>b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们创建一个新的类型 eggo，同时也实现相关的接口方法。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>f <span class="token operator">:=</span> eggo<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;eggo&quot;</span><span class="token punctuation">}</span>
rw <span class="token operator">=</span> <span class="token operator">&amp;</span>f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们将 <code>eggo</code> 类型的变量赋值给 <code>rw</code>，再去做刚才的类型断言，此时 <code>rw</code> 的 <code>tab</code> 与指向 <code>&lt;io.ReadWriter, *os.File&gt;</code> 组合对应的 <code>itab</code> 结构体指针不相等，所以断言失败。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L75jtH0rYodSfoAGwwpIyARgnLQibUuic9Mf0CR8Tib969eiaWtPmQddFkv0ek3YfYWSyE3146jsXm9jg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="空接口-非空接口" tabindex="-1"><a class="header-anchor" href="#空接口-非空接口"><span>空接口.(非空接口)</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">var</span> e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

f<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;eggo.txt&quot;</span><span class="token punctuation">)</span>
e <span class="token operator">=</span> f

rw<span class="token punctuation">,</span>ok <span class="token operator">:=</span> e<span class="token punctuation">.</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>ReadWriter<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种断言就是判断 <code>e</code> 的动态类型是否实现了 <code>io.ReadWriter</code> 的接口方法。</p><p><code>e</code> 的动态类型是 <code>*os.File</code>，我们接下来应该判断这个类型是否有 <code>io.ReadWriter</code> 接口的方法。</p><p><strong>怎么判断呢？难道拿到类型列表方法信息进行一对一判断？</strong></p><ul><li>当目标类型为非空接口时，我们会首先去根据 <code>&lt;io.ReadWriter，*os.File&gt;</code> 去 <code>itabTable</code> 里面查找对应的 <code>itab</code> 指针。 <ul><li>如果找到了，也要进一步确认 <code>itab.fun[0]</code> 是否等于 0，都满足那么皆大欢喜这个类型实现了接口的方法</li><li>没有找到，再去检查动态类型的方法列表进行一对一的比较。</li></ul></li></ul><blockquote><p>为什么会需要去进一步确认 <code>itab.fun[0]</code> 是否等于 0？</p><p>因为通过方法列表确定某个具体类型没有实现指定接口，就会把 <code>itab</code> 这里的 <code>fun[0]</code> 置为 0，然后同样会把这个 <code>itab</code> 结构体缓存起来，和那些断言成功的 <code>itab</code> 缓存一样。</p><p>这样子的目的就是<strong>避免再遇到同种类型断言时重复检查方法列表的操作</strong>。</p></blockquote><p>回到例子中，因为在 <code>itabTable</code> 找到了 <code>&lt;io.ReadWriter, *os.File&gt;</code> 对应的 <code>itab</code> 结构体，所以断言成功。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BichetkQRiawZOKH9Rmgtg3Bxw96ibon8yGiabmHY6yFmDraHdGl1NTh6Wg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>f <span class="token operator">:=</span> <span class="token string">&quot;eggo&quot;</span>
e <span class="token operator">=</span> f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在 <code>e</code> 的类型是 <code>string</code> 类型。此时在 <code>itabTable</code> 找不到 <code>&lt;io.ReadWriter, string&gt;</code> 指向的 <code>itab</code> 结构体，同时 <code>string</code> 类型没有实现 <code>io.ReadWriter</code> 接口的方法，所以断言失败。</p><p>但是此时操作没有完，同时 <code>&lt;io.ReadWriter, string&gt;</code> 这个组合会对应下面这个 <code>itab</code> 结构体也会缓存进行哈希表中。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L75jtH0rYodSfoAGwwpIyARicd13ojtTgrB5vGAHp5MFB305gqWgMYgUUnIKRxT5eJIzCWpqu07zNA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="非空接口-非空接口" tabindex="-1"><a class="header-anchor" href="#非空接口-非空接口"><span>非空接口.(非空接口)</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">var</span> w io<span class="token punctuation">.</span>Writer

f<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;eggo.txt&quot;</span><span class="token punctuation">)</span>
w <span class="token operator">=</span> f

rw<span class="token punctuation">,</span>ok <span class="token operator">:=</span> w<span class="token punctuation">.</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>ReadWriter<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种断言就是判断 <code>w</code> 的动态类型是否实现了 <code>io.ReadWriter</code> 接口的方法。</p><p>判断方法与前一种断言一致，</p><ul><li><p>当目标类型为非空接口时，我们会首先去根据 <code>&lt;io.ReadWriter，*os.File&gt;</code> 去 <code>itabTable</code> 里面查找对应的 <code>itab</code> 指针。</p><ul><li><p>如果找到了，也要进一步确认 <code>itab.fun[0]</code> 是否等于 0，都满足那么皆大欢喜这个类型实现了接口的方法</p></li><li><p>没有找到，再去检查动态类型的方法列表进行一对一的比较。</p></li></ul></li></ul><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0B8tMpU3gMETjBARVKf5bj4MSic0yBwyvPkmzHVN9AYbTgYlUOI5F4Q0A/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">type</span> eggo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>eggo<span class="token punctuation">)</span> <span class="token function">Write</span><span class="token punctuation">(</span>b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

f <span class="token operator">:=</span> eggo<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;eggo&quot;</span><span class="token punctuation">}</span>
w <span class="token operator">=</span> <span class="token operator">&amp;</span>f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个新类型 <code>eggo</code>，实现了 <code>write</code> 方法。现在 <code>w</code> 的动态类型是 <code>*eggo</code> 但是 *eggo 的方法列表缺少了一个 <code>Read</code> 方法，所以断言失败，但是 <code>&lt;io.ReadWriter,eggo&gt;</code> 组合对应的 <code>itab</code> 结构体指针会被缓存到哈希表中。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BMHz3JjnLibfMtzeuMheYsp6qiclRVMSflzyJnDbr2px7uCsW7b3HETJg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>这四种的判断断言的方式可以分成两种：</p><ul><li><strong>查看当前接口的动态类似是否满足目标对象</strong>。断言目标类型是具体类型，无论是空接口还是非空接口，其实都是看的接口的动态类型是否就是目标类型。</li><li><strong>先查表找到 <code>itab</code> 结构体，找不到比较方法，缓存起来</strong>。当目标类型是非空接口，其实判断的方法就是先去根据 &lt;接口类型，动态类型&gt; 组合 去查表，如果找到了，那就是满足了要求，如果没有找到，那么就得比较方法列表，然后缓存起来。</li></ul><h2 id="type-switch" tabindex="-1"><a class="header-anchor" href="#type-switch"><span>type switch</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">var</span> e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
str <span class="token operator">:=</span> <span class="token string">&quot;eggo&quot;</span>
e <span class="token operator">=</span> str

<span class="token keyword">switch</span> b <span class="token operator">:=</span> e<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> <span class="token operator">*</span>os<span class="token punctuation">.</span>File<span class="token punctuation">:</span>
    <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;*os.File&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span>
    <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>    <span class="token comment">//选择这个分支</span>
    <span class="token punctuation">}</span>
<span class="token keyword">default</span><span class="token punctuation">:</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 <code>b</code> 会被赋值为 <code>e</code> 的动态值，下面每个 <code>case</code> 都是把 <code>e</code> 的动态类型和某个具体类型作比较，相等则选择这个分支，没有匹配的则走到 <code>default</code> 分支。</p><p>算得上一个编程小技巧。</p>`,49);function m(g,k){const s=t("ExternalLinkIcon");return o(),p("div",null,[d,n("blockquote",null,[n("p",null,[a("推荐阅读："),n("a",r,[a("【Golang】图解类型断言"),i(s)])])]),u])}const f=e(l,[["render",m],["__file","08.类型断言.html.vue"]]),w=JSON.parse('{"path":"/village/08.%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80.html","title":"类型断言","lang":"zh-CN","frontmatter":{"title":"类型断言","date":"2022-07-01T20:53:31.000Z","category":["语言基础","go"],"author":{"name":"团子","url":"https://github.com/baici1"},"comment":false,"description":"类型断言 推荐阅读：【Golang】图解类型断言 我们将接口称之为 抽象类型，像 int，slice，string，map，struct等内置和自定义类型称之为 具体类型。 类型断言是 Go 语言在接口值上的一个神奇的特性，而类型断言的目标类型可以是抽象类型也可以是具体类型。那么我们就可以组合成四种类型断言，接下来我们逐一看看。 空接口.(具体类型) ...","icon":null,"isOriginal":true,"star":false,"article":true,"timeline":true,"image":null,"banner":null,"head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/village/08.%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80.html"}],["meta",{"property":"og:site_name","content":"文档演示"}],["meta",{"property":"og:title","content":"类型断言"}],["meta",{"property":"og:description","content":"类型断言 推荐阅读：【Golang】图解类型断言 我们将接口称之为 抽象类型，像 int，slice，string，map，struct等内置和自定义类型称之为 具体类型。 类型断言是 Go 语言在接口值上的一个神奇的特性，而类型断言的目标类型可以是抽象类型也可以是具体类型。那么我们就可以组合成四种类型断言，接下来我们逐一看看。 空接口.(具体类型) ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BpCvTk4oPlCKicPN7IbiaBJtOzicomjicykm93VIdIGickUic5zDSqq0Tqnfw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-09T16:48:30.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"类型断言"}],["meta",{"property":"article:author","content":"团子"}],["meta",{"property":"article:published_time","content":"2022-07-01T20:53:31.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-09T16:48:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"类型断言\\",\\"image\\":[\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BpCvTk4oPlCKicPN7IbiaBJtOzicomjicykm93VIdIGickUic5zDSqq0Tqnfw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L7Hp0QBiaDicNk4BZfrPREhuzQmhGMel7iagGWApxe1aoiaAVZGd0gLEUgZcBneoficabjsYt06PEjggRg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0B6G7wSGx1ialmiaL129erAoVfcCBny3InRMFsobSFKeDG8cplcA3doJFA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L75jtH0rYodSfoAGwwpIyARgnLQibUuic9Mf0CR8Tib969eiaWtPmQddFkv0ek3YfYWSyE3146jsXm9jg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BichetkQRiawZOKH9Rmgtg3Bxw96ibon8yGiabmHY6yFmDraHdGl1NTh6Wg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L75jtH0rYodSfoAGwwpIyARicd13ojtTgrB5vGAHp5MFB305gqWgMYgUUnIKRxT5eJIzCWpqu07zNA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0B8tMpU3gMETjBARVKf5bj4MSic0yBwyvPkmzHVN9AYbTgYlUOI5F4Q0A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\",\\"https://mmbiz.qpic.cn/mmbiz_png/ibjI8pEWI9L53Y12T80IUoDOdNgcCOb0BMHz3JjnLibfMtzeuMheYsp6qiclRVMSflzyJnDbr2px7uCsW7b3HETJg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1\\"],\\"datePublished\\":\\"2022-07-01T20:53:31.000Z\\",\\"dateModified\\":\\"2024-02-09T16:48:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"团子\\",\\"url\\":\\"https://github.com/baici1\\"}]}"]]},"headers":[{"level":2,"title":"空接口.(具体类型)","slug":"空接口-具体类型","link":"#空接口-具体类型","children":[]},{"level":2,"title":"非空接口.(具体类型)","slug":"非空接口-具体类型","link":"#非空接口-具体类型","children":[]},{"level":2,"title":"空接口.(非空接口)","slug":"空接口-非空接口","link":"#空接口-非空接口","children":[]},{"level":2,"title":"非空接口.(非空接口)","slug":"非空接口-非空接口","link":"#非空接口-非空接口","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"type switch","slug":"type-switch","link":"#type-switch","children":[]}],"git":{"createdTime":1707497310000,"updatedTime":1707497310000,"contributors":[{"name":"TuanZi-bug","email":"yangaoyu33@gmail.com","commits":1}]},"readingTime":{"minutes":5.24,"words":1571},"filePathRelative":"village/08.类型断言.md","localizedDate":"2022年7月1日","autoDesc":true}');export{f as comp,w as data};
