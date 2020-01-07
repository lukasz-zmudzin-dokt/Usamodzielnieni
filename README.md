# Usamodzielnieni

# Testowanie:

Większość z tego co zostanie opisane w tym dokumencie bazuje na [tym artykule](https://medium.com/hackernoon/testing-react-with-jest-axe-and-react-testing-library-accessibility-34b952240f53).

**jest** - framework służący do testowania. Uruchamia testy (test runner), daje narzędzia do asercji (assertion library) i mockowania (mocking library), a także daje możliwość przeprowadzania testów snapshotowych (snapshot testing). **jest** jest automatycznie dołączony, jeśli aplikacja została utworzona przy użyciu *create react app*.

**Snapshot testing** polega na tym, że pierwsze uruchomienie testu powoduje zapisanie wyglądu danego komponentu do pliku (snapshot), który zostaje dołączony do projektu, a kolejne wywołania sprawdzają czy wygląd komponentu się nie zmienia względem tego co było wygenerowane za pierwszym razem. Jeśli się zmienia test nie zostaje zaliczony, a użytkownik może uznać który snapshot jest prawidłowy. Może się to przydać np. wtedy, gdy zmienione zostaje coś co nie powinno mieć wpływu na wygląd komponentu. Wtedy zastosowanie **snapshot testing** pozwala na wykrycie przypadkowej zmiany wyglądu komponentu.

**react-testing-library** - rozszerza *dom-testing-library* o API do reactowych kompontentów. **react-testing-library** umożliwia korzystanie z komponentów w taki sposób w jaki będzie z nich korzystał użytkownik. Można wywołać np. metodę C1.click() co powinno zadziałać na komponent C1, tak jakby został on kliknięty przez użytkownika.

Zaleca się stosowanie **jest-dom** razem z **react-testing-library**. **jest-dom** to biblioteka współpracująca z **react-testing-library**, która udostępnia dla **jest** *custom DOM element matchers*, takie jak *toHaveTextContent* i *toBeVisible*. **jest-dom** i **react-testing-library** należy dodatkowo zainstalować.

Nie ma potrzeby stosowania **jest-axe** przynajmniej na tym etapie, ponieważ **jest-axe** służy do sprawdzania dostępności aplikacji dla osób z różnymi zaburzeniami, a na ten moment nie było to uwzględniane w tym projekcie.

**Setup**:

Instalacja i konfiguracja:

Należy zainstalować **react-testing-library** i **jest-dom**:
npm install --save-dev react-testing-library jest-dom

Zostanie utworzony plik *./src/setupTests.js* złożony z dwóch importów:
  import 'jest-dom/extend-expect';
  import 'react-testing-library/cleanup-after-each';

Utworzenie tego pliku spowoduje, że *extend-expect* i *cleanup-after-each* zostanie zaimportowane do każdego pliku testującego automatycznie, co ograniczy duplikowanie kodu.

Tworzenie pliku testującego:

**jest** wyszukuje pliki, które spełniają któryś z poniższych warunków:
  1. Pliki z rozszerzeniem **.js** w folderach **\_\_tests__**.
  2. Pliki z rozszerzeniem **.test.js**.
  3. Pliki z rozszerzeniem **.spec.js**.

Zalecane jest, żeby wszystkie pliki testujące były umieszczone obok kodu, który testują.

Po wpisaniu polecenia **npm test** zostają uruchomione wszystkie pliki testujące (spełniające któryś z powyższych warunków) i ich wyniki zostaną wypisane w terminalu. Można uruchomić tylko wybrane pliki używając flagi **-- --testPathPattern filename/** lub pominąć określone pliki używając flagi **-- --testPathIgnorePatterns filename/**.

**Rodzaje i przykłady testów**:
