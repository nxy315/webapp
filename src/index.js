import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch} from 'react-router-dom';
// import history from './util/history';

import Home from './pages/home/home';
import Expend from './pages/home/expend';
import Forum from './pages/forum/forum';
import Center from './pages/center/center';
import FindPart from './pages/center/findPart';
import Invitation from './pages/center/invitation';
import MyActivity from './pages/center/myActivity';
import Bill from './pages/center/bill';
import BillList from './pages/center/billList';
import BillDetail from './pages/center/billDetail';
import MyArticle from './pages/center/myArticle';
import Wallet from './pages/wallet/wallet';
import Login from './pages/login/login';
import InvitationCardList from './pages/invitationCardList/invitationCardList';
import TemplateInfo from './pages/invitationCardList/templateInfo';
import Bless from './pages/bless/bless';
import SystemMsg from './pages/systemMsg/systemMsg';
import MarryRegister from './pages/marryRegister/marryRegister';
import Calendar from './pages/calendar/calendar';
import Setting from './pages/setting/setting';
import Safe from './pages/setting/safe';
import About from './pages/setting/about';
import UserInfo from './pages/setting/userInfo';
import ForgetPwd from './pages/setting/modifyPwd';
import ChooseSex from './pages/setting/chooseSex';
import Nickname from './pages/setting/nickname';
import ChooseName from './pages/setting/name';
import ModifyPwd from './pages/setting/modifyPwd';
import ModifyTel from './pages/setting/modifyTel';
import Cards from './pages/wallet/cards';
import GetOut from './pages/wallet/getOut';
import ChooseCard from './pages/wallet/chooseCard';
import AddCardStep1 from './pages/wallet/addCardStep1';
import AddCardStep2 from './pages/wallet/addCardStep2';
import AddCardStep3 from './pages/wallet/addCardStep3';
import Register from './pages/login/register';
import FindPwd from './pages/login/findPwd';
import ChooseTypes from './pages/invitationCardList/chooseTypes';
import BeginMake from './pages/invitationCardList/beginMake';
import H5 from './pages/H5/h5';
import H5Set from './pages/H5/h5Set';
import Music from './pages/H5/music';
import Preview from './pages/H5/preview';
import NoAccess from './components/noAccess';
import Map from './pages/map/map';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/expend" component={Expend}></Route>
        <Route path="/forum" component={Forum}></Route>
        <Route path="/center" component={Center}></Route>
        <Route path="/findPart" component={FindPart}></Route>
        <Route path="/invitation" component={Invitation}></Route>
        <Route path="/myActivity" component={MyActivity}></Route>
        <Route path="/bill/:id?" component={Bill}></Route>
        <Route path="/billList" component={BillList}></Route>
        <Route path="/billDetail" component={BillDetail}></Route>
        <Route path="/myArticle" component={MyArticle}></Route>
        <Route path="/wallet" component={Wallet}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/invitationCardList" component={InvitationCardList}></Route>
        <Route path="/templateInfo/:type?" component={TemplateInfo}></Route>
        <Route path="/bless" component={Bless}></Route>
        <Route path="/systemMsg" component={SystemMsg}></Route>
        <Route path="/marryRegister" component={MarryRegister}></Route>
        <Route path="/calendar" component={Calendar}></Route>
        <Route path="/setting" component={Setting}></Route>
        <Route path="/safe" component={Safe}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/userInfo" component={UserInfo}></Route>
        <Route path="/forgetPwd" component={ForgetPwd}></Route>
        <Route path="/chooseSex/:type?" component={ChooseSex}></Route>
        <Route path="/modifyPwd" component={ModifyPwd}></Route>
        <Route path="/modifyTel" component={ModifyTel}></Route>
        <Route path="/nickname" component={Nickname}></Route>
        <Route path="/chooseName" component={ChooseName}></Route>
        <Route path="/cards" component={Cards}></Route>
        <Route path="/getOut" component={GetOut}></Route>
        <Route path="/chooseCard" component={ChooseCard}></Route>
        <Route path="/addCardStep1" component={AddCardStep1}></Route>
        <Route path="/addCardStep2" component={AddCardStep2}></Route>
        <Route path="/addCardStep3" component={AddCardStep3}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/findPwd" component={FindPwd}></Route>
        <Route path="/chooseTypes/:type?" component={ChooseTypes}></Route>
        <Route path="/beginMake" component={BeginMake}></Route>
        <Route path="/H5/:id?" component={H5}></Route>
        <Route path="/h5Set" component={H5Set}></Route>
        <Route path="/music" component={Music}></Route>
        <Route path="/preview" component={Preview}></Route>
        <Route path="/noAccess" component={NoAccess}></Route>
        <Route path="/map/:lat?/:lng?" component={Map}></Route>
      </Switch>
    </HashRouter>
  ),
  document.getElementById('root')
);
registerServiceWorker();
