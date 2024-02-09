import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as e,o as t,c as o,a as n,d as p,b as c,e as i}from"./app-NQzcIKZ2.js";const l={},d=i(`<h1 id="函数调用栈" tabindex="-1"><a class="header-anchor" href="#函数调用栈"><span>函数调用栈</span></a></h1><p>我们按照编程语言的语法定义的函数，会被编译器编译为一堆堆机器指令，写入可执行文件。程序执行时可执行文件被加载到内存，这些机器指令对应到虚拟地址空间中，位于代码段。</p><p>如果在一个函数中调用另一个函数，编译器就会对应生成一条<strong>call</strong>指令，程序执行到这条指令时，就会跳转到被调用函数入口处开始执行，而每个函数的最后都有一条<strong>ret</strong>指令，负责在函数结束后跳回到调用处，继续执行。（如果学过微机原理，你可以懂得指令的含义）</p><h2 id="函数栈帧" tabindex="-1"><a class="header-anchor" href="#函数栈帧"><span>函数栈帧</span></a></h2><p>函数执行时候，需要有足够的内存空间，供他存放局部变量，参数等数据，这段空间对应到虚拟地址空间的栈。</p><p>分配给函数的栈空间被称为<strong>函数栈帧</strong>，Go 语言中函数栈帧布局是如下的，先是调用者栈基地址，然后是函数的局部变量，最后是被调用函数的返回值和参数。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123203550.png" alt="image-20211123203550591" tabindex="0" loading="lazy"><figcaption>image-20211123203550591</figcaption></figure><blockquote><p>注： bp 栈基不一定存在，在有些情况下会被优化掉，也有可能是平台不支持。我们只关注局部变量，返回值的相对位置就好了。</p></blockquote><p>举个例子：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a1<span class="token punctuation">,</span> a2<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2 <span class="token builtin">int64</span>
    a1<span class="token punctuation">,</span> a2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>
    r1<span class="token punctuation">,</span> r2 <span class="token operator">=</span> <span class="token function">B</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> a2<span class="token punctuation">)</span>
    r1 <span class="token operator">=</span> <span class="token function">C</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>r1<span class="token punctuation">,</span> r2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">B</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> p2 <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int64</span><span class="token punctuation">,</span> <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> p2<span class="token punctuation">,</span> p1
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">C</span><span class="token punctuation">(</span>p1 <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token builtin">int64</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> p1
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数 A 的栈帧分布就由上至下，分别是局部变量 <code>a1, a2, r1, r2</code> ，被调函数 B 的返回值 <code>r2,r1</code> ，被调用函数 B 的参数 <code>a2,a1</code>。</p><p><strong>注意观察参数的顺序，返回值和参数都是先入栈的第二个，然后再入栈的第一个，相当于是从右至左逐一入栈的。</strong></p><p>被调用函数是通过栈指针加上偏移量这样相对寻址的方式来定位自己的参数和返回值，刚好由下至上先找到第一个参数在找到第二个参数（通过<strong>增加偏移量</strong>的方式）。所以说参数和返回值采用<strong>由右至左的入栈顺序</strong>比较合适。</p><blockquote><p>通常，我们认为返回值是通过寄存器传递的，但是 Go 语言支持多返回值，所以在栈上分配返回值空间更合适</p></blockquote><p><strong>所有的函数的栈帧布局都会遵循统一的约定。</strong></p><p>对于函数 B 的调用会被编译器编译成 <code>Call</code> 指令。<code>Call</code> 指令只做两件事情。</p><ol><li>将下一条指令的地址入栈，被调用函数结束后，跳回到该地址继续执行，这就是返回地址</li><li>跳转到被调用函数的指令入口处执行，所以返回地址下面就是函数 B 的栈帧。</li></ol><p>其余的部分会按照 A 函数布局一样布局。</p><p>当函数 B 执行结束后会释放栈帧，然后就到 <code>Ret</code> 指令了，<code>Ret</code> 指令也会干两件事。</p><ol><li>弹出<code>Call</code> 指令压栈的返回地址</li><li>跳转到返回地址</li></ol><blockquote><p>函数通过 <code>Call</code> 指令实现跳转，每个函数会分配栈帧，结束前就会释放自己的栈帧，<code>Ret</code> 指令就会将栈恢复到 <code>Call</code> 之前的样子。</p></blockquote><p>那么函数 C 就是重复函数 B 的行为。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123205624.png" alt="image-20211123205624277" tabindex="0" loading="lazy"><figcaption>image-20211123205624277</figcaption></figure><p>在 Go 语言中，函数栈帧是<strong>一次性分配</strong>的，也就是在函数开始执行时候分配足够大的栈帧空间。</p><p>一次性分配函数栈帧的主要原因是<strong>避免栈访问越界</strong>。如下图所示，三个 <code>goroutine</code> 初始化分配的栈空间是一样的。如果 <code>g2</code> 剩余的栈空间不够执行接下来的函数，如果选择<strong>逐步扩张</strong>，那么执行期间就会<strong>发生栈访问越界</strong>的情况。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123210314.png" alt="image-20211123210314416" tabindex="0" loading="lazy"><figcaption>image-20211123210314416</figcaption></figure><p>其实对于栈消耗较大的函数，Go 语言编译器会在<strong>函数头部插入检测代码</strong>，如果发现需要<strong>栈增长</strong>，就会另外分配一个<strong>足够大的栈空间</strong>，将原来栈上的数据都拷过来，原来的空间就会被释放。</p><h2 id="传参" tabindex="-1"><a class="header-anchor" href="#传参"><span>传参</span></a></h2><p>我们在学习 C 语言时候相信也会遇到一个问题 <code>Swap</code> 为什么传参就无法交换变量，而交换指针时候却可以了。我会有很多解决，例如：实参和形参不在同一个地址，改变形参不会影响到实参。现在我们通过函数调用栈，来看看为什么会失败？传指针为什么会成功？</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token comment">//值传递</span>
<span class="token keyword">func</span> <span class="token function">swap</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span>b <span class="token operator">=</span> b<span class="token punctuation">,</span>a
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span>b <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span>
	<span class="token function">swap</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>  <span class="token comment">//1,2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先分析 <code>main</code> 函数的函数调用栈。</p><p>在 <code>main</code> 函数栈帧中，先分配局部变量存储空间 <code>a=1,b=2</code>。接下来时被调用函数的返回值，但是 <code>Swap</code> 函数并没有返回值，所以这里就没有，接下来时被调用函数传入的参数 <code>b,a</code> 。在 Go 语言中传参都是值拷贝，拷贝整型变量值。注意：参数入栈顺序！如下图所示。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124160403.png" alt="image-20211124160403622" tabindex="0" loading="lazy"><figcaption>image-20211124160403622</figcaption></figure><p>调用者栈帧（<code>sp of main</code>）后面就是 <code>Call</code> 指令存入的返回地址，接下来就是 <code>Swap</code> 函数开始执行。再下面分配的就是 <code>Swap</code> 函数栈帧。接下来就是常规的函数栈帧的分配问题。我们聚焦于代码。</p><p>当 <code>Swap</code> 函数执行这一段交换代码时候<code>a,b = b,a</code> ，要交换两个参数的值，他的参数通过相对寻址找到了，但是<strong>交换的是 <code>main</code> 函数栈帧里面的参数空间的 <code>a</code> 与 <code>b</code></strong> ，现在我们<strong>想要交换的是局部变量里面的 <code>a</code> 与 <code>b</code></strong> ，而参数空间与局部变量空间并没有关联，这就是他失败的原因。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token comment">//指针传递</span>
<span class="token keyword">func</span> <span class="token function">swap</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>a<span class="token punctuation">,</span><span class="token operator">*</span>b <span class="token operator">=</span> <span class="token operator">*</span>b<span class="token punctuation">,</span><span class="token operator">*</span>a
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span>b <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span>
	<span class="token function">swap</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">,</span><span class="token operator">&amp;</span>b<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>  <span class="token comment">//2,1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>main</code> 函数栈帧中，先分配局部变量，然后在分配参数空间，这里因为参数是指针类型，注意：参数是 <code>int</code> 的指针类型，而不是 <code>int</code> 类型了。传参是值拷贝，所以这里会拷贝 <code>a</code> 和 <code>b</code> 的地址。从右至左入栈。接下来就是返回地址以及 <code>Swap</code> 函数栈帧了。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124163255.png" alt="image-20211124163255158" tabindex="0" loading="lazy"><figcaption>image-20211124163255158</figcaption></figure><p>Swap 函数中这一段 <code>*a,*b = *b,*a</code>，交换的是 a 的地址与 b 的地址对应的值。那么回到 <code>main</code> 函数局部变量空间的 <code>a</code> 的地址对应的值就变成了 <code>2</code>。</p><p>在这里他依旧是值的交换，只不过他交换的是 <code>a</code> 和 <code>b</code> 对应地址的值，地址没有发生改变。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124163347.png" alt="image-20211124163347572" tabindex="0" loading="lazy"><figcaption>image-20211124163347572</figcaption></figure><h2 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值"><span>返回值</span></a></h2><blockquote><p>通常，我们认为返回值是通过寄存器传递的，但是 Go 语言支持多返回值，所以在栈上分配返回值空间更合适</p></blockquote><p>我们先看一个例子：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">incr</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> b <span class="token builtin">int</span>
    
    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        a<span class="token operator">++</span>
        b<span class="token operator">++</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    a<span class="token operator">++</span>
    b <span class="token operator">=</span> a
    <span class="token keyword">return</span> b
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> a<span class="token punctuation">,</span>b <span class="token builtin">int</span>
    b <span class="token operator">=</span> <span class="token function">incr</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span> <span class="token comment">//0,1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先进行分析，<code>main</code> 函数栈帧，先是局部变量 <code>a,b</code> 接着是被调用函数 incr 的返回值，然后是被调用函数的参数 <code>a</code>，以及返回地址与 <code>incr</code> 函数栈帧。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124170446.png" alt="image-20211124170446035" tabindex="0" loading="lazy"><figcaption>image-20211124170446035</figcaption></figure><p>进入到 <code>incr</code> 函数里面，会执行参数 <code>a</code> 的自增加一，然后是局部变量 <code>b</code> 的赋值。现在有一个问题：到底是先返回值还是先执行 <code>defer</code> 函数？</p><p>答案：先返回值！</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124170542.png" alt="image-20211124170542833" tabindex="0" loading="lazy"><figcaption>image-20211124170542833</figcaption></figure><p>先会将 <code>incr</code> 函数局部变量中间的 <code>b</code> 的值经过值拷贝到 <code>main</code> 函数的返回值空间，然后再执行 <code>defer</code> 函数。<code>defer</code> 函数将 <code>incr</code> 函数的参数 <code>a</code> 和局部变量 <code>b</code> 进行自增。之后就 <code>incr</code> 结束。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124171454.png" alt="image-20211124171454627" tabindex="0" loading="lazy"><figcaption>image-20211124171454627</figcaption></figure><p>main 函数返回值空间的值会通过值拷贝赋值给局部变量中的 b。所以输出分别为 0 和 1。</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124171504.png" alt="image-20211124171504432" tabindex="0" loading="lazy"><figcaption>image-20211124171504432</figcaption></figure><blockquote><p>再看下一个例子，这里的局部变量b改成命名返回值，看看有什么不同。</p></blockquote><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">incr</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        a<span class="token operator">++</span>
        b<span class="token operator">++</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    a<span class="token operator">++</span>
    <span class="token keyword">return</span> a
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> a<span class="token punctuation">,</span>b <span class="token builtin">int</span>
    b <span class="token operator">=</span> <span class="token function">incr</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span> <span class="token comment">//0,2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将注意力聚焦到 <code>incr</code> 函数中，我们之前说过会先进行返回值赋值然后去执行 <code>defer</code> 函数，所以这里会先将 参数 <code>a</code> 的值赋值到返回值空间中的 <code>b</code> 上，现在 <code>b=1</code>，开始执行 <code>defer</code> 里面的函数，参数 <code>a</code> 自增，返回值 <code>b</code> 也会自增加一。现在 <code>incr</code> 的返回值 <code>b=2</code>，那么此时 <code>main</code> 函数的返回值空间 <code>b</code> 也会是 <code>2</code>。</p><p>我们先来理一下思路：</p><p>第一种我们所讲的就是<strong>匿名返回值</strong>，我们只定义了返回值的类型，没有去给他命名。defer 函数的后续操作都是在 incr 函数里面的局部变量和 main 函数的参数空间进行改变。好像并没有改变 main 的返回值空间的变量。</p><p>第二种我们所讲的是<strong>命名返回值</strong>，在执行 <code>return a</code> 的时候，相当于此时进行一个 <code>b=a</code> 的一段代码。所以在没有执行 <code>defer</code> 函数之前 <code>b=1</code>，此时的 main 返回值空间 <code>b=1</code>，我们可以看到 <code>defer</code> 语句改变了我们返回值空间的变量。</p><p>此时我们可以猜测，如果我们给被调用函数早就命名好了返回值，相当于我们当前函数的返回值空间的已经多了一个命名好的变量，如果没有 defer 函数，此时情况与正常使用无异，但是如果有，此时 defer 就会去改变此时调用者函数返回值空间的变量。此时被调用函数的命名返回值的地址与调用者函数返回值地址一致。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h2>`,62),r={href:"https://mp.weixin.qq.com/s/zcqzarXMJrDUY5DLXZXY1Q",target:"_blank",rel:"noopener noreferrer"};function u(g,k){const a=e("ExternalLinkIcon");return t(),o("div",null,[d,n("p",null,[n("a",r,[p("【Golang】图解函数调用栈"),c(a)])])])}const v=s(l,[["render",u],["__file","12.函数调用栈.html.vue"]]),f=JSON.parse('{"path":"/village/12.%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E6%A0%88.html","title":"函数调用栈","lang":"zh-CN","frontmatter":{"title":"函数调用栈","date":"2022-07-01T20:53:31.000Z","category":["语言基础","go"],"author":{"name":"团子","url":"https://github.com/baici1"},"comment":false,"description":"函数调用栈 我们按照编程语言的语法定义的函数，会被编译器编译为一堆堆机器指令，写入可执行文件。程序执行时可执行文件被加载到内存，这些机器指令对应到虚拟地址空间中，位于代码段。 如果在一个函数中调用另一个函数，编译器就会对应生成一条call指令，程序执行到这条指令时，就会跳转到被调用函数入口处开始执行，而每个函数的最后都有一条ret指令，负责在函数结束后...","icon":null,"isOriginal":true,"star":false,"article":true,"timeline":true,"image":null,"banner":null,"head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/village/12.%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E6%A0%88.html"}],["meta",{"property":"og:site_name","content":"文档演示"}],["meta",{"property":"og:title","content":"函数调用栈"}],["meta",{"property":"og:description","content":"函数调用栈 我们按照编程语言的语法定义的函数，会被编译器编译为一堆堆机器指令，写入可执行文件。程序执行时可执行文件被加载到内存，这些机器指令对应到虚拟地址空间中，位于代码段。 如果在一个函数中调用另一个函数，编译器就会对应生成一条call指令，程序执行到这条指令时，就会跳转到被调用函数入口处开始执行，而每个函数的最后都有一条ret指令，负责在函数结束后..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123203550.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-09T16:48:30.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"函数调用栈"}],["meta",{"property":"article:author","content":"团子"}],["meta",{"property":"article:published_time","content":"2022-07-01T20:53:31.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-09T16:48:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"函数调用栈\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123203550.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123205624.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211123210314.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124160403.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124163255.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124163347.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124170446.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124170542.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124171454.png\\",\\"https://cdn.jsdelivr.net/gh/baici1/img-typora/20211124171504.png\\"],\\"datePublished\\":\\"2022-07-01T20:53:31.000Z\\",\\"dateModified\\":\\"2024-02-09T16:48:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"团子\\",\\"url\\":\\"https://github.com/baici1\\"}]}"]]},"headers":[{"level":2,"title":"函数栈帧","slug":"函数栈帧","link":"#函数栈帧","children":[]},{"level":2,"title":"传参","slug":"传参","link":"#传参","children":[]},{"level":2,"title":"返回值","slug":"返回值","link":"#返回值","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1707497310000,"updatedTime":1707497310000,"contributors":[{"name":"TuanZi-bug","email":"yangaoyu33@gmail.com","commits":1}]},"readingTime":{"minutes":8.71,"words":2613},"filePathRelative":"village/12.函数调用栈.md","localizedDate":"2022年7月1日","autoDesc":true}');export{v as comp,f as data};
