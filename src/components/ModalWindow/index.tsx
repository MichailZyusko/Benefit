import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import Modal from 'react-native-modal';
import { QuantityEditor } from '../QuantityEditor';
import { StoreLogo } from '../StoreLogo';
import { Heart } from '../ProductCard/Components';
import { removeProduct, selectModalWindow } from './slicer';
import {
  useModalWindowDispatch,
  useModalWindowSelector,
} from '../../redux/hooks';

export default function ModalProductInfo() {
  const { product } = useModalWindowSelector(selectModalWindow);
  const modalWindowDispatch = useModalWindowDispatch();

  if (!product) {
    return null;
  }

  return (
    <View style={styles.modalContainer}>
      <Modal
        onBackButtonPress={() => modalWindowDispatch(removeProduct())}
        // onBackdropPress={() => modalWindowDispatch(removeProduct())}
        onSwipeComplete={() => modalWindowDispatch(removeProduct())}
        propagateSwipe
        swipeDirection="down"
        isVisible={!!product}
        hideModalContentWhileAnimating
        animationInTiming={750}
        backdropTransitionInTiming={1000}
        animationOutTiming={750}
        backdropTransitionOutTiming={1000}
        style={styles.modelWindow}
      >
        <>
          <View style={styles.separator} />
          <View>
            <View style={styles.productContainer}>
              <StoreLogo storeId={product.storeId} style={styles.storoLogo} />
              <Heart />
              <ImageBackground
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode={'contain'}
              />
              <Text style={styles.nameText} numberOfLines={3}>
                {product.name}
              </Text>
              <Text style={styles.nameText} numberOfLines={3}>
                {product.price} Br
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.addButton}>
                <Text style={styles.addText}>Добавить</Text>
              </Pressable>
              <QuantityEditor product={product} />
            </View>
          </View>
        </>
      </Modal>
    </View>
  );
}
