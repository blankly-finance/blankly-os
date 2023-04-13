---
readingTime: 10
title: An Honest Comparison of VS Code vs JetBrains - 5 Points
description: After coding in VS Code for over five years, it might seem strange as
  to why I decided to switch my primary (and honestly only IDE) I had been using up
  to this point. Here are some of the reasons that helped influence my decision to switch
authorName: Jeremy Liu
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fjeremy.png?alt=media&token=8b98cf1a-53c1-4565-8597-21e85430e1c8'
date: 2022-01-06
category: Technology
categoryClass: bg-red-100
categoryText: text-red-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2Fseo-jetbrains.png?alt=media&token=49d045d9-9943-47af-a8f7-5e5808d9c96f'

---
Call me crazy if you have to. You’d think that after five years of coding in one IDE, I would be out of my mind to leave *the* [VS Code](https://code.visualstudio.com/). And sure, before I tried out the [JetBrains](https://www.jetbrains.com/) ecosystem, I would’ve completely agreed. I would’ve even offered up my left kidney, fighting for the fact that VS Code was superior (just like M1 Pro Macs are) to any other IDE on the market. Now just a bit of background, I work at [Blankly](https://blankly.finance/) where we enable people to build trading algorithms on hedge-fund level cloud infrastructure in minutes instead of months. During one of our daily stand-up meetings, my co-worker, Emerson, was adamant about the JetBrains ecosystem and extended the meeting trying to convince one of us to give it a whirl. And… I begrudgingly agreed, thinking it’d be a one and done thing (and so that the *finally* meeting could end). But wouldn’t you know it, I’m here now, writing this article about what finally convinced me to abandon the IDE that has been by my side since day one. 

<figure>
  <img alt="vscode-vs-jetbrains" src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fvscodetojetbrains.png?alt=media&token=377f55d6-c042-4904-b8eb-b2fafbbd7993" width="700">
</figure>

If you’re looking for a change of an editor, but are hesitant on even giving JetBrains a try (because, I mean VS Code is free and JetBrains for non-students isn’t) or if you’re just interested in the reasons as to why I committed such a betrayal, read on! **This article is an honest comparison between VS Code and JetBrains and why the switch to JetBrains might be great for some.** 

## 1. Code Inspection & Refactoring

### VS Code - Quick, Easy, Multilanguage Support

VS Code can be considered as an “editor” for a reason. It’s quick and easy to get up and running with just about any programming language. And, for any full stack developers like me, this is big. Whether you’re switching between python for an API or javascript for a frontend, or adding a NextJS react app, or setting up a ruby on rails system, VS Code can support these languages, provide linting, and much more—entirely out of the box. And, on the off-chance it cant? Well, simply just find an extension!

Also, VS Code has great linting thanks to its many new extensions such as Github Copilot, AI-based linting, auto imports, and much more. It’s now easier than ever to get what you want, when you want it. All you have to do is add a period and *most of the time*, things just pop up. But sometimes, it gets super frustrating when it suddenly doesn’t. In fact, more often than not, I’ve been bogged down, trying to figure out why a specific linter would **NOT** work. Whether it’s because of my multiple python environments installed via Anaconda or missing package that aren’t installed—most of the time—I simply have no idea. Moreover, linting JavaScript is also kind of a doozy. VS Code just doesn’t even try to infer Javascript type. But, luckily for me (and if you’re developing in an enterprise context too), TypeScript solves these issues, making this concern not really come up.

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.20.23_PM.png?alt=media&token=9a825795-40b0-4498-9edf-05e8b4c55c5f" alt="vscode-broken-linting">
  <figcaption>
    Here we have broken linting as our packages are not being recognized as existing even with a `pip install`. Turns out it was because we forgot to change our python environment.
  </figcaption>
</figure>

Finally, let’s talk about refactoring. I think VS Code does a phenomenal job of refactoring as an editor—key word being editor here. Being able to refactor a variable name change or moving a file and refactoring imports is great. But, say that I want to say move a function, change a set of named parameters, or abstract code out, VS Code is limited in its abilities. Luckily, the base refactoring does satisfy many use cases, and it fulfilled most of my use cases as a student for the past five years, albeit minimally at times.

### JetBrains - Specialized, Specific, and Powerful Support

For JetBrains, man is this a powerful IDE with unreasonable amounts of settings. My first time opening this IDE, I spent over an hour messing around with my settings, getting my code to display *just* right. But, what took a bit of time to get use to was having to switch between different IDEs for different use cases. If suddenly my POST request stopped working, I would have to open up PyCharm to see if the problem was on my backend or, if I suddenly thought of a better optimization for my OPTTSP traveling salesmen class project, I would have to load CLion as well. But, with Intellesense, opening the different IDEs was simply learning a couple other scrips like `webstorm .` and `pycharm .` instead of `code .`

Secondly, the capability of the JetBrains engine was surprisingly noticeable once I had switched over. Gone were the days where linting would randomly appear and I would try spamming **`command+p -> reload windows`** hoping some of the OCD triggering red lines would go away or actually tell me something useful. Instead, simply having consistent and fast-responding linting has been a complete breath of fresh air.

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.33.23_PM.png?alt=media&token=b4eb639a-f3b9-46e4-9998-b0d06ffe182c">
  <figcaption>
    One keyboard shortcut to see every use
  </figcaption>
</figure>

Finally, what really stood out to me in JetBrains was its refactoring refactoring capabilities. Just last week, I was working on finalizing the private beta platform for release. In the process, I reorganized and generated new components to make it more scalable for future development. I think in total I moved and broke apart over 200 components and not once did I run into a single compile error caused by important statements or invalid/undefined components. For contrast, just reorganizing two files in one of my projects for my data structures class broke my entire cpp code, requiring me to manually change some imports and functions. Moreover, JetBrains extensive refactoring tools like safe delete, global renames, and more has ensured that I have had more tools than I could ever use.

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.34.38_PM.png?alt=media&token=c2096e05-8f15-44de-93f8-47d0dde53f9c">
  <figcaption>
    Now easily view context of all usages and be confident about refactoring & renaming
  </figcaption>
</figure>


<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.41.01_PM.png?alt=media&token=6830d51b-bd6f-4a8f-bad8-c2b9a15840f0">
  <figcaption>
    JetBrains IDEs read the headers for you
  </figcaption>
</figure>

### Comparison

Overall, I would say that both of these environments come close to in terms of features and functionality. Both have solid auto-linting and formatting functionality and add a variety of customizable colors and swiggles to help you debug and better visualize your code. However, with JetBrains perfectly consistent linting engine coupled with its unbreakable refactoring process, I must say that if code factoring and refactoring is important to you and your workflow, I would definitely recommend JetBrains.

## 2. Debugging

### VS Code - Debug Almost Anything

The beauty about VS Code debugging is that it’s super extensible. Every time you hit the run button on the left bar, VS code generates a `.vscode` directory that houses your `settings.json` that houses your debugging properties. For most languages, such as debugging python or JavaScript, this is really easy since VS Code handles the debugging all for you, and assuming you have your environment set up correctly, debugging is as easy as clicking that button. It’s also super easy to change what you’re debugging by simply going to the `settings.json` file. Now it gets more complicated when you’re using build specific or even platform specific languages such as C++ or C where setting up `gcc` and `clang` ups the complexity. Setting up the ability to debug these files becomes such an annoyance and and takes endless amounts of time. I’ve spent many a days just copying over previous `settings.json` to try to get my current project to work. At my uni—The University of Michigan, Ann Arbor—they’ve defaulted to simply give everyone the same `settings.json` to use in order to hours of office hour frustrations. But, the fact that we even need to touch this `settings.json` to handle debugging is in itself a little bit frustrating. 

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FUntitled.png?alt=media&token=d9bcc4df-0652-411a-bd32-0d7307bf5384" alt="config">
  <figcaption>
    A simple settings.json needed to run the debugger C/C++ on MacOS
  </figcaption>
</figure>


Now as for the actual debugging, placing breakpoints, identifying variables, adding watchers, VS Code handles beautifully in their debug console. However, it would be nice to see the variable values directly on the code overlay rather than in the side panel.

Luckily, what’s beautiful about VS Code is that the extensions, and support for a wide variety of languages enables everyone to set up debugging in typically seconds, and if not minutes. The debugging does a great job for minor debugging and smaller cases but when it comes to specific languages, VS Code debugging breaks down. However, I’ve also tended to notice that require larger heap sizes (i.e. recursion or simply large function calls), the debugger seems to struggle and crash further into its runtime.

### JetBrains - A Debugging Monster

On the other hand, because all of Jetbrain’s IDEs are built on configuration based runs, you can begin a debug session at the push of the `debug` button. Breakpoints can be set globally in the IDE just by pressing the blank space by the line number. This instant setup for any debugging process makes the setup experience alone amazing. The IDE also shines during actual debugging. When in a debugging session, all variables defined in the scope are visible by their definitions. This allows an extremely easy way to see the values just by clicking. I was impressed a few days ago when I was running a debug in Pycharm and attempting to view the values of a dataframe. Just by clicking the dataframe variable and pressing `view as dataframe`, Pycharm opened the Dataframe in SciView and showed all Dataframe values as well as the column headers:

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_2.45.09_PM.png?alt=media&token=3ada6280-4ac0-4280-80a9-7a34e48b5a6d" alt="debug natively">
  <figcaption>
    Insight achieved by setting a breakpoint natively and hitting debug
  </figcaption>
</figure>

In the screenshot above, all local values in the scope are viewable in the bottom window. The dropdown next to `history_and_returns` shows all attribute values of the dictionary and the dataframe nested in that dictionary. On the right, Pycharm is showing the same Dataframe that is already nested in a dictionary as a `SciView`. Achieving this level of insight into your code without setting up any print statements or stack traces is extraordinary useful. You imagine how easy it is to find flawed logic in a loop, fix indexing errors, or any other traditionally abstract reasoning when all values are projected right into your editor next to their assignments.

Like many other debuggers, JetBrains also offers the ability to step through your code. This includes the classic step over which goes to the next line or step into which goes into any function you want to examine further. An extremely useful one is `Run to Cursor` which allows you to set what feels like another breakpoint just by placing your cursor on a line you want to examine further. The ability for the JetBrains debugger to be instantly setup and then provide such an integrated experience has completely changed how I code and accelerated my development.

### Comparison

As debugging is one of the most common (and rage-inducing) things we do as developers on a day to day basis, I must say this is an important, if not essential feature for many developers to have. Both IDE environments provide a very solid debugging environment but, I must say that JetBrains edges out VS Code again here by just a little bit. Specifically, with JetBrains displaying variable data right next to the declared variable makes tracking the values inside variables much more manageable where there are numerous variables live. Moreover, JetBrains stronger and more stable debugger that does not require complex set-up like the `settings.json` (which also, at times led me to use `cout` or `printf` statements instead) in VS Code was the cherry on top. These factors just come together help save me that tiny bit of extra time in my day and makes the JetBrains more attractive to me.

## 3. Git Integration

### VS Code - A Powerful Source Control Built In

Anyone that’s working in teams or even cares about storing their code somewhere safe (in case you throw your computer out the window when your code isn’t running) knows how important git is in their workflow. Git version control is almost imperative now for any modern code editor. And VS Code does this well. VS Code will automatically detect an initial git repository and immediately offer many inherent git commands available including push, pull, commit, etc.

From VS Code’s git panel, I’m able to easily sync changes that I have and also see what changes have been made. I’m also able to create branches and clone repos (though some of these are hidden in the more). What I love the most about VS Code is that it sort of tells you what to do. It immediately tells you to commit changes and detects all files that have changed and allows you to commit a message. It also checks and syncs changes as you go. It detects local branches vs remote branches, and has solid rebasing capabilities. 

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2F9Yz5D.jpeg?alt=media&token=11e5c260-dd4b-448c-adfc-b8a06b69c57f" alt="Merge Conflict">
  <figcaption>
    Easily see where the merge conflict is inline
  </figcaption>
</figure>

One of the things that makes VS Code stand out too is the ability to handle merge conflicts. With merge conflict resolution built into the VS Code editor, I’m able to press a button to keep a current change, or handle the incoming changes that come in. And trust me, this has saved me so, so much time. 

## JetBrains - Never Touch the Command Line Again

I have barely touched my terminal in the entire time since I’ve switched over. With JetBrains providing full integration of merging pull requests, resolving conflicts, and switching and comparing branches, the source control is unreasonably better than my experience in VS Code. Take a look at the experience doing some of these common actions:

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.01.28_PM.png?alt=media&token=26f3a3fa-f89e-44c5-a15b-e0fd7937d463" alt="Merge Conflict JetBrains">
  <figcaption>
    Comparison of a particular file between branches
  </figcaption>
</figure>

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.05.17_PM.png?alt=media&token=b681e421-3ab8-4d8f-8657-98db60abc1c6" alt="Branch details JetBrains">
  <figcaption>
    Branch details built in
  </figcaption>
</figure>

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjetbrains-vs-vscode%2FScreen_Shot_2022-01-09_at_3.07.18_PM.png?alt=media&token=be517911-89c7-4a2a-ba03-20e93ba33540" alt="Detailed git log with deltas">
  <figcaption>
    Details git log with deltas
  </figcaption>
</figure>

### Comparison

In terms of features for Git integration, these environments are basically identical in terms of features. I found that they provide basically the same functionalities and you could not go wrong with either one. I would say that this just come down to personal preference. For example, I found myself preferring the JetBrains method with how merge conflicts are resolved as the interfaces laid side to side instead of stacked on top of each other. Not really a determining factor in the end.

## 4. Extensibility

### VS Code - Extensions Galore

Visual Studio Code is one of the most extensible editors out there. Integrations and extensions are at the heart of the VS Code editor. Top picks include the Python Extension, Remote Development Extension, and many other IntelliSense driven extensions. VS Code also has some cool ones including code formatting via Prettier, theming via icons and code editor themes. Just about every single item / feature that VS Code offers is fully extensible and there probably many of  extension out there that can empower your process. 


<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FVSCODE-Extension.png?alt=media&token=79bdb4d4-9fa1-43b5-8bc9-062f6adc4cff" alt="vscode-extension">
</figure>

One of my all-time favorites is the remote docker container support. This allows users to use VS Code to remotely program in a docker container itself. If you have docker installed locally or remotely, you’re able to easily run your code and do all that you need to do in docker, simply from your vscode. Want some more interesting stuff? Check out remote development via SSH. Microsoft allows you to remotely SSH into your server’s development environment and program just like you would normally. All of these features here, makes VS Code arguably one of the best editors out there, as these are simply one click away from being fully operational. 

### JetBrains - A Deep Ecosystem of Integrations

Extensibility is an area where a JetBrains IDE doesn’t necessarily shine. This is largely because you will find that everything that you need often ships with the IDE. With the benefit of being able to install a specific IDE with superpowers for your language, I’ve found that the integrations that I might be used to installing on VS Code shipped with the software.

For example, JetBrains powerful built-in integrations with docker. By only specifying a configuration type such as a `Dockerfile`, all JetBrains IDEs give complete control of all arguments, names, tags, ports, environment variables in an easy-to-use configuration GUI. When run, the IDE integrates with docker integration to bring you the build log, the run log, environment variables, and easy-to-read and integrated configuration settings:

<figure align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FExtensions.png?alt=media&token=4bd3c9f2-3d19-4181-a06e-c2149f11c657" alt="jetbrains-extension">
</figure>

The same is true for many other common services such as FastAPI, Flask, shell scripts and a ton more.

JetBrains IDEs also have a rich plugin ecosystem. For example, I was able to install a plugin that offered full language support for Verilog and another that gave full support for Matlab. Ironically these lightweight JetBrains plugins gave a better coding experience than the native Matlab or Quartus (Verilog) environments.

### Comparison

Indubitably, both have an extensive community and marketplace to be able to get a variety of stable and custom built extensions/plugins. Any feature that each respective IDE might not be able to handle, you will most likely be able to add it to their core functionality. However, with a slightly larger community base on VS Code (and the support of Microsoft), having more extensions and the life-changing Remote-Containers extension (for me, at least) allowed me to iterate so much faster. Here, if you are working with very custom code that might require custom extensions like Docker, VS Code is definitely the IDE for you.  

## 5. Collaboration

### VS Code - Live Share by Extension

Though VS Code itself does not have live sharing built in. Microsoft has created a live share extension that allows almost instant live sharing. What makes this so great is that all anyone needs is VS Code, in fact now you can even live share directly from your browser using vscode.dev. The actual live share process itself is really good...as long as you have a good internet connection. Users can follow each other and edit code alongside each other. VS Code also keeps track of who helped author the commit for source control. With all of this in mind, and how simple live share is to set up. VS Code arguably outshines almost any other IDE and editor in this space. 

There are some caveats. One example is live sharing Vue.js. When live sharing vue, some of the extensions don’t propagate including Vetur, which is critical to Vue visualization. This sometimes makes it extremely difficult and arguably annoying, but I think this is very specific to a specific audience (so Vue users out there beware). Also, I really hate how the undo functionality is tied to the machine, not the user. I just gets in the way and causes confusion.

### JetBrains - Secure & Distributed

All JetBrains IDEs offer a huge number of options to share your code with others and collaborate live. These options vary by the degree of security they offer. An impressive ability I recently discovered was running any JetBrains IDE inside a docker container using projector. This allows me to connect to a JetBrains IDE hosted on a server such as the cloud and then code with full JetBrains features inside my web browser. Now with just a password I can securely code anywhere from a headless server. This is just one of the many sharing options.

A more mainstream way to share JetBrains IDEs is using Code With Me. This allows you to view other people’s projects directly in your IDE and and use their dev environment as if it was native on your computer. One thing I was impressed with is that a teammate was having a python issue and easily started a Code With Me Session. I was able to natively run their configurations, use the debugger with the same insights I showed above and and then easily fix their issue.

The many different and well integrated ways to share IDEs are amazing for people trying to optimize their security, collaboration or how they work with distributed teams.

### Comparison

If it was two years ago, I would've deemed this feature pretty irrelevant. In fact, before two years ago, I never even know collaboration features existed in IDEs. We could've simply walked over to our colleague(s) and started working together on the same machine. But now, with COVID still going strong, it has become much harder to be able to have this luxury. Because of this, both of these IDEs do a very solid job, enabling such functionality. However, the sole reason that the undo function i synced across users instantly make me recommend JetBrains a hundred times over VS Code. And, the video and audio call support alongside the ability to record Git blame across users is just the frosting on top.

---

Now, beyond these factors here, I also know that VS Code is a free IDE while JetBrains comes with a decently hefty price tag which I understand might turn some of you away (it is free for students though). However, for me, its been a blast joining a part of the JetBrains ecosystem for this past month and I cannot wait to continue working with it more. I hope you might consider giving it a shot, even when there is a bit of a price to entry.

A converted full-stack developer,

Jeremy, Lead Engineer at [Blankly](https://blankly.finance/)