import React, {useContext, useState, useEffect} from "react";
import { Image, View, TouchableOpacity, AsyncStorage, Button } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { stateContext, dispatchContext } from "../../../../contexts";
import PickerModal from 'react-native-picker-modal-view';
import OurText from "../../../OurText";
import PickerButton from "../../../PickerButton";
import {useTranslation} from "react-i18next";
import Modal from 'react-native-modal';

import {
    AddToCart,
    ComputeTotalPrice,
} from "../../../../actions";
const address = config.getCell("StoreAddress");

const AttrPicker = (props) =>
{
    const {data, onValueChange} = props;
    const items = data.options.map( (v, i) => { return {Name: v, Value: v, Id: i} });
    const [selected, setSelected] = useState(items[0]);

    return (
        <>
            <OurText style={{color:  "#FFF", fontWeight: "bold", marginTop: 15,}}>{data.name}</OurText>

            <PickerModal
                renderSelectView={(disabled, sel, showModal) =>
                    <PickerButton
                        disabled={disabled}
                        onPress={showModal}>{selected.Name || ""}</PickerButton>
                }
                onSelected={(val) => {
                    if ( val && Object.keys(val).length !== 0 ) {
                        setSelected(val);

                        if (onValueChange)
                            onValueChange(val);
                    }
                }}
                items={items}
                showToTopButton={true}
                selected={selected}
                backButtonDisabled={true}
                showAlphabeticalIndex={true}
                autoGenerateAlphabeticalIndex={true}
                requireSelection={false}
                autoSort={false}
            />
        </>
    )
};

const AttrPickersParent = (props) =>
{
    const {data} = props;
    return (
        <>
            {data.map( (v, i) =>
            {
                return <AttrPicker data={v} key={i}/>
            })}
        </>
    )
};

// const GalleryImg = (props) =>
// {
//     const {data, galleryImg, imageUrl, name, } = props;
//     return(
//         <Image
//             style={styles.picture_bottom}
//             source={{uri: galleryImg ?  `${address}wp-content/uploads/` + galleryImg
//             :  `${address}wp-content/uploads/woocommerce-placeholder.png` }}
//         />
//     )
// };


/** Список товаров той или иной категории */
const ProductsItem = (props) =>
{
    const {data, galleryImg, imageUrl, name, } = props;
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [selected, setSelected] = useState({});
    const itemAttributes = data?.attributes?.nodes || [];
    const {t} = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    
    return (
        <View style={styles.container}>

            <OurText style={styles.title}>{name}</OurText>
            <View style={styles.card}>
                <View style={styles.left}>
                <TouchableOpacity
                onPress={toggleModal}
                >
                <Image
                        style={styles.picture}
                        source={{uri: imageUrl ? `${address}wp-content/uploads/` + imageUrl
                        :  `${address}wp-content/uploads/woocommerce-placeholder.png` }}
                    />
                    </TouchableOpacity>
                <Modal isVisible={isModalVisible}>
                    <Image
                        style={styles.picture}
                        source={{uri: imageUrl ? `${address}wp-content/uploads/` + imageUrl
                        :  `${address}wp-content/uploads/woocommerce-placeholder.png` }}
                    />
                    <TouchableOpacity style={styles.modal_button} onPress={toggleModal}>
                     <OurText style={styles.text_button}>Close</OurText>
                     </TouchableOpacity>
                    </Modal>
                </View>
                    
                        <View style={styles.right}>
                            <AttrPickersParent data={itemAttributes}/>
                         </View>
            </View>
            <View style={styles.left_bottom}>

                {galleryImg && galleryImg.length ?
            <Image
            style={styles.picture_bottom}
            source={{uri: galleryImg ?  `${address}wp-content/uploads/` + galleryImg
            :  `${address}wp-content/uploads/woocommerce-placeholder.png` }}
            /> : <></>
                }
                    </View>
                <View style={styles.bottom}>
                    <OurText style={styles.price} params={{
                        price: ( data.price === 0 || !data.price ) ? t("productFree") : data.price
                    }}>productPrice</OurText>
                        <TouchableOpacity style={styles.button} onPress={ (e) =>
                        {
                            // Обрабатываем нажатие на кнопку "Купить"

                            // Заносим данные
                            let payload = {
                                id: data.productId,
                                name: data.name,
                                count: 1,
                                price: data.price ? data.price.match(/\d{1,5}.*\d*/)[0] : 0,
                                stockQuantity: data.stockQuantity || 99,
                                selectedVariants: [
                                    "variantID"
                                ]
                            };
                            // Добавляем в корзину
                            dispatch(AddToCart(payload, dispatch, t));
                            dispatch(ComputeTotalPrice());
                        }}>
                            <OurText style={styles.text_button} translate={true}>productBuy</OurText>
                        </TouchableOpacity>
                </View>
                    <View>
                        <OurText style={styles.descriptionText}>{data.description?.replace(/<\/*.+?\/*>/gi, "") || ""}</OurText>
                    </View>
        </View>
            

    );
};

export default ProductsItem;