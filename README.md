# Heartbeat engineering exercise (frontend, react)

> 🚨 Please create a private fork of this repository and make all PRs into your own repository

## Rules

1. Try this exercise in **4 hours**. 🕙

2. There are no right or wrong answers. Most likely you won't have time to finish all the tasks. We are looking for:

   1. Code quality ✅
   2. Structure ✅
   3. Component boundaries ✅
   4. Architectural decisions (e.g. _why have you used this package?_) ✅

3. This is a real world situation. You are allowed to use the internet!

## Tasks

### Task 1

There is a basic search feature in our app that allows search for patients based on several properties. The implementation of this feature has some problems. We're interested in two of them:

1. There is a bug leading to incorrect results in some cirumstances. One simple way to cause it is typing "J" into the search after refreshing the page. It should show two search results, but nothing is displayed.
2. The boundaries between the components in the implementation is convoluted.

#### 1.1 Add a test

Add a test for the search, it should cover the bug described above and any other testcases you feel are important. Feel free to use whichever testing library you think is best.

#### 1.2 Refactor

Now that we have a useful test for this component: Please refactor this component to remove the problems described above (the search bug as well as the convoluted component boundary).
> Tip: See [Task 3](#task-3) also

#### 1.3 Add a feature

Add a loading spinner to provide the user with some visual feedback while the code is waiting for a network request to complete.

### Task 2

Error handling in our search is a little old fashioned. Currently the errors are handled in the components and just popped up via an `alert`:

```js
// patients_search.tsx
loadPatients(sq).then(ps => onResults(ps)).catch(err => alert(err))
```

We want to improve this.

#### 2.1 Creating a React hook for a toast component

As our app will have more features that need error handling we want you to create a reusable hook that can be used to show a little "toast" in a corner of the screen with an error or success message.

The features of this hook should include:

1. The ability to create a new toast
2. Toasts should disappear after some time automatically
3. Multiple toasts should not hide each other

There is a base component to use for styling in `src/toast/toast.tsx`. **We are not looking for you to use a toast-library here, but rather implement the high-level functionality in React yourself.**

### Task 3

This app was created with create-react-app. We are concerned with the challenges that come with that kind of setup for this app. We'd like to see how you,

1. Improve configurability of the setup
2. Make it faster to develop with and deploy
3. Make it easier to maintain in the future

Feel free to scrap/reuse whatever you like. You don't need to cover all points in task 3, but we're interested to see what you see as important.

## How to submit

1. Create a private fork of this repository
2. Create a new branch in your fork
3. Commit on that branch
4. When you are ready to submit, create a PR back to your fork
5. Add the user @heartbeat-med [https://github.com/heartbeat-med](https://github.com/heartbeat-med)
6. We will comment on the PR
7. You can either submit more code or we can discuss in the next interview 🤘
8. Any questions, reach out to us!

## License

See [LICENSE](LICENSE) file.
