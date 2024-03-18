import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as c,c as p,b as n,d as e,a as s,w as l,e as r}from"./app-j2w6AIWi.js";const d={},u=r(`<h1 id="string" tabindex="-1"><a class="header-anchor" href="#string"><span>string</span></a></h1><blockquote><p>神秘的字符串！！</p></blockquote><h2 id="字符集" tabindex="-1"><a class="header-anchor" href="#字符集"><span>字符集</span></a></h2><h3 id="ascii-码" tabindex="-1"><a class="header-anchor" href="#ascii-码"><span>ASCII 码</span></a></h3><p>一个<code>bit</code>有0和1两种状态，8个<code>bit</code>代表一个字节，有256个状态，<code>00000000</code>（代表0）到<code>11111111</code>（代表255）。数字可以通过值来表示，字符如何表示？</p><p>大写字母A如何在计算机中表示呢？给他指定一个数字编号<code>01000001</code>，当需要存储A时候就存储这个编号值，要读取时候，根据值通过映射关系找到这个字符。向这样去收录很多字符进行统一编号，得到一个字符编号表也叫做字符集。</p><p>上个世纪60年代，美国制定了一套字符编码，对英语字符与二进制位之间的关系，做了统一规定。这被称为 ASCII 码，一直沿用至今。ASCII 码一共规定了128个字符的编码，大写字母<code>A</code>是65（二进制<code>01000001</code>）。</p><h3 id="unicode" tabindex="-1"><a class="header-anchor" href="#unicode"><span>Unicode</span></a></h3><p>英语用128个字符编码就够了，但是用来表示其他语言就显得很少了，亚洲国家的文字，使用的符号就更多了，汉字就多达10万左右。后面推出了GB2312（存储简体中文），有部分人需要繁体字，那么有推出了BIG5，不断地推出新的字符集。</p><p>因此，要想打开一个文本文件，就必须知道它的编码方式，否则用错误的编码方式解读，就会出现乱码。为了减少这种情况的产生，推出了一个统一的字符集Unicode，将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码，那么乱码问题就会消失。</p><p>Unicode 是一个很大的集合，现在的规模可以容纳100多万个符号。每个符号的编码都不一样。</p><blockquote><p>❓：unicode规定了字符的二进制形式，但是没有规定这个二进制如何存储？不同的字符对应的二进制位数肯定也不一样。</p></blockquote><p>计算机无法知道一串二进制数中三个字节表示的是一个字符而不是表示三个字符。如果都规定用文本中最大的字节作为一个字符来存储（<strong>定长编码</strong>），英文字母只需要一个字节，那么必然会导致英文字母前面有多个字节是0。这对于存储来说是极大的浪费，文本文件的大小会因此大出二三倍甚至更大，这是无法接受的。</p><p>这个编码问题没有解决，Unicode 在很长一段时间内无法推广。</p><h3 id="utf-8" tabindex="-1"><a class="header-anchor" href="#utf-8"><span>UTF-8</span></a></h3><p>互联网的普及，强烈要求出现一种统一的编码方式。UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式。我们来看看UFT-8的编码规则是怎么样的？</p><p>UTF-8 最大的一个特点，就是它是一种<strong>变长</strong>的编码方式。它可以使用<strong>1~4个字节</strong>表示一个符号，<strong>根据不同的符号而变化字节长度。</strong></p><p>UTF-8的编码规则：</p><ol><li>对于单字节的符号，字节的第一位设为<code>0</code>，后面7位为这个符号的 <code>Unicode</code> 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。</li><li>对于<code>n</code>字节的符号（<code>n &gt; 1</code>），第一个字节的前<code>n</code>位都设为<code>1</code>，第<code>n + 1</code>位设为<code>0</code>，后面字节的前两位一律设为<code>10</code>。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。</li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Unicode符号范围     |        UTF-8编码方式
(十六进制)          |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F [0,127] | 0xxxxxxx
0000 0080-0000 07FF [128,2047] | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF [2048,65535]  | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>举例</p></blockquote><p><code>严</code>的 Unicode 是<code>4E25</code>（<code>0100 1110 0010 0101</code>），根据上表，可以发现<code>4E25</code>处在第三行的范围内（<code>0000 0800 - 0000 FFFF</code>），因此<code>严</code>的 UTF-8 编码需要三个字节，即格式是<code>1110xxxx 10xxxxxx 10xxxxxx</code>。然后，从<code>严</code>的最后一个二进制位开始，依次从后向前填入格式中的<code>x</code>，多出的位补<code>0</code>。这样就得到了，<code>严</code>的 UTF-8 编码是<code>11100100 10111000 10100101</code>，转换成十六进制就是<code>E4B8A5</code>。</p><h2 id="字符串-string" tabindex="-1"><a class="header-anchor" href="#字符串-string"><span>字符串（string）</span></a></h2><p>Go的源文件总是按UFT-8进行编码，习惯上Go的字符串会按UTF-8解读。</p><blockquote><p>string在go中如何定义</p></blockquote><p>方式一：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> s <span class="token builtin">string</span><span class="token operator">=</span><span class="token string">&quot;123\\t456\\n&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时在带双引号的字符串字面量中可以使用ASCII码中的转义符。</p><p>方式二：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> s <span class="token builtin">string</span><span class="token operator">=</span><span class="token string">\`q23\`</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用\`\`反引号的方式不会对字符串里面的转义符进行转义，但是可以创建多行的字符串。</p><blockquote><p>string底层结构</p></blockquote><p>string需要一个起始地址，在内存中可以找到字符串的内容，在C语言中通过特定的字符<code>/0</code>来表示字符串结束,但是限制字符串不能出现<code>/0</code>字符，而是通过长度len来表示字符串结束。</p><p><strong>len长度不是字符个数，而是字节个数。</strong></p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211030162201.png" alt="image-20211030162201466" tabindex="0" loading="lazy"><figcaption>image-20211030162201466</figcaption></figure><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">struct</span> String
<span class="token punctuation">{</span>
        <span class="token builtin">byte</span><span class="token operator">*</span>   str<span class="token punctuation">;</span><span class="token comment">//首地址</span>
        intgo   <span class="token builtin">len</span><span class="token punctuation">;</span><span class="token comment">//长度</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在java 和 C 语言中，字符串一般是由<code>char[]</code>数组定义，而go 采用<code>byte</code>数组，其实主要和go语言在创建之初并不想以ASCII码为中心，其采用<code>[]byte</code>的方式，使得在字符串接收时，不会出现乱码。同时go为更方便的处理非ASCII字符串时，定义了<code>rune</code>类型，获取一个<code>Unicode</code>字符。</p><p>rune类型作为int32类型的别名，同时byte式int8类型的别名。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token comment">// byte is an alias for uint8 and is equivalent to uint8 in all ways. It is</span>
<span class="token comment">// used, by convention, to distinguish byte values from 8-bit unsigned</span>
<span class="token comment">// integer values.</span>
<span class="token keyword">type</span> <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token builtin">uint8</span>

<span class="token comment">// rune is an alias for int32 and is equivalent to int32 in all ways. It is</span>
<span class="token comment">// used, by convention, to distinguish character values from integer values.</span>
<span class="token keyword">type</span> <span class="token builtin">rune</span> <span class="token operator">=</span> <span class="token builtin">int32</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>证明：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	s<span class="token operator">:=</span><span class="token string">&quot;yay世界&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;字节输出&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;字符输出&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span>item<span class="token operator">:=</span><span class="token keyword">range</span> s<span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span>item<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211030154206.png" alt="image-20211030154206313" tabindex="0" loading="lazy"><figcaption>image-20211030154206313</figcaption></figure><blockquote><p>string的特性</p></blockquote><p>Go中的string被定义为<strong>只读类型</strong>。字符串在编程中经常会被使用到，只读可以保证数据的安全，减少编程的复杂度。<strong>不允许修改字符串中的字符</strong>。字符串变量是可以<strong>共用底层字符串</strong>实现的。</p><p>如果你想修改字符串内容，一种方法，<strong>可以赋新值</strong>，字符串并没有修改原本的内存对应内容，而是指向新的内存，另一种方法：<strong>变量强制类型转换成字节slice</strong>，就可以进行修改。</p>`,45),g=n("h2",{id:"参考文章",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文章"},[n("span",null,"参考文章")])],-1),m={href:"https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://cloud.tencent.com/developer/article/1784866",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/random_w/article/details/107768992",target:"_blank",rel:"noopener noreferrer"},b={href:"http://cenalulu.github.io/linux/character-encoding/",target:"_blank",rel:"noopener noreferrer"};function h(x,f){const o=t("RouteLink"),a=t("ExternalLinkIcon");return c(),p("div",null,[u,n("p",null,[e("关于slice建议去看"),s(o,{to:"/novice_village/Go/SourceCode/%E6%95%B0%E7%BB%84%E4%B8%8Eslice.html"},{default:l(()=>[e("slice讲解")]),_:1})]),g,n("p",null,[n("a",m,[e("字符编码笔记：ASCII，Unicode 和 UTF-8"),s(a)])]),n("p",null,[n("a",k,[e("go 语言string之解析"),s(a)])]),n("p",null,[n("a",v,[e("Go语言标准库学习之strings——字符串格式化的利器"),s(a)])]),n("p",null,[n("a",b,[e("十分钟搞清字符集和字符编码"),s(a)])])])}const F=i(d,[["render",h],["__file","03.string.html.vue"]]),q=JSON.parse('{"path":"/novice_village/Go/SourceCode/03.string.html","title":"string","lang":"zh-CN","frontmatter":{"title":"string","date":"2022-07-01T20:53:31.000Z","category":["语言基础","go"],"author":{"name":"团子","url":"https://github.com/baici1"},"comment":false,"description":"string 神秘的字符串！！ 字符集 ASCII 码 一个bit有0和1两种状态，8个bit代表一个字节，有256个状态，00000000（代表0）到11111111（代表255）。数字可以通过值来表示，字符如何表示？ 大写字母A如何在计算机中表示呢？给他指定一个数字编号01000001，当需要存储A时候就存储这个编号值，要读取时候，根据值通过映射关...","icon":null,"isOriginal":true,"star":false,"article":true,"timeline":true,"image":null,"banner":null,"head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/novice_village/Go/SourceCode/03.string.html"}],["meta",{"property":"og:site_name","content":"文档演示"}],["meta",{"property":"og:title","content":"string"}],["meta",{"property":"og:description","content":"string 神秘的字符串！！ 字符集 ASCII 码 一个bit有0和1两种状态，8个bit代表一个字节，有256个状态，00000000（代表0）到11111111（代表255）。数字可以通过值来表示，字符如何表示？ 大写字母A如何在计算机中表示呢？给他指定一个数字编号01000001，当需要存储A时候就存储这个编号值，要读取时候，根据值通过映射关..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211030162201.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-18T07:16:08.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"string"}],["meta",{"property":"article:author","content":"团子"}],["meta",{"property":"article:published_time","content":"2022-07-01T20:53:31.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-18T07:16:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"string\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211030162201.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211030154206.png\\"],\\"datePublished\\":\\"2022-07-01T20:53:31.000Z\\",\\"dateModified\\":\\"2024-03-18T07:16:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"团子\\",\\"url\\":\\"https://github.com/baici1\\"}]}"]]},"headers":[{"level":2,"title":"字符集","slug":"字符集","link":"#字符集","children":[{"level":3,"title":"ASCII 码","slug":"ascii-码","link":"#ascii-码","children":[]},{"level":3,"title":"Unicode","slug":"unicode","link":"#unicode","children":[]},{"level":3,"title":"UTF-8","slug":"utf-8","link":"#utf-8","children":[]}]},{"level":2,"title":"字符串（string）","slug":"字符串-string","link":"#字符串-string","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1710746168000,"updatedTime":1710746168000,"contributors":[{"name":"TuanZi-bug","email":"yangaoyu33@gmail.com","commits":1}]},"readingTime":{"minutes":6.02,"words":1805},"filePathRelative":"novice_village/Go/SourceCode/03.string.md","localizedDate":"2022年7月1日","autoDesc":true}');export{F as comp,q as data};