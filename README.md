# Heartbeat engineering exercise (frontend, react)

> 🚨 Please create a private fork of this repository and make all PRs into your own repository

## Rules

1. Try this exercise in **2 hours**. 🕙

2. There are no right or wrong answers. Most likely you won't have time to finish all the tasks. We are looking for:

   1. Code quality ✅
   2. Structure ✅
   3. Functionality ✅
   4. Architectural decisions (e.g. _why have you used this package?_) ✅

3. This is a real world situation. You are allowed to use the internet, use every library you want, call a friend...  
   **But don't:**
   - code with someone else
   - use a previous version of this exercise (if you have completed it before)

# Tasks

## Task 1

There is a basic search component `patients_search.tsx`. It allows a user to type a query and have the results return to the parent component.

It's a little janky though, sometimes it doesn't search for the correct query.

### Add a test

Add a test for this component. Feel free to use whichever testing library you think is best.

### Refactor and add a feature

Now that we have a useful test for this component. Please refactor this component to remove the peculiar behaviour when searching for something.

Add a loading spinner (feel free to use anything) to provide the user with some visual feedback while it is waiting for a network request to complete.

## Task 2

Error handling is a little old fashioned. Currently the errors are handled in the components and just popped up via an `alert`:

```
// patients_search.tsx
loadPatients(sq).then(ps => onResults(ps)).catch(err => alert(err))
```

We would like a nice "toast" component to show to the user when an error is encountered. There is a base component to use in the `src/toast/toast.tsx`. And in the `App.tsx` file, there is an example usage of this component commented out.

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

#
#
## Challenge Notes
#
### Considering this challenge as a pair programming activity
### I am taking notes down for all my changes
#

### Timeboxing the activity to 2 hours
### Start: 15:30

1. I first checked everything in the code out, to understand what needs to be done.
2. Then added ```@testing-library``` with the reference setup file to run the tests. 
3. I saw that there was no label attached to the input, so first added a label and htmlFor to make it semantically correct.
4. Then added a test case which just adds a snapshot for the patient search component.
5. Removed the unused type ```psearchboxprops``` from the patient_search file.
6. Made the component default export, for single export in the file, I would prefer a default export.
7. Fixed the problem with the patient_search component by removing the useState.
Or I can add useEffect to the component, DEPENDS ON THE REQUIREMENTS
8. Now I am trying to add a loader, I didn't go with a custom loader or from a library, as I think CSS can generally take care of the most general loaders, and for those special cases we can use a gif or else depends on the use case....
9. Copied the CSS for the loader for the ```heart design```, and scaled it to double to make it more prominent on the screen.

✅ I wanted to add something cool which matches heartbeat so found a heart loader out....
and while adding the loader learned a new thing about animation...

```bash
animation-timing-function: ease, cubic-bezier(0.215, 0.61, 0.355, 1), step-start, cubic-bezier(0.215, 0.61, 0.355, 1);

That we can pass multiple time functions or durations to the animation to have a random or variable effect....more values....more randomness....
```

copied the color from [Heatbeat homepage](https://heartbeat-med.com/#kfjt7ps3uyilekearf959) of the button causes it matches red, used [Color Picker](https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg).

10. Also increased the timeout to the API calls to make the Loader show for longer.
11. Changed the export to default for all components.
12. Added new toasts for errors, reason to use ```react-toastify``` is, its highly customizable, and the challenge mentioned the word toast, which led me to this library.Also, the prop items which were already there were sufficient enough to handle our major use case....
Added 2 new params to the toast component, we don't need those values, just adding to show the more directly configurable option based on the status prop value we r getting.
Added a custom key called ```customId``` to the toast component to render it only once.
13. Adding the change test case was a bit of a problem, as I was getting an error on ```.then is undefined``` on the load method, but figured it out now, that it was because I forgot to set the mocks on every test render, but after that it worked.

14. Moved the Toast component inside the patient components, so that we can render the error in catch instead for the patient result array.

15. Now with some time left in 2 hours, I am adding another rendering based on ```USEEFFECT``` for the patient search component.

16. I am thinking of adding some css changes to beautify our page or component.

17. Copied the header design, logo, footer design and the component from the hearbeat homepage, with all the colors of the button or background also copied from heartbeat homepage. The footer design is just a placeholder for improved UX.

18. Created the avatar in the right, to show the current user(or who is doing the activity).

19. As prettier was already here I added the script to format the tsx files.

20. TO RUN THE USEEFFECT PATIENT SEARCH COMPONENT, we can replace the import.

![Screenshot](https://github.com/apoorv173/frtonend/blob/frontend-activity-apoorv/screenshot.png?raw=true)

### Start: 17:30