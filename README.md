# Usamodzielnieni

## Testowanie:

Większość z tego co zostanie opisane w tym dokumencie bazuje na [tym artykule](https://medium.com/hackernoon/testing-react-with-jest-axe-and-react-testing-library-accessibility-34b952240f53).

**jest** - framework służący do testowania. Uruchamia testy (test runner), daje narzędzia do asercji (assertion library) i mockowania (mocking library), a także daje możliwość przeprowadzania testów snapshotowych (snapshot testing). **jest** jest automatycznie dołączony, jeśli aplikacja została utworzona przy użyciu _create react app_.

**Snapshot testing** polega na tym, że pierwsze uruchomienie testu powoduje zapisanie wyglądu danego komponentu do pliku (snapshot), który zostaje dołączony do projektu, a kolejne wywołania sprawdzają czy wygląd komponentu się nie zmienia względem tego co było wygenerowane za pierwszym razem. Jeśli się zmienia test nie zostaje zaliczony, a użytkownik może uznać który snapshot jest prawidłowy. Może się to przydać np. wtedy, gdy zmienione zostaje coś co nie powinno mieć wpływu na wygląd komponentu. Wtedy zastosowanie **snapshot testing** pozwala na wykrycie przypadkowej zmiany wyglądu komponentu.

**react-testing-library** - rozszerza _dom-testing-library_ o API do reactowych kompontentów. **react-testing-library** umożliwia korzystanie z komponentów w taki sposób w jaki będzie z nich korzystał użytkownik. Można wywołać np. metodę fireEvent.click(C1) co powinno zadziałać na komponent C1, tak jakby został on kliknięty przez użytkownika.

Zaleca się stosowanie **jest-dom** razem z **react-testing-library**. **jest-dom** to biblioteka współpracująca z **react-testing-library**, która udostępnia dla **jest** _custom DOM element matchers_, takie jak _toHaveTextContent_ i _toBeVisible_. **jest-dom** i **react-testing-library** należy dodatkowo zainstalować.

Nie ma potrzeby stosowania **jest-axe** przynajmniej na tym etapie, ponieważ **jest-axe** służy do sprawdzania dostępności aplikacji dla osób z różnymi zaburzeniami, a na ten moment nie było to uwzględniane w tym projekcie.

**Setup**:

Instalacja i konfiguracja:

Należy zainstalować **@testing-library/react** i **@testing-library/jest-dom**:
npm install --save-dev @testing-library/react @testing-library/jest-dom

Zostanie utworzony plik _./src/setupTests.js_ złożony z dwóch importów:

```javascript
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
```

Utworzenie tego pliku spowoduje, że _extend-expect_ i _cleanup-after-each_ zostanie zaimportowane do każdego pliku testującego automatycznie, co ograniczy duplikowanie kodu.

Tworzenie pliku testującego:

**jest** wyszukuje pliki, które spełniają któryś z poniższych warunków:

1. Pliki z rozszerzeniem **.js** w folderach **\_\_tests\_\_**.
2. Pliki z rozszerzeniem **.test.js**.
3. Pliki z rozszerzeniem **.spec.js**.

Zalecane jest, żeby wszystkie pliki testujące były umieszczone obok kodu, który testują.

Przykładowy plik testujący **MyComponent.test.js** może wyglądać następująco:

```javascript
  import React from 'react';
  import { render } from '@testing-library/react';
  import MyComponent from './MyComponent';

  describe('MyComponent', () => {
    it('should render without crashing, () => {
      const { container } = render(<MyComponent />);

      expect(container).toHaveTextContent('Component Title');
    });
  });
```

Po wpisaniu polecenia **npm test** zostają uruchomione wszystkie pliki testujące (spełniające któryś z powyższych warunków) i ich wyniki zostaną wypisane w terminalu. Można uruchomić tylko wybrane pliki używając flagi **-- --testPathPattern filename/** lub pominąć określone pliki używając flagi **-- --testPathIgnorePatterns filename/**.

**Rodzaje i przykłady testów**:

UWAGA: przedstawione poniżej przykłady będą pokazywały tylko przykładowe testy, a nie całe pliki, dlatego nie będzie w nich importów.

1. _Podstawowe renderowanie komponentu_ - ten rodzaj testu stosuje się aby sprawdzić czy wygenerowany komponent ma wymagane cechy, ale raczej te, które są widoczne dla użytkownika niż te związane z implementacją.<br />
   PRZYKŁADY:

```javascript
it("should have padding-top 125px", () => {
  const { container } = render(<MyComponent />);
  expect(container).toHaveStyle("padding-top: 125px;");
});
```

```javascript
it("should have label some exact text", () => {
  const { container, getByLabelText } = render(<MyComponent />);
  expect(getByLabelText("some exact text")).toBeTruthy;
});
```

2. _Testy zdarzeń_ - te testy symulują na elemencie dane zdarzenie i sprawdzają jego reakcję na nie.<br />
   PRZYKŁAD:

```javascript
it("should onClick be called twice", () => {
  const onClick = jest.fn();
  const { container } = render(<MyComponent onClick={onClick} />);
  const element = getByText("Submit");
  fireEvent.click(element); //symulowanie kliknięcia
  fireEvent.click(element);
  expect(onClick).toHaveBeenCalledTimes(2); //sprawdzenie czy metoda została wywołana
});
```

3. _Testy snapshotów_ - te testy zostały opisane wcześniej. Tutaj zostanie podany przykład takiego testu.

```javascript
it("should have label some exact text", () => {
  const { container } = render(<MyComponent />);
  expect(container).toMatchSnapshot();
});
```

Utworzony snapshot zostanie zapisany w automatycznie wygenerowanym folderze **\_\_snapshots\_\_** obok pliku wywołującego test.

Pomocne linki: [lista zdarzeń](https://github.com/testing-library/dom-testing-library/blob/master/src/events.js), [react-testing-library cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)<br />
