import {NavigationProp} from '@react-navigation/native';
import SaleSelectDropdown from '../components/SaleSelectDropdown/component';
import styled from 'styled-components/native';
import {colors} from '../styles';
import Logo from '../../assets/images/logo.svg';
import {useEffect, useState} from 'react';
import {
  SaleWithCloseDate,
  fetchSalesWithCloseDate,
} from '../components/SaleSelectDropdown/api';
import {FetchError} from '../api';
import LoadingScreen from './LoadingScreen';
import PrimaryText from '../components/PrimaryText/component';

export default function SelectEventScreen(props: {
  navigation: NavigationProp<any, any>;
}) {
  const {navigation} = props;
  const [salesData, setSalesData] = useState<SaleWithCloseDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | undefined>(undefined);

  function fetchSales() {
    setLoading(true);
    fetchSalesWithCloseDate().then(res => {
      if (res.isOk()) {
        setSalesData(res.value);
        setError(undefined);
        setLoading(false);
      } else {
        const err = res.err;
        setError(err);
        setTimeout(() => {
          fetchSales();
        }, 5000);
      }
    });
  }

  useEffect(() => {
    fetchSales();
  }, []);

  if (loading) {
    return <LoadingScreen error={error} />;
  }

  return (
    <HomeScreenContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>

      <SaleSelectDropdown
        onSelect={item =>
          navigation.navigate('LoginScreen', {
            saleId: item.id,
          })
        }
        data={salesData}
      />
    </HomeScreenContainer>
  );
}
const HomeScreenContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.black};
  align-items: center;
  justify-content: center;
  padding-bottom: 15%;
`;

const LogoContainer = styled.View`
  width: 60%;
  height: 20%;
`;

const ErrorText = styled(PrimaryText)`
  color: ${colors.error};
  margin-top: 20px;
`;
