import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from'./screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen' 
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from'./screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ProductsScreen from './screens/ProductsScreen'
import MyOrderScreen from './screens/MyOrderScreen'
import KidsProductsScreen from './screens/KidsProductsScreen'
import MenProductsScreen from './screens/MenProductsScreen'
import WomenProductsScreen from './screens/WomenProductsScreen'


function App() {
  return (
    <Router>
        <Header />

        <main style={{ marginTop:'120px'}} > 
          <Container>
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/productlist' component={ProductsScreen}/>
            <Route path='/product/:id' component={ProductScreen}/>
            <Route path='/cart/:id' component= {CartScreen}/>
            <Route path='/login/' component={LoginScreen}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/profile' component={ProfileScreen}/>
            <Route path='/shipping' component={ShippingScreen}/>
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/myorders' component={MyOrderScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderList' component={OrderListScreen} />
            <Route path='/products/Kids' component={KidsProductsScreen}/>
            <Route path='/products/Men' component={MenProductsScreen}/>
            <Route path='/products/Women' component={WomenProductsScreen}/>




           </Container>
        </main>
     
      <Footer/>
    </Router>
 
   
  );
}

export default App;
