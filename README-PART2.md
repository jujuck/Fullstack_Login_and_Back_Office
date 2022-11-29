## Concept

This template is meant to serve as a foundation for every P2/P3 following the React-Express-MySQL stack, as learned in Wild Code School.
It's pre-configured with a set of tools which'll help students produce industry-quality and easier-to-maintain code, while staying as simple as possible to use.

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm run setup`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `setup` : Initialization of frontend and backend, as well as all toolings
- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Goal

The final goal of this workshop is to implement a backoffice to manage our product with a fake ( as insecure ) way to connect as Admin...
In the first part, we will implement a login process and manage it on react using context.
Then, in the second part, we will use our context to activate button and page to manage our product (create, update and delete it)

### Second part

- 1/ Create the querry on manager.
    We will begin by adding car. for this we will need to create a function `insert` on our *CarsManager.js* on the models folder . This `insert` function will return the connection to the table and the querry we need for create a new entry on our database.
    ```
    insert(data) {
      return this.connection.query(
        `INSERT INTO ${this.table} (car_make, ...) VALUES (?,...)`,
      [
        data.car_make,
        ...
      ]
    );
  }
    ```

- 2/ Add the gestion on controller.
    now we will create the function`add` on our    *CarsControllers.js* on the controllers folder . This `add` function will be create, we will build an habitual skeleton with call of the `insert` function precedently create, manage the response we send to front and manage the error.

- 2 bis/ add pages count.
    we will need recalculate the amount of pages on back and give it to front to update front if needed.

    Add a `.then()` after the `insert` and call `findCount()` and send it result on response of the request.

- 3/ Backend data validation.
    now we will setup the validation of data with the `joi` module, who is already setup on this repos. we will create a function `validate` on *service* folder (for re-usability).
    this function will take 2 parameter, `data` the data to verify and `forCreation` a boolean with true as default value.
    we will create a `presence` constant, this constant will use `forCreation` for swap between "required" (if value is true) and "optional" (if value is false), this will be usefull later. this setup will be usefull on later step.
    now we can enter on validation setup, first we need to create a Joi object with a list of key and which test we want this data key pass. we need to return this joi object.

    just bellow you can see example
    we have name of the object key on data : Joi ...
    all the argument use after the Joi is referenced on the joi module documentation. make in sort that the verification match with the database.
    ```
    return Joi.object({
      car_make: Joi.string().min(3).max(255).presence(presence),
      ...
    }).validate(data,{abortEarly: false }).error;
    ```

- 4/ Aply validation on controller .

    now a little bit of refactorisation on the `add` function created at step 2.

    we will need to call `validate` before call `insert` , we will store `validate` on a constant, we store for test if this constant is true(data is not on adequation with the test), we will need to respond a status 422 and to send the constant.

    and if the constant where `validate` was store is false we will call `insert` for send the request.

- 5/ Create endPoint on router.

    Add the `add` function we create to a route on the `router.js` file with a post method.

- 6/ Create the form on frontend.

    now a bit of front, we will need to prepare a form on the *administration.jsx* page and to link it with the back by calling the back endpoint added on step 5.

    we will need one state for store all the data of the form initialised on object with all keys of the `table` as an empty string.

    for sure we will create one input by key available on `table`, id excluded (the database manage it by itself with the autoincrement)

- 7/ Editing State .

    we will need 2 thing a function `handleData()` to update data (just one key of the object) and to add an id with the `data` key name on the input for edit data.

    The `handleData()` function will need 2 parameter, a `place` who are the key name we want to edit and a `value` literraly the value on the input.

    The `handleData()` function is on 3 steps, 1st one make a copy of the state `data`.

    2nd step, edit the copy you make before with ```newData[place] = value;```.

    last step, set the state `data` with the copy of data edited.

- 9/ Add event on each input .

    we can now pass `handleData()` at all input to an `onChange` event (tips we will use `event.target.id` and `event.target.value` as argument).

- 10/ Prepare the validation management.

    Create a state `message`, init at an empty string, who will be usefull for display validation error on front.

    And a `<h3>{message}</h3>` for display the message when needed.

- 11/ Front validation
    We need to create a data validation function on front.

    create a *controlData.js* file on *service* folder.

    in this file we will create a function `instance`, this function will take 2 parameter , the `data` to verify and `setMessage`.

- 12/ Send the form.

    Create a `sendForm()` function who will be give as `onSumbit` event to the form.

     This function will take a parameter `e` (event for prevent refresh) and will use `apiConnexion` (created during first part of this live coding) for fetch to the root created at step 5

     If request succed we can set a succes message and set the amount of pages with response we receive from backend

- 12-bis/ Edit the page amount.

    We will need to move the state `nbPages` state from *home.jsx* to a new `context` create a new file *Pages.jsx* on *context* folder. you can copy *User.jsx* and rename it (think to change the state with the original `nbPages` from *Home.jsx* and to delete it).

    After this add the context *main.jsx*.
    ```
    <React.StrictMode>
      <User.UserProvider>
        <Pages.PagesProvider>
          <App />
        </Pages.PagesProvider>
      </User.UserProvider>
    </React.StrictMode>
    ```

    import now the state from the context using `useContext`:
    ```
    const { handleNbPages, nbPages } = useContext(Pages.PagesContext);
    ```

    Think to replace `setNbPages` by `handleNpPages` on *Home.jsx*.

    And to call your context on *administration.jsx* for update the amount of pages in `sendForm()`

- 13/ Edit front structure (if needed)
    If we add a cars the Home page crash it's normal we
    will need to change 3 things. the 1st one is the pagination in our `browse` method on *carsControler.js*, we need to add a `Math.ceil()` in our response who take all the `pages` key ```pages: Math.ceil(count[0].pages / 50)```.
    The 2nd change to do is editing the maps who generate `NavButton` by change it `index` key with ```index={index + 1}``` on the *Home.jsx* .
    And the last one is to edit render on *NavButton.jsx* change button text from ```index +1``` to ```index```.

- A little speech.

    Fine we succesfuly make all the work for add a car and it work we can see it on the *Home* page.

    we can now pass to the next step create an edit route.

- 14/ Come back to manager.

    Let's start the 2nd chapter of this exercise.

    On the *CarsManager.jsx* from *models* folder create the method `update()`.

    This will take 2 parameter the `data` and the `ìd` of the item to edit.

- 15/ Controller's Turn.

    Create an `Edit` method.

    We will need 4 things:

    - take the `data from `req.body`;

    - take the `id` From `req.params.id`;

    - validate the `data` with `validation()` created at step 3, but this time we will call it like that `validation(data, false)` the false is for said the value is not required.

    The user can only edit `color` of a car but let the other like they already are.

    - and for finishe we need to call the `update` method we create during step 14, and manage response and error.

