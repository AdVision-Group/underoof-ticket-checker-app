import styled from 'styled-components/native';
import {
  ApiError,
  FetchError,
  NoInternetError,
  OtherError,
  ResponseError,
} from '../../api';
import {colors} from '../../styles';
import {Text} from 'react-native';
import PrimaryText from '../PrimaryText/component';

export default function ErrorMessage(props: {
  error?: FetchError;
  fontSize?: number;
  height?: number;
  resolveApiError?: (error: ApiError) => string;
}) {
  const {error, resolveApiError} = props;

  const getErrorMessage = () => {
    if (error instanceof NoInternetError) {
      return 'No internet connection';
    }
    if (error instanceof ApiError) {
      if (resolveApiError) {
        return resolveApiError(error);
      }
      return error.message;
    }
    if (error instanceof ResponseError) {
      return 'Invalid api response format';
    }

    if (error instanceof OtherError) {
      return error.message;
    }

    return 'Unknown error occurred';
  };

  return (
    <ErrorContainer>
      {error ? (
        <ErrorText
          style={{
            fontSize: props.fontSize ?? 14,
            height: props.height ?? 20,
          }}>
          {getErrorMessage()}
        </ErrorText>
      ) : (
        <Placeholder />
      )}
    </ErrorContainer>
  );
}

const ErrorText = styled(PrimaryText)`
  color: ${colors.error};
  height: 20px;
`;

const Placeholder = styled.View`
  height: 20px;
`;

const ErrorContainer = styled.View`
  align-items: center;
  padding: 10px;
  justify-content: center;
  max-height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
