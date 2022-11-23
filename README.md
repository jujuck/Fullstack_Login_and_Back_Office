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
Then, we will use our context to activate button and page to manage our product (create, update and delete it)

### First part
- 1/ With the package.json, you add tailwind library to your project. You can see on the *Home.jsx* page, that some classes are here. But nothing works. Folloow the doc on taliwinds to finish the installation
<a href="https://tailwindcss.com/docs/guides/create-react-app" target="_blank" >Clic Here</a>

- 2/ Now, don't forget to go on your back edn foler ``` cd backend ```, create your *.env* file with your MySQl credentials, and ``` npm run migrate``` to generate the database.

- 3/ Go back to the root of the project and run ``` npm run dev ```. You should see the home page with the products and a page to see the detail of them.

- 4/ Now, create a new page *Login.jsx*

- 5/ Add a nav bar to all your pages, with a <Link to="/"> and an other one <Link to="/login" > to access your page. Don"t forget to style the nav bar a little bit with the tailwind library. Integrate then the *Login.jsx* in the route in *App.jsx*

- 6/ On the *Login.jsx* page, add two inputs (email and password). Create a global state to control it as an object. On the input manage the change of your state by merging your old state with the new value of your key
  ```
  onChange={(e) =>
    setConnexion({ ...connexion, email: e.target.value })()
  }
  ```
Add a <Button> with a function (handleLogin()), triggered `onClick` that `console.log()` the value of your state.

- 7/ Adding some logique, we will check the validity of the email and the password, to activate the button.
Use the regex here to test (/^[^\s@]+@[^\s@]+\.[^\s@]+$/) the email, and this one for password (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/). If the test succeed, we will send the request, else, add a message to your user for incorrect credentials.

- 8/ Now, on your function, ``` POST ``` your state to the ``` /login ``` endPoint on your back end.
    - on your backend, create a new file *userController.js* on the controller folder. Inside, create a fonction `login()` that `console.log()` the data you post (on your body). Don't forget to add the route ou your *router.js* file.
    - on top of this file, we will create a constante with some fake data to check 
    ```
    const user = {
      email: "trainer@wildcodeschool.com",
      password: "WildCodeSchool2022",
      name: "John Smith",
      role: "admin"
    }
    ```
    - In you function, use Joy to check the data you receive (correct email, correct password) (cd backend, npm install joy)
    - If `false` => `res.status(400).send("Wrong credentials")
    - If `true` => next step, check if the eamil is right and the password too
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






