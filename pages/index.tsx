import ButtonComponent from '@Components/Button';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
`;

const Home = () => {
  return (
    <Layout>
      <ButtonComponent />
    </Layout>
  );
}

export default Home;