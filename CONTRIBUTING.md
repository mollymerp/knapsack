#Contributing

A nice and short Guideline on how to contribute to **knapsack**. 

Know that this is not coherent with the Makersquare Contribution Guidelines, but follows a similar but different style of contribution. Our workflow is similar to the one followed by Github internally. You can find a great introduction to the benefits of this kind of Workflow on this link: <http://scottchacon.com/2011/08/31/github-flow.html>



###Steps to Contribute

- Anything in the master branch is deployable
- To work on something new, create a descriptively named  branch off of master (ie: factory-login)
- Commit to that branch locally and regularly push your work to the same named branch on the server
- Always pull in new changes from the master branch when appropriate to make sure the code that someone else pushed does not break yours. If it does talk to that person and figure out a way to fix it that makes both of you happy.
- When you need feedback or help, or you think the branch is ready for merging, open a pull request
- After someone else has reviewed and signed off on the feature, you can merge it into master
- (Once it is merged and pushed to ‘master’, you can and should deploy immediately. In our case that means merging master into the deploy branch.)

####Your Branch Workflow

- Commit often and write descriptive commit messages. Check out the COMMIT-MESSAGES.md file for further info on how to write good commit messages.

####The Pull-Request Workflow

When you send in a pull-request, because you think your feature is ready to be merged into the master branch make sure that it is sufficiently tested. It is your responsiblity that the master branch does not break when you merge. If someone worked on code that interfers with the code that you worked on make sure that you talk to that person and handle the merge commits together with that person. Also every merge into master has to be signed of by someone. This is not a proper code review. We allocate time for that, but it should rather be a way to check for obvious mistakes



