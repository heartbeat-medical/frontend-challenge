# Heartbeat engineering exercise (frontend, react)

> 🚨 Please create a private fork of this repository and make all PRs into your own repository

## Rules

1. Try this exercise in **4 hours**. 🕙

2. There are no right or wrong answers. Most likely you won't have time to finish all the tasks. We are looking for:

   1. Code quality ✅
   2. Structure, ,  ✅ 
   3. Component boundaries ✅
   4. Architectural decisions (e.g. _why have you used this package?_) ✅

3. This is a real world situation. You are allowed to use the internet!
# Tasks

## Task 1

There is a basic search component `patients_search.tsx`. It allows a user to type a query and have the results return to the parent component.

It's a little janky, sometimes it doesn't search for the correct query. The component boundary is confusing also.

### 1.1 Add a test

Add a test for this component. Feel free to use whichever testing library you think is best.

### 1.2 Refactor and add a feature

Now that we have a useful test for this component. Please refactor this component to remove the peculiar behaviour when searching for something. Bonus points for addressing the confusing component boundary.

Add a loading spinner (feel free to use anything) to provide the user with some visual feedback while it is waiting for a network request to complete.

## Task 2 

## 2.1 Creating a React hook for a toast component

Error handling is a little old fashioned. Currently the errors are handled in the components and just popped up via an `alert`:

```
// patients_search.tsx
loadPatients(sq).then(ps => onResults(ps)).catch(err => alert(err))
```

We would like your to create a reusable "toast" component hook to show to the user when an error is encountered. There is a base component to use for styling in `src/toast/toast.tsx`. **We are not looking for you to use a library here, but rather implement this in React yourself.**

## How to submit

1. Create a private fork of this repository
2. Create a new branch in your fork
3. Commit on that branch
4. When you are ready to submit, create a PR back to your fork
5. Add the user @heartbeat-med (https://github.com/heartbeat-med)
6. We will comment on the PR
7. You can either submit more code or we can discuss in the next interview 🤘
8. Any questions, reach out to us!

## License

See [LICENSE](LICENSE) file.
