import logo from './logo.svg';
import './App.css';
import mParticle from '@mparticle/web-sdk';
import clevertap from './clevertap-wrapper'
import { useEffect } from 'react';

const mparticleConfig = mParticle.MPConfiguration = {
  isDevelopmentMode: false,
  loglevel: 'verbose',
  identifyRequest: {
    userIdentities: {
      email: 'sonam.abcds@clevertap.com',
      customerid: 'qwerey123e3',
    },
  },
  forwardWebRequestsServerSide: false,
  dataPlan: {
    planId: 'my_plan_id',
    planVersion: 2,
  },
  identityCallback: (result) => {
    if (result.getUser()) {
      // User has been identified
      // proceed with any custom logic that requires a valid, identified user

      const user = result.getUser();
      const { userIdentities } = user.getUserIdentities();
      console.log({user})
      // For demonstration purposes, we are printing out the known values for a user
      // to the console. An example of a use case for this callback might be to sync
      // the identity of a user with your own authentication logic
      Object.keys(userIdentities).forEach((identity) => {
        console.log(
          'User Identity Value: ',
          identity,
          userIdentities[identity]
        );
      });
    } else {
      // the IDSync call failed
    }
  },
}

function App() {

  useEffect(() => {
    mParticle.init('us1-d6f4fe26d664924ab97c87f951cc5ea8', mparticleConfig)
  }, [])
  // const initMpart = function () {
    
  // }

  mParticle.logEvent('React Web Test', mParticle.EventType.Navigation, {
    movie_length: '127 minutes',
    rating: 'PG',
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Clevertap mParticle Sample App
        </p>
      </header>
    </div>
  );
}

export default App;