- 16/ Endpoint.

    We can now add a new `put` route on *router.js*. It will take an `id` as params.

    Nice all is good for backEnd now we can go back to front.

- 17/ create Form Again.

    we can win time and make a copy of our form created on *administration.jsx* and place it on *Cars.jsx* on *pages* folder.

    Like we want that only Admin user can see this form, we will need to add a verfication like that :
    ```
    {car && user?.role === "admin" && (...) }
    ```

    We can win time again and copy `handleData()` fonction form *Administration.jsx* and replace `data` and `setData` by `car` and `setCar` on the paste of `handleData()`.

- 18/ Call the backEnd route.

    We can create the `sendForm()` function, who will validate(with the `validate()` function) the data and send the request(with `apiConnexion`) if the data is valid(Think to give the data to your fetch, without the id ).

    We successfully create the update route, she's work and we can make the last one who are the delete.

- 19/ Back to our friend the Controller.

    You will say me "But why we don't go to the manager first this time ?" and i will respond you "No my dear, the `delete` method are already created on the abstract manager, and as *CarsManager* is a direct child of *AbstractManager* he have access to it.".

    So we can create the `deleteOne()` function on *CarsControllers.js* file. (Think to add it on the export)

- 20/ Add it to the router.

    Create the endpoint for deletion with an id params on our *router.js* file.

    ```
    router.delete(...)
    ```

- 21/ Time to call this on Front.

    Let's back to our *Cars.jsx* file, add a delete button on our form .

    This button will use an `OnClick` event for call the backEnd endpoint with `apiconnexion`. By the way of `deleteCar()` function, we will create this function.

    If request succeed we can use `useNavigate()` function for bring back admin to home page.

- 22/ And for the last one.

    Just a joke, all your work is done you actually build a full back-Office and it use a full `CRUD`
    you can create , read , update and delete content of your database all of this in your app.
    Congratulation you finish this Part 2 with success.
