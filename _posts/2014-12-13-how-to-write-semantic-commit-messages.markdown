---
title:  "How to write semantic commit messages"
date:   2014-12-13 20:01:12
tagMaster: posts
tags: ['blog','karma', 'git']
---

Today I decided to look for a pattern to write better messages to my commits, the idea was to let the changelog easy to understand, knowing exactly what was done at each commit.

Searching, I found a post of [Jeremy Mack](http://seesparkbox.com/foundry/semantic_commit_messages) talking exactly about it. And after reading, I saw that he took as an example the standard proposed by [Karma](http://karma-runner.github.io/0.10/dev/git-commit-msg.html) with some changes.

The Karma pattern consists of:

* **feat** (new feature)
* **fix** (bug fix)
* **docs** (changes to documentation)
* **style** (formatting, missing semi colons, etc; no code change)
* **refactor** (refactoring production code)
* **test** (adding missing tests, refactoring tests; no production code change)
* **chore** (updating grunt tasks etc; no production code change)

Example:

{% highlight javascript %}
git commit -m "feat: Add facebook share button"
{% endhighlight %}

Anyway, follows the tip, if you're lost like me, and want to adopt a consistent pattern for your commits, follow the links below:

[Karma - Commit Msg](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)

[Jeremy Mack](http://seesparkbox.com/foundry/semantic_commit_messages)