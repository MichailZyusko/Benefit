import React, {useCallback, useEffect} from 'react';
import ProductCard from '../../components/ProductCard';
import {useHomeScreenDispatch, useHomeScreenSelector} from '../../redux/hooks';
import {selectHomeScreen} from './slicer';
import {getProducts} from '../../services/products';
import {onEndReached} from './slicer';
import {ListHeaderComponent, SearchTextInput} from './Components';
import {Product} from '../../types';
import {View, Animated} from 'react-native';
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';
import {styles} from './styles';
import {ProductCardLoader} from '../../components/ProductCard/Loader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScanScreen} from '../scan';

const Stack = createNativeStackNavigator();

export default function HomeScreen({navigation}: {navigation: any}) {
  const {onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY} =
    useCollapsibleSubHeader();

  const {page, products, search, loading, storeIds} =
    useHomeScreenSelector(selectHomeScreen);
  const dispatch = useHomeScreenDispatch();

  console.log(1111111, page, products.length, loading, search);

  useEffect(() => {
    (async () => {
      await getProducts(dispatch, page, search, storeIds);
    })();
  }, [dispatch, page, search, storeIds]);

  const onEndReachedMemoized = useCallback(
    () => dispatch(onEndReached()),
    [dispatch],
  );

  const keyExtractor = useCallback(
    (item: Product, index: number) => index.toString(),
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: Product}) => <ProductCard product={item} />,
    [],
  );

  const renderLoader = useCallback(() => <ProductCardLoader />, []);

  return (
    <>
      <View style={styles.screenContainer}>
        <Animated.FlatList
          onScroll={onScroll}
          contentContainerStyle={{paddingTop: containerPaddingTop}}
          scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
          style={styles.flatList}
          numColumns={2}
          data={loading ? new Array(15).fill(1) : products}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={null} // TODO: add footer
          ListEmptyComponent={null} // TODO: add empty state
          renderItem={loading ? renderLoader : renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReachedMemoized}
          onEndReachedThreshold={5}
        />
        <CollapsibleSubHeaderAnimator translateY={translateY}>
          <SearchTextInput navigation={navigation} />
        </CollapsibleSubHeaderAnimator>
      </View>
    </>
  );
}

export const HomeScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Главная" component={HomeScreen} />
      <Stack.Screen name="QR-code  сканнер" component={ScanScreen} />
    </Stack.Navigator>
  );
};
