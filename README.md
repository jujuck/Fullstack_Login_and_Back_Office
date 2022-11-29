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
- `dev-front` : Starts the React fron    - Add this line of exeption on your eslint rules "react/jsx-no-constructed-context-values": "off",
tend server
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
Then, we will use our context to activate button and page to manage our product (create, update and delete it)

### First part
- 1/ With the package.json, you add tailwind library to your project. You can see on the *Home.jsx* page, that some classes are here. But nothing works. Follow the doc on tailwinds to finish the installation
<a href="https://tailwindcss.com/docs/guides/create-react-app" target="_blank" >Clic Here</a>

- 2/ Now, don't forget to go on your back end folder ``` cd backend ```, create your *.env* file with your MySQl credentials, and ``` npm run migrate``` to generate the database. Add the *.env* file in your Front End with the backEnd url

- 3/ Go back to the root of the project and run ``` npm run dev ```. You should see the home page with the products and a page to see the detail of them.

- 4/ Now, create a new page *Login.jsx*

- 5/ Add a nav bar to all your pages, with a <Link to="/"> and an other one <Link to="/login" > to access your page. Don't forget to style the nav bar a little bit with the tailwind library. Integrate then the *Login.jsx* in the route in *App.jsx*

- 6/ On the *Login.jsx* page, add two inputs (email and password). Create a global state to control it as an object. On the input manage the change of your state by merging your old state with the new value of your key
  ```
  onChange={(e) =>
    setConnexion({ ...connexion, email: e.target.value })()
  }
  ```
  Add a <Button> with a function (handleLogin()), triggered `onClick` that `console.log()` the value of your state.

- 7/ Adding some logic, we will check the validity of the email and the password, to activate the button.
Use the regex here to test (/^[^\@]+@[^\@]+\.[^\@]+$/) the email, and this one for password (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/). If the test succeed, we will send the request, else, add a message to your user for incorrect credentials.

- 8/ Now, on your function, ``` POST ``` your state to the ``` /login ``` endPoint on your back end.
    - on your backend, create a new file *usersControllers.js* on the controller folder. Inside, create a fonction `login()` that `console.log()` the data you post (on your body). Don't forget to add the route ou your *router.js* file.
    - on top of this file, we will create a constante with some fake data to check 
    ```
    const user = {
      email: "trainer@wildcodeschool.com",
      password: "WildCodeSchool2022",
      name: "John Smith",
      role: "admin"
    }
    ```
    - In you function, use Joi to check the data you receive (correct email, correct password) (cd backend, npm install joy)
    - If `false` => `res.status(400).send("Wrong credentials")
    - If `true` => next step, check if the email is right and the password too
        - If `false` => `res.status(400).send("Wrong credentials")
        - If `true` => `res
            .cookie("access_token", "connexion validated", {
              httpOnly: true,
            })
            .status(200)
            .json({email, name, role});
      ```
      WARNING : this is a false way to do it. In a complete secure connexion, we would fetch the db to get the user, hash the password and compare it to the one on the db. Then, we will create a JWT for the cookie...

- 9/ Go back to your front end. On the *login.jsx*, add the .then() and .catch() to your request. On the `.catch()`, get the message from the back end and show it to the user (below the password field). On the `.then()`, navigate to the *home.jsx* page with `useNavigate()` from *react-router-dom*.

- 10/ Now we should remember the data of the user we receive globally on our app. In order to accomplished it, we will ad a **context** to our app.

```
import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const handleUser = (data) => {
    setUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
const ExportContextUser = {
  UserContext,
  UserProvider,
};
export default ExportContextUser;
```
    - Add this line of exeption on your eslint rules "react/jsx-no-constructed-context-values": "off", and the new alias on vite.config and jsconfig "@context": "./src/context"
    - Add the `ExportContextUser` globaly on your app, just below the *<BrowserRouter>*
    - Import the **context** on your *login.jsx* and consume the `handleuser(data)` function to memorize it. Then `navigate()`.

- 12/ Now, on your *Navbar.jsx*, connect the `UserContext` and grab the user information. If the `role === "admin"`, then, show a new <Link to="/administration" />. As well; if a user is connected, don't show the login page, but a <Button onClick="setUser(null)" /> to disconnect.

- 13/ Create a new page *Administration.jsx*, with a h1 inside. (We will implement the page on the second part) and add it to your router in the *App.jsx*. But we sould protect it from any user that is not admin.
    - Create a new folder *Layout* and inside, create a new file *ProtectedRoute.jsx*.
    - Add this code inside
    ```
    import { Navigate } from "react-router-dom";

    function ProtectedRoute({ user, children }) {
      if (!user) {
        return <Navigate to="/" replace />;
      }

      return children;
    }

    export default ProtectedRoute;
    ```
    - In *App.jsx*, in your route `path="/administration"`, Encapsule your page *Administration.jsx* inside the *ProtectedRoute.jsx*

Congrats !!! Your have now a fully operationnel login system.

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




