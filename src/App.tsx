import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchBar from './components/SearchBar.tsx';
import Landing from './pages/Landing.tsx';
import Navigator from './components/Navigator.tsx';
import Search from './pages/Search.tsx';
import Preview from './pages/Preview.tsx';
import Login from './pages/Login/Main.tsx';
import ErrorCatch from './components/ErrorBoundary.tsx';
import { isMobileOnly } from 'react-device-detect';
import ModaLogo from './assets/moda-logo.svg';
import styled from 'styled-components';
import RegisterVerify from './pages/Register/RegisterVerify.tsx';
import LoginVerify from './pages/Login/LoginVerify.tsx';
import Reserve from "./pages/Reserve.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <SearchBar/>
        <Landing/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/search',
    element: (
      <div>
        <SearchBar/>
        <Search/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/preview',
    element: (
      <div>
        <SearchBar/>
        <Preview/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/reservation',
    element: (
      <div>
        <SearchBar/>
        <Reserve/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/register/verify',
    element: <RegisterVerify/>,
  },
  {
    path: '/login/verify',
    element: <LoginVerify/>,
  },
  {
    path: '*',
    element: <ErrorCatch/>,
  },
]);

export default function App() {
  if (isMobileOnly) {
    return <RouterProvider router={ router }/>;
  } else {
    return (
      <Container>
        <LogoArea>
          <Logo src={ ModaLogo } alt="모다"/>
          <Title>
            버스의 가격,
            <br/>
            택시의 편안함.
          </Title>
        </LogoArea>
        <DescriptionArea>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget
            tellus pharetra, aliquet metus non, sollicitudin lorem. Etiam auctor
            leo ac orci dictum aliquet. Integer dignissim tortor massa, sed
            fermentum dolor pellentesque sed. Phasellus leo nulla, tincidunt nec
            quam ut, auctor molestie lorem. Donec mattis lacinia lectus vel
            auctor. Aliquam et libero ultricies, condimentum tellus at, dictum
            dui. In suscipit mi metus, eu condimentum tellus ultricies eget.
            Duis sollicitudin augue et leo tincidunt vestibulum. Integer
            tincidunt vel risus a vehicula. Morbi efficitur erat eget leo
            volutpat, sit amet pulvinar turpis tempus. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Proin congue mauris et ultricies egestas. Phasellus cursus maximus
            congue.
          </p>
          <p>
            Quisque pretium ac dolor sit amet semper. Nullam vestibulum
            ultricies magna a gravida. Curabitur ut risus aliquet, efficitur
            lorem quis, pharetra elit. Suspendisse fringilla interdum tincidunt.
            Nulla facilisi. Nam justo justo, rutrum auctor enim eu, dapibus
            sagittis diam. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia curae; Aenean ullamcorper sem commodo
            massa viverra vulputate. Vivamus nec consectetur mi. Suspendisse
            dignissim mauris eget vehicula tincidunt. Ut molestie neque quis
            pretium suscipit. Sed aliquet porttitor imperdiet. Curabitur in
            ultricies nisl, vitae ultricies mi. Aliquam est arcu, accumsan et
            eros a, scelerisque malesuada dui.
          </p>
          <p>
            Donec sollicitudin vestibulum nunc sit amet congue. Vivamus vel
            felis sagittis, commodo tellus vel, suscipit odio. Fusce vitae
            luctus orci. In elementum nisi quis placerat finibus. Mauris vitae
            urna eget lorem tempor feugiat. Aliquam vel rutrum lacus, ut semper
            neque. Nunc non pulvinar sem, a dignissim ex.
          </p>
          <p>
            Morbi sit amet varius velit. Praesent eget lectus dolor. Sed
            hendrerit velit et augue scelerisque vestibulum. Aliquam suscipit
            odio non erat laoreet, non feugiat ligula ullamcorper. Suspendisse
            id elit nisi. Praesent risus enim, suscipit sit amet metus eget,
            lacinia congue neque. Mauris tempor ex ac facilisis tempus. Integer
            in orci et sem sagittis volutpat. Duis ac efficitur arcu, vitae
            dignissim quam. Vivamus consequat urna felis, vel tempor odio
            vestibulum vel.
          </p>
          <p>
            Ut rhoncus porta venenatis. Nullam semper nulla id lobortis rutrum.
            Fusce dolor nunc, gravida vel nisl vel, dapibus blandit mauris.
            Morbi non luctus ante. Integer ac elementum arcu. Sed in nibh
            maximus, dignissim nisi id, porttitor arcu. Aenean et consequat
            tortor. Morbi lorem risus, volutpat in vestibulum eget, vulputate id
            sem. Nunc porttitor metus eu risus tempor auctor nec id dolor. In
            libero eros, fringilla eu lacinia eu, condimentum malesuada tortor.
            Morbi pulvinar felis ut purus posuere cursus.
          </p>
          <p>
            모다는 모바일 전용 앱이에요. 모바일로 접속하면 바로 이용하실 수
            있어요.
          </p>
        </DescriptionArea>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  padding: 100px;
  height: 100vh;
  background-color: var(--primary);
  color: var(--white);
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
    flex-direction: row;
    justify-content: center;
  }
`;

const DescriptionArea = styled.div`
  width: 60%;
  height: 100%;
  overflow: scroll;

  & p {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
`;

const Logo = styled.img`
  width: 80%;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin: 0;
`;
