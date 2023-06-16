import {SaleWithCloseDate} from './api';
import SelectDropdown from 'react-native-select-dropdown';
import {colors, fonts} from '../../styles';

export default function SaleSelectDropdown(props: {
  onSelect: (selectedItem: SaleWithCloseDate, index: number) => void;
  data: SaleWithCloseDate[];
}) {
  const {data, onSelect} = props;

  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      buttonTextAfterSelection={(
        selectedItem: SaleWithCloseDate,
        index: number,
      ) => {
        return 'Vybrať akciu';
      }}
      rowTextForSelection={(item: SaleWithCloseDate, index: number) => {
        return item.eventName;
      }}
      buttonStyle={{
        backgroundColor: colors.secondary,
        borderRadius: 10,
        width: '80%',
      }}
      buttonTextStyle={{
        fontFamily: fonts.regular,
      }}
      dropdownOverlayColor={colors.backdrop}
      dropdownStyle={{
        backgroundColor: colors.secondary,
        width: '80%',
      }}
      rowStyle={{
        backgroundColor: colors.secondary,
      }}
      defaultButtonText={'Vybrať akciu'}
      search={true}
    />
  );
}
