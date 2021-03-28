import { gql } from "@apollo/client";

/**
 * GraphQL запрос на категории
 */
export const QUERY_CATEGORY_LIST = gql`
    query GetCategoryList($hideEmpty: Boolean!) {
        productCategories(where: {hideEmpty: $hideEmpty}) {
            nodes {
                name
                productCategoryId
                image {
                    mediaDetails {
                        file
                    }
                }
            }
        }
    }`;

/**
 * GraphQL запрос на список товаров
 */
export const QUERY_PRODUCT_LIST = gql`
    query GetProductListQuery($categoryId: Int!) {
        products(where: {categoryId: $categoryId}) {
            nodes {
                databaseId
                name
                description
                image {
                    mediaDetails {
                        file
                    }
                }
                galleryImages {
                    nodes {
                        mediaDetails {
                            file
                        }
                    }
                }
                ... on VariableProduct {
                    variations {
                        nodes {
                            price
                            databaseId
                            name
                        }
                    }
                    attributes {
                        nodes {
                            attributeId
                            name
                            options
                        }
                    }
                }
                ... on SimpleProduct {
                    price
                }
            }
        }
    }`;

/**
 * GraphQL мутация для регистрации пользователя
 */
export const MUTATION_REGISTER_USER = gql`
    mutation RegisterUser($uuid: String!, $username: String!, $password: String!, $email: String!) {
        registerUser(
        input: {
            clientMutationId: $uuid,
            username: $username,
            password: $password,
            email: $email
        }) {
            user {
                jwtAuthToken
                jwtRefreshToken
            }
        }
    }
`;

/**
 * GraphQL мутация для входа
 */
export const MUTATION_LOGIN_USER = gql`
    mutation LoginUser($uuid: String!, $username: String!, $password: String!) {
        login( input: {
            clientMutationId: $uuid,
            username: $username,
            password: $password
        }) {
            authToken
            refreshToken
            user {
                databaseId
                username
                email
            }
        }
    }
`;

export const MUTATION_CREATE_ORDER = gql`
    mutation CreateOrder($clientMutationId: String!, $customerId: Int!) {
        createOrder(input:{clientMutationId: $clientMutationId, customerId: $customerId}){
            clientMutationId
            order {
                orderKey
            }
        }
    }
`;

export const MUTATION_CHECKOUT = gql`
    mutation Checkout(
            $clientMutationId: String!,
            $isPaid: Boolean!,
            $address: String!,
            $email: String!,
            $firstName: String!,
            $lastName: String!,
            $postcode: String!,
            $phone: String!,
            $paymentMethod: String!,
        ) {
        checkout( input: {
            clientMutationId: $clientMutationId,
            isPaid: $isPaid,
            billing: {
                address1: $address,
                email: $email,
                firstName: $firstName,
                lastName: $lastName,
                postcode: $postcode,
                phone: $phone
            }
        } ) {
            clientMutationId
            order {
                id
            }
        }
    }
`;

export const MUTATION_ADD_TO_CART = gql`
    mutation cartAdd($productId: Int!, $quantity: Int!, $clientMutationId: String!) {
        addToCart(input: { productId: $productId, quantity: $quantity, clientMutationId: $clientMutationId }){
            cartItem {
                key
                product {
                    name
                }
                quantity
                subtotal
                subtotalTax
                tax
                total
            }
        }
    }
`;

export const QUERY_GET_CART = gql`
    query getCart {
        cart {
            contents {
                nodes {
                    key
                    product {
                        databaseId
                        name
                        image {
                            mediaDetails {
                                file
                            }
                        }   
                    }
                    quantity
                    total
                }
            }
            total
        }
    }
`;