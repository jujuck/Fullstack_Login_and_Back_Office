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
  
## We will start with the back end part of the storie. So open, Postman, get ready to send a Post request with a body in Json format.
Here is an example of the data
  ```
{
"car_make": "Aston Martin",
"car_model": "Vanquish S",
"car_year_model": "2005",
"color": "Red",
"city": "Qintong",
"descr": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
"title": "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
"keyword": "nec nisi vulputate nonummy maecenas"
}
```
- 1/ Add a add() function on your *carsController.js* and don't forget to implement your new "POST" route on the *router.js*.
On this `add()`, console.log() your data and send a response to the client.
  
- 2/ Now we setup the validation of the data with the `joi` module, which is already setup on this repos. On *services* folder (for re-usability), we will create a file *cars.js* with a function `validate`. This function will have 2 parameters, `data` and `type` ("required" in this case).
    - On validation side, first we need to create a Joi object with a list of key (see the doc if needed to match with the database constraint.) and return the possible error.

  ```
  return Joi.object({
    car_make: Joi.string().min(3).max(255).presence(presence),
    ...
  }).validate(data,{abortEarly: false }).error;
  ```
  Don't forget to export your function and import (require) it on your *carsControllers.js*.
  
- 3/ On your *carsControllers.js*, call your `validate(data, "required") function and check the potential error
    -If !error, res.send("OK").
    -Else res.send the error with the correct status
  
- 4/ On the *carsManagers.js*, we need to create a function `insert()`. This `insert()` function will return the query we need for create a new entry on our database. 
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

- 5/ Back on your *carsControllers.js*, add the call() to this new methods with the data.
    If an error occured, don't forget to catch it and manage it
    Otherwise, we got the confirmation of the new data on our response with the insertId. Before sending it back to the client, we need to call the `findCount()` method to update our number of page
    .then(), send all the data and count back to the client
  
  ```
  res
    .status(200)
    .send({
      cars: { ...req.body, id: createdCars[0].insertId },
      pages: Math.ceil(count[0].pages / 50),
    });
 ```
  
## On the Front

- 6/ Create the form on frontend, we need to prepare a form on the *Administration.jsx* page and to connect it with the back by calling the back endpoint added previously. We will need one state to store all the data of this form initialised on object with all keys of the `table` as an empty string. Obviously, we will create one input by state property, id excluded (the database manage it by itself with the autoincrement).

- 7/ In order to edit the global State, we  create a function `handleCars()`that need to parameters (the name of the propertie, a value) to update the state. Add it on each inputs.

    The `handleData(name, value)` has 3 steps, 
        the 1st one making a copy of the state `data`.
        the 2nd one, editing the copy you made before with ```newCars[name] = value;```
        And the last step, set the state `newCars` with the copy of the data edited.


- 8/ Prepare the validation management.
    - Create a state `message` initialized with an empty string, which will be usefull for display validation error on front.
    And a `<h3>{message}</h3>` in order to display it when needed.

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




