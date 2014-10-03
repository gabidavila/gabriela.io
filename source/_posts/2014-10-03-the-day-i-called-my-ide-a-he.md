---
title: The day I called my IDE a “he”
draft: false
date: "2014-10-01"
author: gabriela
categories:
    - Article
tags:
    - phpstorm
    - IDE
use:
    - posts_tags
    - posts_categories
---

<div class="alert alert-warning alert-block" style=""><i class="fa fa-exclamation-triangle"></i> <b>Disclaimer</b>: this post was <b>not</b> sponsored by Jetbrains</div>

I work with PHP and for my everyday work I use [PHPStorm](http://www.jetbrains.com/phpstorm/) as IDE. It is easily the most complete and powerful solution I have ever used to code.

So recently I was talking to [Kayla Daniels](http://www.twitter.com/kayladnls) about how I opened a file in my IDE and it froze. I never saw that happen to **PHPStorm**, because of it, a little investigation was needed.

### The investigation

_**Is the file big?**_

No, it was not huge, it was 200KB… wait… 200KB? I know PHPStorm can not handle files too big, but 200KB is nothing compared to 400MB sql dump files.

_**Why the file had 200k?**_

The answer: a Controller with more than 4,000 lines.

_**Come again?**_

Yeah, 4,000 lines, no you did not read wrong. A Controller with four thousand lines.

_**Can it get any worse?**_

Yes, it always can get worse: like this controller extended another controller, with 5,000 lines.

To top that, this class is the main controller, so EVERY controller class extend this 5k lines file. I think they did that to get some methods available everywhere through the application, but come on, this is not the right way people!

_**Why the IDE can’t handle a 4,000 lines file?**_

Actually, it can! But the thing is, you know that awesome features you use with PHPStorm (like: Code Sniffer, Cmmd + Click/Control + Click, inline debugger)?

The thing is, when you open a file, it scans all the references into it so you can have all those nice stuff to do your job easily, so imagine how many objects, functions there are in class with 4k lines that inherits a 5k file? (I am not counting the other files)

### The ‘he’ part

I was talking to [Kayla Daniels](http://www.twitter.com/kayladnls) about this situation, and I said to her:

> (…) the size is not the problem, because _he_ scans the whole file (…)

And she said to me: “That is so cute, you called your IDE a ‘he’”. And come to think of it, it is a “he”, at least for me.

I always envied Java Developers because of how awesome Eclipse was for them. And now I am no more, because I think this is the perfect tool for me, he had help me more than I can count. I had a lot of experience with other tools on the market, PHPStorm have fit me very well. But this was not his fault.

Or the ‘he‘ could have been only a "slip of the tongue", simply as that :D
