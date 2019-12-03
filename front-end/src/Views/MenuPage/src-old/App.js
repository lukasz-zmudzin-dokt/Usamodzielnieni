import React from 'react';
import background from './img/menu_background.png';
import './App.css';

function App() {
    const menu = [
        'Start',
        'O nas',
        'Strefa relaksu',
        'Telefony',
        'Jakaś rzecz',
        'Zarerestruj się',
        'Zaloguj się'
    ];
    const menuItems = menu.map((item) =>
        <div className="card text center Top-menu-button">

                        <a className="nav-link active">{item}</a>

        </div>
    );
  return (
    <div className="App">
        <div className="row Top-menu">
        <div className="card-group">
            {menuItems}
        </div>
        </div>
      <div>
      <div className="row Main-menu align-items-center text-center">
          <div className="col Main-menu-tile">Kreator CV</div>
          <div className="col Main-menu-tile">Od czego zacząć usamodzielnienie?</div>
          <div className="col Main-menu-tile">Kursy, staże, praca</div>
          <div className="col Main-menu-tile">Opis stanowisk</div>
      </div>
          <div className="row Main-menu align-items-center text-center">
              <div className="col Main-menu-tile">Testy zawodowe i osobowości</div>
              <div className="col Main-menu-tile">Historie usamodzielnionych</div>
              <div className="col Main-menu-tile">Jak zarządzać budżetem?</div>
              <div className="col Main-menu-tile"> </div>
          </div>
      </div>
    </div>
  );
}

export default App;
