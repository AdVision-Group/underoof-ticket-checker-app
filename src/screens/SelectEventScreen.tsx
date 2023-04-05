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
import {ActivityIndicator} from 'react-native';
import {NoInternetError, isNoInternetError} from '../api';
import {errors} from '../strings';

export default function SelectEventScreen(props: {
  navigation: NavigationProp<any, any>;
}) {
  const {navigation} = props;
  const [salesData, setSalesData] = useState<SaleWithCloseDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function fetchSales() {
    setLoading(true);
    fetchSalesWithCloseDate().then(res => {
      if (res.isOk()) {
        setSalesData(res.value);
        setError('');
        setLoading(false);
      } else {
        const err = res.err;
        if (isNoInternetError(err)) {
          setError(errors.noInternet);
        }
        setTimeout(() => {
          fetchSales();
        }, 5000);
      }
    });
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <HomeScreenContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <SaleSelectDropdown
          onSelect={() => navigation.navigate('LoginScreen')}
          data={salesData}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
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

const ErrorText = styled.Text`
  color: ${colors.error};
  margin-top: 20px;
`;
