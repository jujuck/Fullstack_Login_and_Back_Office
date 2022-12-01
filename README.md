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
  
## We will start with the back end part of the story. So open, Postman, get ready to send a Post request with a body in Json format.
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
  
- 4/ On the *carsManagers.js*, we need to create a function `insert()`. This `insert()` function will return the query we need for creating a new entry on our database. 
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
    Otherwise, we got the confirmation of the new data on our response with the insertId.

```
  res
    .status(200)
    .send({ ...req.body, id: createdCars[0].insertId });
 ```
  
## On the Front

  - DEBUGG
    If we add a cars the Home page crash it's normal we need to change couple of things. The 1st one is the pagination in our `browse` method on *carsControler.js*, (Back End). We need to add a `Math.ceil()` in our response.
    The 2nd change is done by editing the `map()` who generate `NavButton` by changing its `index` key with ```index={index + 1}``` on the *Home.jsx* .
    And the last one is to edit the button text from ```index + 1``` to ```index``` on *NavButton.jsx*.
  
- 6/ Create the form on frontend, we need to prepare a form on the *Administration.jsx* page and to connect it with the back by calling the back endpoint added previously. We will need one state to store all the data of this form initialised on object with all keys of the `table` as an empty string. Obviously, we will create one input by state property, id excluded (the database manage it by itself with the autoincrement).

- 7/ In order to edit the global State, we  create a function `handleCars()`that need to parameters (the name of the propertie, a value) to update the state. Add it on each inputs.

    The `handleData(name, value)` has 3 steps, 
        the 1st one making a copy of the state `data`.
        the 2nd one, editing the copy you made before with ```newCars[name] = value;```
        And the last step, set the state `newCars` with the copy of the data edited.


- 8/ Prepare the validation management.
    - Create a state `message` initialized with an empty string, which will be usefull for display validation error for the user.
    And a `<h3>{message}</h3>` in order to display it when needed.
    - In the service folder, create a *cars.js* file. Inside, add a function `validateCar(car)` that will check all the fields of the data and return an object with a status and a message
    -if the status returned is `true`, you can request on `post` with your `apiConnexion` ,(Don't forget to add your car as body)
    -check if the data returned is correct. If so, add a success message for the user.
  
## Let's go on Deleting a car.
- 9/ On the back end, on the *carsControllers.js*, create a new `delete` method and call it on a `delete` route (*router.js*)('/cars/:id') . Inside this method, console.log(id).
   - res.send("Ok")

- 10/ On the back end, on the *carsManager.js* from *models* folder, create the method `delete()`.
  This will take 1 parameter the `ìd` of the item to delete.
  This `delete()` function will return the query we need for deleting the entry on our database. 
  ```  
  delete(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      id
    ]);
  }
  ```

- 11/ Back on your *carsControllers.js*, add the call() to this new method with the id.
    If an error occured, don't forget to catch it and manage it
    Otherwise, we got the confirmation of the new data on our response with the affectedRow.
    ```
      res
        .sendStatus(202)
     ```
  
- 12/ On the Front End, on the *cars.jsx* page, we should add a delete button if the `user.role === "admin"` and a new state to display a modal 'On toggle of the button) to confirm the deletion.
  
- 13/ Create a new componant *carForm.jsx* and import it as modal (Don't hesitate to custom it or try the react-modal option). This modal should get the id, the data of the car and the method to close the modal as props.
  - Inside display a small text using the data of the cars to ask for confirmation
  - Add 2 buttons : One to close the modal (using the method of the parent) and one to call a `deleteCars` function
  - The `deleteCars()` function should use the `apiConnexion` to request the back on delete with the id on param.
  - If success, `navigate('/')` to home page, otherwise, close the modal and add an erreur message to the user
    
## Let's go on Updating a car.
- 14/ On the back end, on the *carsControllers.js*, create a new `edit` method and call it on a `put` route (*router.js*)('/cars/:id') . Inside this method, console.log(id) and console.log(data).
   - res.send("Ok")
   - First, we will check the data with our previous methods. Just pass "optionnal" as the second argument.
    -If !error, res.send("OK").
    -Else res.send the error with the correct status

- 15/ On the back end, on the *carsManager.js* from *models* folder, create the method `update()`.
  This will take 2 parameters the `car` and the `ìd` of the item to edit.
  This `update()` function will return the query we need for updating a new entry on our database. 
  ```  
  update(car, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      car,
      id,
    ]);
  }
  ```

- 16/ Back on your *carsControllers.js*, add the call() to this new method with the data.
    If an error occured, don't forget to catch it and manage it
    Otherwise, we got the confirmation of the new data on our response with the affectedRow.
    ```
      res
        .sendStatus(204)
     ```

- 17/ On the Front End, we will use the modal for the deletion again. Update it with all the form inputs of the *Administration.jsx*.
    - Set a new state with the car props you receive and dispatch it on your form.
    - get the `handleCar()` method of the *Administration.jsx* to manage the update of your state
    - Add a button with a onclick => sendForm function and create the One.
    - On this function, use the `apiConnexion` to send the data to the back end with a `put` http method and the data in the body.
    - Refacto a little bit your "cars.jsx*. Create a function `getCar()` and add the call to the data on the back End. Add the call to this function in the `useEffect()`.
  
```
const getCar = () => {
    apiConnexion
      .get(`/cars/${id}`)
      .then((json) => {
        setCar(json.data);
      })
      .catch((err) => console.error(err));
};
useEffect(() => {
   getCar();
}, []);
```
  
    - Pass this new function as props on your modal and call it if the update request succeed and close the modal.
  







