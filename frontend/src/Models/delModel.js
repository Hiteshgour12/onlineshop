// how to create different routes for admin role for ecommerce in reactjs?

const RoleRoute = ({ role, roles = [], ...props }) => {
  return !roles.length || roles.includes(role) ? (
    <Route {...props} />
  ) : (
    <Redirect to=".." />
  );
};


<Switch>
  <RoleRoute
    path="/products"
    role={role}
    roles={["admin", "manager", "user"]}
    component={Products}
  />
  <RoleRoute
    path="/products-edit"
    role={role}
    roles={["admin", "manager"]}
    component={ProductsEdit}
  />
  <RoleRoute
    path="/all-products"
    role={role}
    roles={["admin"]}
    component={AllProducts}
  />
  <Route path="/" component={Home} />
  <Redirect to="/" />
</Switch>


// login user api response with token and role in react js ?

function App() {
    const [objectOutput, setObjectOutput] = useState();

    useEffect(() => {
  
      const authorize = async () => {              
        const res = await fetch(api_url + "/auth", requestOptions).catch(console.log("error"));
        const data = await res.json();
        api_token = data.token;
  
        const getObject = async () => {                
          const res = await fetch(api_url + "/get?function=readObject&args=" + batch_id, requestOptions).catch(console.log("error"));
          const data = await res.json();      
          objectOutput = data;
          // add below line to set object
          setObjectOutput(data);
        };
        getObject()
  
      };
      authorize();
    }, []);


useEffect(() => {}, [objectOutput]);


}


// navigation to protected routes for admin in reactjs for ecommerce?

import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ role, ...rest }) => {
  const currentRole = JSON.parse(localStorage.getItem("role"));
  if (currentRole === role) {
    return <Route {...rest} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: currentRole ? "/" : "/login",
          state: {
            from: rest.location
          }
        }}
      />
    );
  }
};


import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (email, password) => {
    const user = loginData.find(
      (el) => el.email === email && el.password === password
    );

    if (user) {
      localStorage.setItem("role", JSON.stringify(user.access));
      history.replace(state.from ?? "/");
    } else {
      console.error("no user match found!");
    }
  };

  return (
    <div>
      ....
    </div>
  );
};


const App = () => {
  return (
    <UserLoginProvider>
      <UserProfileProvider>
        <Switch>
          <ProtectedRoute
            role="admin"
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            role="user"
            path="/viewDetails"
            component={ViewDetails}
          />
          <Route path="/Login" component={Login} />
          <Route>
            .... home page with nav links, etc...
          </Route>
        </Switch>
      </UserProfileProvider>
    </UserLoginProvider>
  );
};


//how to create profile page in reactjs?

const ProfileScreen = props => {
  const user = useSelector(state => state.users.user);
  const fetchUser = useSelector(state => state.users.fetchUser);
  const UserId = props.navigation.getParam('id');

  const dispatch = useDispatch();
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        await dispatch(usersActions.fetchUserData(UserId));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    loadUser();
  }, [UserId]);

  return (
    <View style={styles.container}>
      <Text> Name: {fetchUser.name}</Text>
    </View>
  );
};


<View style={styles.container}>
  {isLogged && <Text> user is logged in show him something</Text>}
</View>


