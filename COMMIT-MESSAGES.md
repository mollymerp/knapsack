#The Art of Commit Messages

There is a strict style and format that we use for our commit messages at **Knapsack**.

####The Layout

	[type] : \<subject>

	\<body>

	\<footer> 
	
####Allowed Values for \<type>
- feat (new feature)
- fix (bug fix)
- docs (changes to documentation)
- style (formatting, missing semi colons, etc; no code change)
- refactor (refactoring production code)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating grunt tasks etc; no production code change)

####Subject

Use an imperative tone for your commit messages conveying what a commit does, rather than what it did. Ex. **change** rather than **changed** or **changes**

Example:
	
	[docs]: Add README.md
	[refactor]: remove unused container element
	
####The Body
The body, just like the subject, should use an imperative tone. You do not necessarily have to use the body, but you may if you think it further clears your point. Add a body like this

	git commit -m "Subject" -m "Body"
